import { PageHeader } from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Home() {

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader title="Home" />
      <main className="flex flex-col p-4 pt-0 container-sm mx-auto items-center gap-16 text-start h-full lg:justify-center mb-16">
        <div className="w-full">
          <h2 className="text-xl font-bold">概要</h2>
          <p>フィードバック分析のサンプルサイトです。</p>
          <p>サンプルデータのため、実在しないデータを使用しています。</p>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold">ページ</h2>
          <p>各種分析データのグラフは、<a href="/dashboard" className="text-blue-500">DashBoard</a>ページで確認できます。</p>
          <p>データは、<a href="/data" className="text-blue-500">Data</a>ページで確認できます。</p>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold">サンプルデータについて</h2>
          <p>データは、<a href="https://fakerjs.dev/" className="text-blue-500">faker.js</a>を使用して生成しています。</p>
          <Table className="text-xs md:text-base mt-4">
            <TableCaption>A list of feedback data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>カラム名</TableHead>
                <TableHead>説明</TableHead>
                <TableHead>型</TableHead>
                <TableHead>例</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">id</TableCell>
                <TableCell>UUID</TableCell>
                <TableCell>string</TableCell>
                <TableCell>cm5tcv6r50008upr7sb4kc66e</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">userName</TableCell>
                <TableCell>投稿者の名前</TableCell>
                <TableCell>string</TableCell>
                <TableCell>John Doe</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">category</TableCell>
                <TableCell>投稿内容のカテゴリ</TableCell>
                <TableCell>string</TableCell>
                <TableCell>FeatureRequest</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">sentiment</TableCell>
                <TableCell>投稿の感情</TableCell>
                <TableCell>string</TableCell>
                <TableCell>positive</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">comment</TableCell>
                <TableCell>投稿内容</TableCell>
                <TableCell>string</TableCell>
                <TableCell>新しいデザインが素晴らしいです。</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">gender</TableCell>
                <TableCell>投稿者の性別</TableCell>
                <TableCell>string</TableCell>
                <TableCell>male</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">age</TableCell>
                <TableCell>投稿者の年齢</TableCell>
                <TableCell>number</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">rating</TableCell>
                <TableCell>投稿の評価</TableCell>
                <TableCell>number</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">createdAt</TableCell>
                <TableCell>作成日時</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>2024-01-01</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main >
      <footer className="flex h-16 shrink-0 items-center gap-2 px-4 justify-center text-sm text-muted-foreground">sample dashboard by mkthrkw</footer>
    </div >
  );
}
