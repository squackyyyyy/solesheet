"use client";

import type { ReactNode } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type TableProps,
} from "react-aria-components/Table";
import {
  Button as AriaButton,
  type ButtonProps,
} from "react-aria-components/Button";
import {
  Input,
  TextField,
  type TextFieldProps,
} from "react-aria-components/TextField";
import {
  Button as SelectButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  type SelectProps,
} from "react-aria-components/Select";

export function BrowserAppTable({ className, ...props }: TableProps) {
  return (
    <Table
      {...props}
      className={`w-full table-fixed border-separate border-spacing-0 outline-none data-[focus-visible]:ring-3 data-[focus-visible]:ring-emerald-600/25 ${className ?? ""}`}
    />
  );
}

export function BrowserAppTableHeader({ children }: { children: ReactNode }) {
  return <TableHeader className="bg-stone-50">{children}</TableHeader>;
}

export function BrowserAppColumn({ className, ...props }: ColumnProps) {
  return (
    <Column
      {...props}
      className={`border-b border-stone-200 px-2.5 py-3 text-left text-[11px] font-black uppercase tracking-[0.08em] text-stone-500 outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-emerald-600 ${className ?? ""}`}
    />
  );
}

export function BrowserAppTableBody({ children }: { children: ReactNode }) {
  return <TableBody>{children}</TableBody>;
}

export function BrowserAppRow<T extends object>({ className, ...props }: RowProps<T>) {
  return (
    <Row
      {...props}
      className={`bg-white outline-none data-[focus-visible-within]:bg-emerald-50/45 ${className ?? ""}`}
    />
  );
}

export function BrowserAppCell({ className, ...props }: CellProps) {
  return (
    <Cell
      {...props}
      className={`border-b border-stone-100 px-2 py-2 align-middle outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-emerald-600 ${className ?? ""}`}
    />
  );
}

export function BrowserAppTextField({
  value,
  className,
  ...props
}: Omit<TextFieldProps, "children"> & { value: string; className?: string }) {
  return (
    <TextField {...props} value={value} isReadOnly className="group min-w-0">
      <Input
        className={`min-h-11 w-full min-w-0 rounded-xl border border-stone-200 bg-white px-3 text-[13px] font-semibold text-stone-900 outline-none shadow-sm data-[focused]:border-emerald-600 data-[focus-visible]:ring-3 data-[focus-visible]:ring-emerald-600/20 ${className ?? ""}`}
      />
    </TextField>
  );
}

export function BrowserAppSelect({
  value,
  options,
  ...props
}: Omit<SelectProps<object>, "children" | "selectedKey"> & {
  value: string;
  options: readonly string[];
}) {
  return (
    <Select {...props} selectedKey={value} className="group min-w-0">
      <SelectButton className="flex min-h-11 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3 text-left text-[13px] font-semibold text-stone-900 outline-none shadow-sm data-[focus-visible]:border-emerald-600 data-[focus-visible]:ring-3 data-[focus-visible]:ring-emerald-600/20">
        <span className="truncate">{value}</span>
        <span aria-hidden="true" className="-mt-1 size-2 shrink-0 rotate-45 border-b-2 border-r-2 border-stone-400" />
      </SelectButton>
      <Popover className="rounded-xl border border-stone-200 bg-white p-1 shadow-xl">
        <ListBox className="outline-none">
          {options.map((option) => (
            <ListBoxItem
              id={option}
              key={option}
              textValue={option}
              className="rounded-lg px-3 py-2 text-sm outline-none data-[focused]:bg-emerald-50 data-[selected]:bg-emerald-700 data-[selected]:text-white"
            >
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

export function BrowserAppButton({
  tone = "secondary",
  className,
  ...props
}: ButtonProps & { tone?: "primary" | "secondary" | "quiet" }) {
  return (
    <AriaButton
      {...props}
      className={(state) =>
        `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-black outline-none transition data-[focus-visible]:ring-3 data-[focus-visible]:ring-emerald-500 data-[focus-visible]:ring-offset-2 ${
          tone === "primary"
            ? "bg-emerald-700 text-white shadow-[0_12px_26px_rgba(4,120,87,.2)] data-[hovered]:bg-emerald-800"
            : tone === "quiet"
              ? "border border-dashed border-emerald-300 bg-emerald-50/50 text-emerald-800 data-[hovered]:bg-emerald-50"
              : "border border-stone-200 bg-white text-stone-800 shadow-sm data-[hovered]:border-emerald-400 data-[hovered]:bg-emerald-50"
        } ${typeof className === "function" ? className(state) : className ?? ""}`
      }
    />
  );
}
