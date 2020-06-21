import last from "lodash/last";
import { parse } from "date-fns";

export type ChattingSpeed = Array<{
    time: number;
    allFrequency: number;
    allTexts: string[];
    youtubeFrequency: number;
    youtubeTexts: string[];
    laughFrequency: number;
    laughTexts: string[];
    surpriseFrequency: number;
    surpriseTexts: string[];
    questionMarkFrequency: number;
    questionMarkTexts: string[];
    exclamationMarkFrequency: number;
    exclamationMarkTexts: string[];
}>

type ParsedChat = {
    time: number;
    text: string; 
}

export const getChattingSpeed = (chatLog: string, keyword: FilteringKeyword | FilteringKeyword[] = "ALL", timeIntervalInMs: number = 10000): ChattingSpeed => {
    // Assert that chatLog가 시간에 대해 오름차순으로 정렬됨. 
    if (chatLog.length === 0) {
        return []
    }
    const keywordArray = ensureArray(keyword);
    const parsedChatList = getParsedChatList(chatLog, timeIntervalInMs);

    return parsedChatList.reduce<ChattingSpeed>((acc, cur) => {
        const lastElement = last(acc);
        const newLastElement = lastElement?.time === cur.time ? lastElement : {
          time: cur.time,
          allFrequency: 0,
          allTexts: [],
          youtubeFrequency: 0,
          youtubeTexts: [],
          laughFrequency: 0,
          laughTexts: [],
          surpriseFrequency: 0,
          surpriseTexts: [],
          questionMarkFrequency: 0,
          questionMarkTexts: [],
          exclamationMarkFrequency: 0,
          exclamationMarkTexts: [],
        }
        if(keywordArray.includes("ALL")) {
          newLastElement.allFrequency += 1;
          newLastElement.allTexts.push(cur.text);
        }
        if(keywordArray.includes("YOUTUBE") && includes(cur.text, WORDS_LIKE_YOUTUBE)) {
          newLastElement.youtubeFrequency += 1;
          newLastElement.youtubeTexts.push(cur.text);
        }
        if(keywordArray.includes("LAUGH") && cur.text.startsWith("ㅋㅋㅋ")) {
          newLastElement.laughFrequency += 1;
          newLastElement.laughTexts.push(cur.text);
        }
        if(keywordArray.includes("SURPRISE") && cur.text.startsWith("캬")) {
          newLastElement.surpriseFrequency += 1;
          newLastElement.surpriseTexts.push(cur.text);
        }
        if(keywordArray.includes("QUESTION_MARK") && cur.text.startsWith("?")) {
          newLastElement.questionMarkFrequency += 1;
          newLastElement.questionMarkTexts.push(cur.text);
        }
        if(keywordArray.includes("EXCLAMATION_MARK") && cur.text.includes("!")) {
          newLastElement.exclamationMarkFrequency += 1;
          newLastElement.exclamationMarkTexts.push(cur.text);
        }
        return lastElement?.time === cur.time ? [...acc.slice(0, acc.length-1), newLastElement] : [...acc, newLastElement];
    }, [])
}

const validChat = (maybeChat: string) => {
  return maybeChat[0] === "[" && maybeChat.includes("<")
}

export const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss"

const floor = (x: number, unit: number) => {
    return Math.floor(x / unit) * unit;
}

export type FilteringKeyword = "ALL" | "YOUTUBE" | "LAUGH" | "SURPRISE" | "QUESTION_MARK" |  "EXCLAMATION_MARK";
const WORDS_LIKE_YOUTUBE = ["유튜브", "유튭", "유투브", "유투", "유튜", "유하"]

const includes = (str: string, targets: string[]) => targets.some(t => str.includes(t));

const filterByKeyword = (text: string, keyword: FilteringKeyword) => {
  switch (keyword) {
    case "ALL":
        return true;
    case "YOUTUBE":
        return includes(text, WORDS_LIKE_YOUTUBE);
    case "LAUGH":
        return text.startsWith("ㅋㅋㅋ");
    case "SURPRISE":
        return text.startsWith("캬");
    case "QUESTION_MARK":
        return text.startsWith("?");
    case "EXCLAMATION_MARK":
        return text.includes("!");
    default:
        throw new Error("NOT REACHED");
  }
}

export const parseChat = (chat: string): ParsedChat => {
    const beginIndexOfTime = chat.indexOf("[");
    const endIndexOfTime = chat.indexOf("]");
    const endIndexOfAuthor = chat.indexOf(">");
    const timestamp = chat.slice(beginIndexOfTime+1, endIndexOfTime);
    const time = parse(timestamp, DATE_FORMAT, new Date()).getTime();
    
    const text = chat.slice(endIndexOfAuthor+1).trim();

    return {
        time,
        text,
    }
}

const getParsedChatList = (chatLog: string, timeIntervalInMs: number = 10000): ParsedChat[] => {
  if (chatLog.length === 0) {
    return []
  }
  return chatLog.split("\n").filter(validChat).map<ParsedChat>(e => {
      const { time, text } = parseChat(e);
      const flooredTime = floor(time, timeIntervalInMs);
      return  {
          time: flooredTime,
          text,
      }
  })
}

const ensureArray = (x: string | string[]): string[] => {
  if (typeof x === "string") {
    return [x];
  }
  return x;
}