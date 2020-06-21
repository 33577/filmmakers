import last from "lodash/last";
import { parse } from "date-fns";

export type ChattingSpeed = Array<{
    time: number;
    frequency: number;
    texts: string[];
}>

type ParsedChat = {
    time: number;
    text: string; 
}

export const getChattingSpeed = (chatLog: string, keyword: FilteringKeyword = "ALL", timeIntervalInMs: number = 10000): ChattingSpeed => {
    // Assert that chatLog가 시간에 대해 오름차순으로 정렬됨. 
    if (chatLog.length === 0) {
        return []
    }
    const parsedChatList = getParsedChatList(chatLog, timeIntervalInMs);

    return parsedChatList.filter(({text}) => filterByKeyword(text, keyword)).reduce<ChattingSpeed>((acc, cur) => {
        const lastElement = last(acc);
        if (lastElement?.time === cur.time) {
            lastElement.frequency += 1;
            lastElement.texts.push(cur.text)
            return acc;
        }
        return [...acc, {
            time: cur.time,
            frequency: 1,
            texts: [cur.text]
        }]
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
