"use client"

import type { FeedbackWithStringDate } from "@/db/type"
import type { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<FeedbackWithStringDate>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "userName",
    header: "userName",
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    accessorKey: "sentiment",
    header: "sentiment",
  },
  {
    accessorKey: "comment",
    header: "comment",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    accessorKey: "age",
    header: "age",
  },
  {
    accessorKey: "rating",
    header: "rating",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
]
