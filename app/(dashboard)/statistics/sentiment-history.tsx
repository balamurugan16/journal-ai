"use client";

import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts"

type Props = {
  data: {
    score: number | undefined;
    time: Date;
  }[]
}

export default function SentimentHistory({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
      >
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="time" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
