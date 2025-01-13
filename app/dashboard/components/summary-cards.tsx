import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarFold, ClipboardPenLine, Star, Users } from "lucide-react";

export function SummaryCards({
  totalCount,
  dailyAverageCount,
  dailyAverageRating,
  rangeDays,
}: {
  totalCount: string;
  dailyAverageCount: string;
  dailyAverageRating: string;
  rangeDays: string;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            合計 投稿数
          </CardTitle>
          <Users className="w-4 h-4 sm:w-6 sm:h-6" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {totalCount}
            <span className="text-base sm:text-lg"> 件</span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            平均 投稿数
          </CardTitle>
          <ClipboardPenLine className="w-4 h-4 sm:w-6 sm:h-6" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {dailyAverageCount}
            <span className="text-base sm:text-lg"> 件</span>
            <span className="text-xs sm:text-sm text-muted-foreground"> / 日</span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            評価点 平均
          </CardTitle>
          <Star className="w-4 h-4 sm:w-6 sm:h-6" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {dailyAverageRating}
            <span className="text-base sm:text-lg"> 点</span>
            <span className="text-xs sm:text-sm text-muted-foreground"> / 件</span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            設定期間
          </CardTitle>
          <CalendarFold className="w-4 h-4 sm:w-6 sm:h-6" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {rangeDays}
            <span className="text-base sm:text-lg"> 日間</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}