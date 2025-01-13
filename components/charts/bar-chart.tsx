"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { GenerationCount } from "@/db/type"


const chartConfig = {
  count: {
    label: "投稿数",
  },
  generation: {
    label: "年代",
  },
  10: {
    label: "10代",
    color: "hsl(var(--chart-1))",
  },
  20: {
    label: "20代",
    color: "hsl(var(--chart-2))",
  },
  30: {
    label: "30代",
    color: "hsl(var(--chart-3))",
  },
  40: {
    label: "40代",
    color: "hsl(var(--chart-4))",
  },
  50: {
    label: "50代",
    color: "hsl(var(--chart-5))",
  },
  60: {
    label: "60代",
    color: "hsl(var(--chart-6))",
  },
  70: {
    label: "70代",
    color: "hsl(var(--chart-1))",
  },
  80: {
    label: "80代",
    color: "hsl(var(--chart-2))",
  },
  90: {
    label: "90代",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function BarChartComponent({ chartData, className }: { chartData: GenerationCount[], className?: string }) {

  const chartDataWithColor = chartData.map((data) => ({
    ...data,
    fill: `var(--color-${data.generation})`,
  }))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>年代別</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full mt-0 sm:mt-4">
          <BarChart
            accessibilityLayer
            data={chartDataWithColor}
            layout="vertical"
            margin={{
              left: 0,
              right: 12,
              top: 12,
              bottom: 0,
            }}
          >
            <YAxis
              dataKey="generation"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent >
    </Card >
  )
}
