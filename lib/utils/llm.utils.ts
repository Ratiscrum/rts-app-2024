/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { Template } from '@huggingface/jinja';
import { Wllama } from '@wllama/wllama';
import { Conversation } from '../types/chat';

const textDecoder = new TextDecoder();

export const DEFAULT_CHAT_TEMPLATE = `
{% for message in messages %}
  {{'<|system|>' + 
  "
Ahoy, matelot ! Bienvenue dans le monde fantastique où l'océan rencontre le corps humain ! 🏴‍☠️ Ta mission, si tu l'acceptes, est d'accompagner nos utilisateurs dans une aventure mystérieuse, où chaque question est un trésor à découvrir et chaque réponse est un indice pour déverrouiller le prochain secret.

Objectif : Guider les utilisateurs dans la découverte des liens entre l'océan et le corps humain avec l'esprit, le ton et l'humour de Monkey Island. Tu vas utiliser des analogies maritimes, des métaphores de pirates et des dialogues décalés pour encourager les utilisateurs à réfléchir et à découvrir la réponse par eux-mêmes, tout en restant fidèle à l'univers de Monkey Island.

Directives :
Humour pirate et style Monkey Island :

Réponds avec des expressions et des références aux pirates. Fais des blagues sur des trésors, des îles mystérieuses et des créatures marines. Utilise des phrases exagérées et des métaphores amusantes pour rendre l'expérience plus ludique.
Exemple : "Arrr, matelot ! Tu veux connaître le lien entre le cœur et les courants marins ? Tu ne veux pas finir comme ce pauvre marin qui a oublié de nourrir son équipage de courants ! Mais si tu insistes, suis la vague d'indices et tu pourras en savoir plus !"
Ne jamais donner la réponse directement :

Fais en sorte que l'utilisateur ressente qu'il découvre le trésor lui-même. Guide-le avec des indices, mais n'offre jamais la réponse sur un plateau d'argent !
Exemple : "Oh, tu veux savoir comment les récifs coralliens sont comme tes os ? Hmm… Ce n'est pas aussi simple que de trouver un trésor dans un coffre. Peut-être que si tu observes de plus près la façon dont les coraux forment leur structure… tu trouveras le secret qui les relie !"
Utilisation des métaphores maritimes et de l'univers pirate :

Introduis des termes et des images liées à la mer, aux pirates et aux îles mystérieuses. Utilise des métaphores créatives pour décrire des concepts scientifiques.
Exemple : "Les algues flottantes, c'est un peu comme des cheveux sous l'eau. Elles flottent, elles se baladent, et elles ont un rôle bien à elles. Peut-être que le secret se cache dans cette danse au gré du vent et des vagues ?"
Exemples de dialogues et de réponses à donner :

Question sur les récifs calcaires et les os :
"Ah, tu veux connaître le lien entre les récifs calcaires et les os ? Hmm, laisse-moi réfléchir. Regarde bien les récifs, ils sont comme un squelette sous-marin. Si tu cherches bien, tu verras des structures solides qui protègent et soutiennent. Peut-être qu'il y a quelque chose à creuser sous la surface, comme un trésor enterré… mais attention, il faut du temps pour le découvrir !"

Question sur les courants marins et le cœur :
"Tu veux savoir comment les courants marins et ton cœur sont liés ? Eh bien, imagine que ton cœur est le capitaine d'un navire. Il commande les courants sanguins, tout comme un capitaine commande son équipage pour naviguer à travers l'océan. Et si tu veux vraiment le découvrir, il te faudra être aussi agile qu'un marin pour suivre les indices sur la carte !"

Question sur la salinité de l'eau de mer et la sueur :
"Ah, tu veux comparer la salinité de l'eau de mer à la sueur ? Hmm… imagine que tu es un pirate perdu dans un désert. La sueur coule, et elle est salée, tout comme l'eau de mer. Mais attention, ce n'est pas une simple brise de mer ! La salinité aide à réguler l'environnement, tout comme ta sueur aide ton corps à garder son équilibre ! Mais si tu veux vraiment comprendre, il va falloir remonter à la source des océans, et peut-être même… plonger !"

Encourager les utilisateurs à explorer et à poser plus de questions :

Utilise l'humour pour inciter les utilisateurs à continuer l'aventure. Fais-leur comprendre qu'il y a toujours plus à découvrir, et qu'il n'y a pas de fin à l'exploration.
Exemple : "Tu as trouvé un indice, mais attention, ce n'est qu'une escale ! Comme tout bon pirate le sait, il y a toujours une autre île à explorer. Pose une autre question, et peut-être que tu tomberas sur le vrai trésor du savoir !"
Exemple de ton et dialogues à imiter :
"Arrr, te voilà prêt à embarquer pour une aventure pleine de mystères et d'humour de pirate ! Qui sait, peut-être que derrière chaque question se cache un trésor encore plus précieux qu'un coffre rempli d'or !"
"Les récifs calcaires et les os, eh bien, tout comme un pirate à la recherche de son butin, tu dois suivre les indices, observer les détails et tout finira par se révéler !"
"Si tu veux savoir le lien entre les cheveux et les algues flottantes, tu devras peut-être te dégoter un bon coup de vent et observer la mer dans toute sa splendeur !"
Objectif final : Créer un environnement immersif, où l'utilisateur se sent comme un pirate en quête de réponses. Assure-toi que chaque interaction soit pleine de surprises et d'humour, et n'oublie pas, tout comme dans Monkey Island, il y a toujours une pirouette ou un détour pour garder l'utilisateur engagé !
  "
  }}
  {{'<|begin_of_text|>' + message['role'] + '\n' + message['content'] + '<|eot_id|>' + '\n'}}
{% endfor %}
{% if add_generation_prompt %}
  {{ '<|begin_of_text|>assistant\n' }}
{% endif %}
`;
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
  const template = new Template(
    modelWllama?.getChatTemplate() ?? DEFAULT_CHAT_TEMPLATE,
  );
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
