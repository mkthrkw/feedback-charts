import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { RadarChartComponent } from "@/components/charts/radar-chart";
import { RadialChartComponent } from "@/components/charts/radial-chart";
import { PageHeader } from "@/components/layouts/page-header";
import { getCategoryCounts, getDailyCountsAndRating, getGenerationCounts, getRatingCounts, getSentimentCounts } from "@/db/actions";
import { differenceInDays, endOfDay, format, startOfDay, subDays } from "date-fns";
import { DateRangePicker } from "./components/date-range-picker";
import { SummaryCards } from "./components/summary-cards";

export default async function Page(props: {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const defaultFrom = startOfDay(subDays(new Date(), 7));
  const defaultTo = endOfDay(new Date());
  const rangeFrom = searchParams?.from ? startOfDay(new Date(searchParams.from)) : defaultFrom;
  const rangeTo = searchParams?.to ? endOfDay(new Date(searchParams.to)) : defaultTo;

  const [dailyCountsAndRating, categoryCounts, sentimentCounts, generationCounts, ratingCounts] = await Promise.all([
    getDailyCountsAndRating({ rangeFrom: rangeFrom, rangeTo: rangeTo }),
    getCategoryCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo }),
    getSentimentCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo }),
    getGenerationCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo }),
    getRatingCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo }),
  ]);

  const totalCount = dailyCountsAndRating.reduce((acc, curr) => acc + curr.count, 0);
  const dailyAverageCount = Math.round(totalCount / dailyCountsAndRating.length);
  const totalAverageRating = dailyCountsAndRating.reduce((acc, curr) => acc + curr.rating, 0);
  const dailyAverageRating = (totalAverageRating / dailyCountsAndRating.length).toFixed(2);
  const rangeDays = differenceInDays(rangeTo, rangeFrom);

  const rangeFromString = format(rangeFrom, "yyyy-MM-dd HH:mm:ss");
  const rangeToString = format(rangeTo, "yyyy-MM-dd HH:mm:ss");

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="DashBoard" />
      <main className="flex flex-col gap-2 sm:gap-4 p-4 pt-0 container max-w-6xl mx-auto">
        <div className="flex justify-end">
          <DateRangePicker rangeFromString={rangeFromString} rangeToString={rangeToString} />
        </div>
        {totalCount > 0 ? (
          <>
            <SummaryCards totalCount={String(totalCount)} dailyAverageCount={String(dailyAverageCount)} dailyAverageRating={String(dailyAverageRating)} rangeDays={String(rangeDays)} />
            <LineChartComponent chartData={dailyCountsAndRating} className="w-full" />
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              <PieChartComponent chartData={categoryCounts} className="w-full" />
              <RadarChartComponent chartData={sentimentCounts} className="w-full" />
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              <BarChartComponent chartData={generationCounts} className="w-full" />
              <RadialChartComponent chartData={ratingCounts} className="w-full" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold">データがありません</h2>
            <p>データがありません。</p>
          </div>
        )}
      </main>
    </div>
  );
}
