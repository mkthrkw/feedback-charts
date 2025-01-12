import { SidebarTrigger } from "@/components/ui/sidebar";

export function PageHeader({ title }: { title: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <div className="w-full text-center mr-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
}