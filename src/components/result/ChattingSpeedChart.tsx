import { format } from "date-fns";
import React from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, LineChart, Tooltip } from "recharts";
import { ChattingSpeed } from "../../util";
import isEmpty from "lodash/isEmpty";

export default function ChattingSpeedChart({chattingSpeed}: {chattingSpeed: ChattingSpeed}) {
    return !isEmpty(chattingSpeed) ? (
        <ResponsiveContainer height={320}>
            <LineChart data={chattingSpeed} margin={{ top: 20, left: -20, right: 20 }}>
                <XAxis
                    dataKey="time"
                    type="number"
                    tickFormatter={(value: number) => format(value, 'HH:mm:ss')}
                    tickLine={true}
                    tick={{ fontSize: 10 }}
                    domain={["dataMin", "dataMax"]}
                />
                <YAxis
                    axisLine={false}
                    tickLine={true}
                    label={{ position: "left" }}
                    tick={{ fontSize: 10,  }}
                    scale="linear"
                />
                <CartesianGrid strokeDasharray="3" horizontal={false} />
                <Tooltip labelFormatter={(label: number | string) => typeof label === "number" ? format(label, 'HH:mm:ss') : null} />
                <Line dataKey="frequency" dot={false} stroke="#ff8900" fillOpacity={0.2} name="채팅 수" />
            </LineChart>
        </ResponsiveContainer>
        ) : null;
}