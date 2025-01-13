"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
import type { CategoryCount } from "@/db/type"


const chartConfig = {
  UI: {
    label: "UI",
    color: "hsl(var(--chart-1))",
  },
  FeatureRequest: {
    label: "FeatureRequest",
    color: "hsl(var(--chart-2))",
  },
  Pricing: {
    label: "Pricing",
    color: "hsl(var(--chart-3))",
  },
  Support: {
    label: "Support",
    color: "hsl(var(--chart-4))",
  },
  Performance: {
    label: "Performance",
    color: "hsl(var(--chart-5))",
  },
  Accessibility: {
    label: "Accessibility",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function PieChartComponent({ chartData, className }: { chartData: CategoryCount[], className?: string }) {

  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);
  const chartDataWithColor = chartData.map(category => ({
    category: category.category,
    count: category.count,
    fill: `var(--color-${category.category})`,
  }))
  const getLegendComponent = chartData.map((category) => (
    <div key={category.category} className="flex items-center font-medium">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartConfig[category.category as keyof typeof chartConfig].color }} />
      {category.category}
    </div>
  ))
  const mostPopularCategory = chartData.reduce((acc, curr) => acc.count > curr.count ? acc : curr);
  const leastPopularCategory = chartData.reduce((acc, curr) => acc.count < curr.count ? acc : curr);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>カテゴリ別投稿数</CardTitle>
        <CardDescription>
          <div className="flex gap-2 flex-wrap">
            {getLegendComponent}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataWithColor}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Count
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4 text-green-500" />最も多い投稿： {mostPopularCategory.category}({mostPopularCategory.count.toLocaleString()} 件)
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          <TrendingDown className="h-4 w-4 text-red-500" />最も少ない投稿： {leastPopularCategory.category}({leastPopularCategory.count.toLocaleString()} 件)
        </div>
      </CardFooter>
    </Card>
  )
}
