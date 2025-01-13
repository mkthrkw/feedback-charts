import { PageHeader } from "@/components/layouts/page-header";
import { getFeedbackItems, getTotalPages } from "@/db/actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { FeedbackPagination } from "./feedback-pagination";
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    pageSize?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const pageSize = searchParams?.pageSize ? Number(searchParams.pageSize) : 10;

  const feedbacks = await getFeedbackItems({ page: currentPage, pageSize });
  const totalPages = await getTotalPages({ pageSize });

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="Feedback Data" />
      <main className="flex flex-col gap-4 p-4 pt-0 container mx-auto">
        <DataTable columns={columns} data={feedbacks} />
        <FeedbackPagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} />
      </main>
    </div>
  );
}
