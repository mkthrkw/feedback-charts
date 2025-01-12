import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getFeedbackItems } from "@/db/actions";
export default async function Page() {
  const feedbacks = await getFeedbackItems({ page: 1, pageSize: 50 });

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="Feedback Data" />
      <main className="flex flex-col gap-4 p-4 pt-0 container mx-auto">
        <Table className="text-xs md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>userName</TableHead>
              <TableHead>category</TableHead>
              <TableHead>sentiment</TableHead>
              <TableHead>comment</TableHead>
              <TableHead>gender</TableHead>
              <TableHead>age</TableHead>
              <TableHead>rating</TableHead>
              <TableHead>createdAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.id}</TableCell>
                <TableCell>{feedback.userName}</TableCell>
                <TableCell>{feedback.category}</TableCell>
                <TableCell>{feedback.sentiment}</TableCell>
                <TableCell>{feedback.comment}</TableCell>
                <TableCell>{feedback.gender}</TableCell>
                <TableCell>{feedback.age}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>{feedback.createdAt.toLocaleDateString("ja-JP")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
