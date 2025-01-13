import { LineChartComponent } from "@/components/charts/line-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { RadarChartComponent } from "@/components/charts/radar-chart";
import { PageHeader } from "@/components/layouts/page-header";
import { getCategoryCounts, getDailyCounts, getSentimentCounts } from "@/db/actions";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { DateRangePicker } from "./date-range-picker";

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

  const dailyCounts = await getDailyCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo });
  const categoryCounts = await getCategoryCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo });
  const sentimentCounts = await getSentimentCounts({ rangeFrom: rangeFrom, rangeTo: rangeTo });

  const rangeFromString = format(rangeFrom, "yyyy-MM-dd HH:mm:ss");
  const rangeToString = format(rangeTo, "yyyy-MM-dd HH:mm:ss");

  console.log(rangeFromString, rangeToString);

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="DashBoard" />
      <main className="flex flex-col gap-4 p-4 pt-0 container mx-auto">
        <div className="flex justify-end">
          <DateRangePicker rangeFromString={rangeFromString} rangeToString={rangeToString} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <LineChartComponent chartData={dailyCounts} className="w-full" />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <PieChartComponent chartData={categoryCounts} className="w-full" />
          <RadarChartComponent chartData={sentimentCounts} className="w-full" />
        </div>
      </main>
    </div>
  );
}
