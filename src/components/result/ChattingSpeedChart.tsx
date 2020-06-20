import { format } from "date-fns";
import React from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, LineChart, Tooltip } from "recharts";
import { ChattingSpeed } from "../../util";

export default function ChattingSpeedChart({chattingSpeed}: {chattingSpeed: ChattingSpeed}) {
    return (
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
                <Line dataKey="frequency" stroke="#ff8900" fillOpacity={0.2} fill="#ff8900" name="빈도" />
            </LineChart>
        </ResponsiveContainer>
    );
}
