/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { Template } from '@huggingface/jinja';
import { Wllama } from '@wllama/wllama';
import { Conversation } from '../types/chat';

const textDecoder = new TextDecoder();

export const DEFAULT_CHAT_TEMPLATE =
  "{% for message in messages %}{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant\n' }}{% endif %}";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const useDidMount = (callback: () => any) =>
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

type StorageKey = 'conversations' | 'params' | 'welcome' | 'custom_models';

export const WllamaStorage = {
  save<T>(key: StorageKey, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load<T>(key: StorageKey, defaultValue: T): T {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    } else {
      return defaultValue;
    }
  },
};

export const formatChat = async (
  modelWllama: Wllama | null,
  messages: Conversation['messages'],
): Promise<string> => {
  const template = new Template(DEFAULT_CHAT_TEMPLATE);
  const bos_token: string = textDecoder.decode(
    await modelWllama?.detokenize([modelWllama?.getBOS()]),
  );
  const eos_token: string = textDecoder.decode(
    await modelWllama?.detokenize([modelWllama?.getEOS()]),
  );

  try {
    return template.render({
      messages,
      bos_token,
      eos_token,
      add_generation_prompt: true,
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export const toHumanReadableSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

export const DebugLogger = {
  content: [] as string[],
  debug(...args: any) {
    console.debug('🔧', ...args);
    DebugLogger.content.push(`🔧 ${DebugLogger.argsToStr(args)}`);
  },
  log(...args: any) {
    console.log('ℹ️', ...args);
    DebugLogger.content.push(`ℹ️ ${DebugLogger.argsToStr(args)}`);
  },
  warn(...args: any) {
    console.warn('⚠️', ...args);
    DebugLogger.content.push(`⚠️ ${DebugLogger.argsToStr(args)}`);
  },
  error(...args: any) {
    console.error('☠️', ...args);
    DebugLogger.content.push(`☠️ ${DebugLogger.argsToStr(args)}`);
  },
  argsToStr(args: any[]): string {
    return args
      .map((arg) => {
        if (arg.startsWith) {
          return arg;
        } else {
          try {
            return JSON.stringify(arg, null, 2);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_) {
            return '';
          }
        }
      })
      .join(' ');
  },
};

export function useDebounce<T extends any[]>(
  effect: (...args: T) => void,
  dependencies: any[],
  delay: number,
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
