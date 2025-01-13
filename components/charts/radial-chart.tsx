"use client"

import { LabelList, RadialBar, RadialBarChart } from "recharts"

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
import type { RatingCount } from "@/db/type"
import clsx from "clsx"

const chartConfig = {
  count: {
    label: "Count",
  },
  5: {
    label: "5点",
    color: "hsl(var(--chart-1))",
  },
  4: {
    label: "4点",
    color: "hsl(var(--chart-2))",
  },
  3: {
    label: "3点",
    color: "hsl(var(--chart-3))",
  },
  2: {
    label: "2点",
    color: "hsl(var(--chart-4))",
  },
  1: {
    label: "1点",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function RadialChartComponent({ chartData, className }: { chartData: RatingCount[], className?: string }) {

  const chartDataWithColor = chartData.map(data => ({
    ...data,
    fill: `var(--color-${data.rating})`,
  }))

  return (
    <Card className={clsx("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>評価点</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartDataWithColor}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="rating" />}
              formatter={(value: number) => `${value}件`}
            />
            <RadialBar dataKey="count" background>
              <LabelList
                position="insideStart"
                dataKey="rating"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
                formatter={(value: number) => `${value}点`}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
