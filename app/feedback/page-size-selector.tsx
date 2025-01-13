"use client"

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RotateCcw } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

export function PageSizeSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageSize = searchParams.get("pageSize") || 10;
  const [pageSize, setPageSize] = React.useState(currentPageSize);
  const handleChange = (value: string) => {
    setPageSize(Number(value));
  }
  const handleClick = () => {
    router.push(`${pathname}?pageSize=${pageSize}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={pageSize.toString()} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a page size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Page Size</SelectLabel>
            {[10, 25, 50, 100, 200].map((item) => (
              <SelectItem key={item} value={item.toString()}>{item} items/page</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select >
      <Button onClick={handleClick}><RotateCcw /></Button>
    </div>
  )
}
