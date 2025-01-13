import { PageHeader } from "@/components/page-header";
import { getFeedbackItems } from "@/db/actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
export default async function Page() {
  const feedbacks = await getFeedbackItems({ page: 1, pageSize: 50 });

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="Feedback Data" />
      <main className="flex flex-col gap-4 p-4 pt-0 container mx-auto">
        <DataTable columns={columns} data={feedbacks} />
      </main>
    </div>
  );
}
