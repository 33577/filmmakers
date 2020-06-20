import last from "lodash/last";
import { parse } from "date-fns";

export type ChattingSpeed = Array<{
    time: number;
    frequency: number;
}>

type ParsedChat = {
    time: number;
    content?: string; 
    author?: string;
}

export const DATE_FORMAT = "yyyy-MM-dd HH:mm:SS"

const round = (x: number, unit: number) => {
    return Math.floor(x / unit) * unit;
}

const validChat = (maybeChat: string) => {
    return maybeChat[0] === "[" && maybeChat.includes("<")
}

export const getChattingSpeed = (chatLog: string, timeIntervalInSeconds: number = 10): ChattingSpeed => {
    if (chatLog.length === 0) {
        return []
    }
    return chatLog.split("\n").filter(validChat).reduce<ChattingSpeed>((acc, cur) => {
        const { time } = parseChat(cur)
        const roundedTime = round(time, timeIntervalInSeconds);
        const lastElement = last(acc);
        if (lastElement?.time === roundedTime) {
            lastElement.frequency += 1;
            return acc;
        }
        return [...acc, {
            time: roundedTime,
            frequency: 1,
        }]
    }, [])
}

export const parseChat = (chat: string): ParsedChat => {
    const beginIndexOfTime = chat.indexOf("[");
    const endIndexOfTime = chat.indexOf("]");
    const timestamp = chat.slice(beginIndexOfTime+1, endIndexOfTime);
    const time = parse(timestamp, DATE_FORMAT, new Date()).getTime();
    return {
        time
    }
}


