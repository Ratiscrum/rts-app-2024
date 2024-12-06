'use client';
import WasmFromCDN from '@wllama/wllama/esm/wasm-from-cdn.js';

import { Wllama } from '@wllama/wllama';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const MODEL = {
  url: 'https://huggingface.co/hugging-quants/Llama-3.2-1B-Instruct-Q4_K_M-GGUF/resolve/685a97a04b902907c63760a88cfee526d13d07a2/llama-3.2-1b-instruct-q4_k_m.gguf',
};

interface WllamaContextValue {
  isGenerating: boolean;
  generate: (
    input: string,
    callback: (currentText: string | undefined) => void,
  ) => void;
  stopGenerating: () => void;
  isModelLoading: boolean;
  isUnsupported: boolean;
  getWllamaInstance: () => Wllama;
}

let stopSignal = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WllamaContext = createContext<WllamaContextValue>({} as any);
export const WllamaProvider = ({ children }: { children: ReactNode }) => {
  const [isGenerating, setGenerating] = useState(false);
  const [wllamaInstance, setWllamaInstance] = useState<Wllama>();
  const [isModelLoading, setModelLoading] = useState(true);
  const [isUnsupported, setUnsupported] = useState(false);

  const initWllama = async () => {
    const wllamaInstance = new Wllama(WasmFromCDN);
    setWllamaInstance(wllamaInstance);

    try {
      console.log('Loading model from url', MODEL.url);
      await wllamaInstance.loadModelFromUrl(MODEL.url, {
        // n_threads: 0,
        // bellow value needs to be finetuned
        n_ctx: 4096,
        n_batch: 128,
      });
      setModelLoading(false);
    } catch (error) {
      console.error('Failed to load model', error);
      setModelLoading(false);
      setUnsupported(true);
    }
  };

  useEffect(() => {
    console.log('wllama provider init');
    initWllama();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopGenerating = () => {
    stopSignal = true;
  };

  const generate = async (
    input: string,
    callback: (currentText: string | undefined) => void,
  ) => {
    setGenerating(true);
    const result = await wllamaInstance?.createCompletion(input, {
      nPredict: 4096,
      useCache: true,
      sampling: {
        temp: 0.2,
      },
      onNewToken(token, piece, currentText, optionals) {
        callback(currentText);
        if (stopSignal) optionals.abortSignal();
      },
    });
    callback(result);
    stopSignal = false;
    setGenerating(false);
  };

  return (
    <WllamaContext.Provider
      value={{
        isGenerating,
        generate,
        stopGenerating,
        isModelLoading,
        isUnsupported,
        getWllamaInstance: () => wllamaInstance as Wllama,
      }}
    >
      {children}
    </WllamaContext.Provider>
  );
};

export const useWllama = () => useContext(WllamaContext);
