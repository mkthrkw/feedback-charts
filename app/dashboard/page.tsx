import { LineChartComponent } from "@/components/charts/line-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { RadarChartComponent } from "@/components/charts/radar-chart";
import { PageHeader } from "@/components/page-header";
import { getCategoryCounts, getDailyCounts, getSentimentCounts } from "@/db/actions";

export default async function Page() {

  const fromParam = 30;
  const toParam = 0;

  const now = new Date();
  const from = new Date(new Date().setDate(now.getDate() - fromParam));
  const to = new Date(new Date().setDate(now.getDate() - toParam));

  console.log(from, to);
  const dailyCounts = await getDailyCounts({ from: from, to: to });
  const categoryCounts = await getCategoryCounts({ from: from, to: to });
  const sentimentCounts = await getSentimentCounts({ from: from, to: to });

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="DashBoard" />
      <main className="flex flex-col gap-4 p-4 pt-0 container mx-auto">
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
