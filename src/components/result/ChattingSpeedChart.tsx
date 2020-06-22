import { format } from "date-fns";
import React from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, LineChart, Tooltip } from "recharts";
import isEmpty from "lodash/isEmpty";
import { ChattingSpeed } from "../../util";

export default function ChattingSpeedChart({ chattingSpeed, title }: { chattingSpeed: ChattingSpeed; title?: string }) {
    const renderAllChart = !isEmpty(chattingSpeed.filter((e) => e.allFrequency !== 0));
    const renderLaughChart = !isEmpty(chattingSpeed.filter((e) => e.laughFrequency !== 0));
    const renderYoutubeChart = !isEmpty(chattingSpeed.filter((e) => e.youtubeFrequency !== 0));
    const renderSurpriseChart = !isEmpty(chattingSpeed.filter((e) => e.surpriseFrequency !== 0));
    const renderQuestionMarkChart = !isEmpty(chattingSpeed.filter((e) => e.questionMarkFrequency !== 0));
    const renderExclamationMarkChart = !isEmpty(chattingSpeed.filter((e) => e.exclamationMarkFrequency !== 0));

    return !isEmpty(chattingSpeed) ? (
        <div style={{ marginTop: 40 }}>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <ResponsiveContainer height={320}>
                <LineChart data={chattingSpeed} margin={{ top: 20, left: -20, right: 20 }}>
                    <XAxis
                        dataKey="time"
                        type="number"
                        tickFormatter={(value: number) => format(value, "HH:mm:ss")}
                        tickLine
                        tick={{ fontSize: 10 }}
                        domain={["dataMin", "dataMax"]}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine
                        label={{ position: "left" }}
                        tick={{ fontSize: 10 }}
                        scale="linear"
                    />
                    <CartesianGrid strokeDasharray="3" horizontal={false} />
                    <Tooltip
                        labelFormatter={(label: number | string) => {
                            const chat = chattingSpeed.find((e) => e.time === label);
                            return typeof label === "number" ? (
                                <>
                                    {format(label, "HH:mm:ss")}
                                    <br />
                                    {chat?.allTexts.join(", ")}
                                    <br />
                                    {chat?.laughTexts.join(", ")}
                                    <br />
                                    {chat?.youtubeTexts.join(", ")}
                                    <br />
                                    {chat?.surpriseTexts.join(", ")}
                                    <br />
                                    {chat?.exclamationMarkTexts.join(", ")}
                                    <br />
                                    {chat?.questionMarkTexts.join(", ")}
                                    <br />
                                </>
                            ) : null;
                        }}
                    />
                    {renderAllChart && (
                        <Line dataKey="allFrequency" dot={false} stroke="grey" fillOpacity={0.2} name="전체 채팅 수" />
                    )}
                    {renderLaughChart && (
                        <Line dataKey="laughFrequency" dot={false} stroke="blue" fillOpacity={0.2} name="ㅋㅋㅋㅋ" />
                    )}
                    {renderYoutubeChart && (
                        <Line
                            dataKey="youtubeFrequency"
                            dot={false}
                            stroke="red"
                            fillOpacity={0.2}
                            name="유튜브 언급"
                        />
                    )}
                    {renderSurpriseChart && (
                        <Line dataKey="surpriseFrequency" dot={false} stroke="orange" fillOpacity={0.2} name="감탄" />
                    )}
                    {renderExclamationMarkChart && (
                        <Line
                            dataKey="exclamationMarkFrequency"
                            dot={false}
                            stroke="green"
                            fillOpacity={0.2}
                            name="느낌표"
                        />
                    )}
                    {renderQuestionMarkChart && (
                        <Line
                            dataKey="questionMarkFrequency"
                            dot={false}
                            stroke="purple"
                            fillOpacity={0.2}
                            name="물음표"
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    ) : null;
}
