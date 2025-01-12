"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import type { DailyCount } from "@/db/type"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

const chartConfig = {
  count: {
    label: "投稿数",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function LineChartComponent({ chartData, className }: { chartData: DailyCount[], className?: string }) {
  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);
  const averageCount = Math.round(totalCount / chartData.length);
  const dailyRange = `${(new Date(chartData[0].date)).toLocaleDateString("ja-JP")} ~ ${(new Date(chartData[chartData.length - 1].date)).toLocaleDateString("ja-JP")}`;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>投稿数の推移</CardTitle>
        <CardDescription>{dailyRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 12, right: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-count)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          日毎平均投稿数 <span className="text-primary">{averageCount}</span> 件<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          合計投稿数 <span className="text-primary">{totalCount}</span> 件
        </div>
      </CardFooter>
    </Card>
  )
}
