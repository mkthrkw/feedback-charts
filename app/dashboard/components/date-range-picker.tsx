"use client"

import { format, parseISO } from "date-fns"
import { CalendarIcon, RotateCcw } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface DateRangePickerProps {
  className?: string;
  rangeFromString: string;
  rangeToString: string;
}

export function DateRangePicker({
  className,
  rangeFromString,
  rangeToString
}: DateRangePickerProps) {

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: parseISO(rangeFromString),
    to: parseISO(rangeToString),
  })
  const router = useRouter();

  const handleDateChange = (date: DateRange | undefined) => {
    if (!date || !date.from || !date.to) return;
    setDate(date);
    router.push(`/dashboard?from=${format(date.from, "yyyy-MM-dd")}&to=${format(date.to, "yyyy-MM-dd")}`);
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <p className="text-sm">データ期間</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[210px] gap-2 justify-start text-start font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy/MM/dd ")} - {" "}
                  {format(date.to, "yyyy/MM/dd")}
                </>
              ) : (
                format(date.from, "yyyy/MM/dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={() => handleDateChange(date)} variant={"outline"} size={"icon"}><RotateCcw /></Button>
    </div>
  )
}
