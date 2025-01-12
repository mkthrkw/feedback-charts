"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { SentimentCount } from "@/db/type"

const chartConfig = {
  sentiment: {
    label: "Sentiment",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarChartComponent({ chartData, className }: { chartData: SentimentCount[], className?: string }) {

  const mostPopularSentiment = chartData.reduce((acc, curr) => acc.count > curr.count ? acc : curr);
  const leastPopularSentiment = chartData.reduce((acc, curr) => acc.count < curr.count ? acc : curr);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-4">
        <CardTitle>センチメント分析</CardTitle>
        <CardDescription>
          投稿のコメントから感情スコア比率を抽出
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="sentiment" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-sentiment)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4 text-green-500" /> 最も多い感情：{mostPopularSentiment.sentiment}({mostPopularSentiment.count})
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          <TrendingDown className="h-4 w-4 text-red-500" /> 最も少ない感情：{leastPopularSentiment.sentiment}({leastPopularSentiment.count})
        </div>
      </CardFooter>
    </Card>
  )
}
