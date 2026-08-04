"use client";

import type { ReactNode } from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components/Checkbox";
import {
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components/Modal";
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
  type TextFieldProps,
} from "react-aria-components/TextField";
import {
  Radio,
  RadioGroup,
  type RadioGroupProps,
} from "react-aria-components/RadioGroup";
import {
  Button as SelectButton,
  FieldError as SelectFieldError,
  Label as SelectLabel,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Text as SelectText,
  type SelectProps,
} from "react-aria-components/Select";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "quiet" | "app";

export function Button({
  variant = "primary",
  className,
  ...props
}: AriaButtonProps & { variant?: ButtonVariant }) {
  return (
    <AriaButton
      {...props}
      className={(state) =>
        cx(
          "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold outline-none transition duration-200",
          "data-[focus-visible]:ring-2 data-[focus-visible]:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-55",
          variant === "primary" &&
            "bg-[#2457ff] text-white shadow-[0_12px_30px_rgba(36,87,255,.25)] data-[hovered]:bg-[#1747e8] data-[pressed]:translate-y-px data-[focus-visible]:ring-[#2457ff]",
          variant === "secondary" &&
            "border border-[#171717]/15 bg-white text-[#171717] data-[hovered]:border-[#171717]/35 data-[hovered]:bg-[#f7f3e9] data-[focus-visible]:ring-[#2457ff]",
          variant === "quiet" &&
            "text-[#171717] data-[hovered]:bg-black/5 data-[focus-visible]:ring-[#2457ff]",
          variant === "app" &&
            "bg-emerald-700 text-white data-[hovered]:bg-emerald-800 data-[focus-visible]:ring-emerald-700",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export type TextInputProps = Omit<TextFieldProps, "children"> & {
  label: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  inputId?: string;
};

export function TextInput({
  label,
  description,
  errorMessage,
  placeholder,
  type = "text",
  inputId,
  ...props
}: TextInputProps) {
  return (
    <TextField
      {...props}
      isInvalid={Boolean(errorMessage)}
      className="group grid gap-2"
    >
      <Label className="text-sm font-semibold text-[#171717]">{label}</Label>
      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="h-13 w-full rounded-2xl border border-black/15 bg-white px-4 text-base text-[#171717] outline-none transition placeholder:text-black/60 data-[focused]:border-[#2457ff] data-[focused]:ring-3 data-[focused]:ring-[#2457ff]/12 data-[invalid]:border-red-600"
      />
      {description ? (
        <Text slot="description" className="text-xs leading-5 text-black/65">
          {description}
        </Text>
      ) : null}
      <FieldError className="text-xs font-medium text-red-700">
        {errorMessage}
      </FieldError>
    </TextField>
  );
}

export function CheckField({
  children,
  errorMessage,
  ...props
}: AriaCheckboxProps & { children: ReactNode; errorMessage?: string }) {
  return (
    <div className="grid gap-1.5">
      <AriaCheckbox
        {...props}
        isInvalid={Boolean(errorMessage)}
        className="group flex cursor-pointer items-start gap-3 text-sm leading-6 text-black/70 outline-none"
      >
        {({ isSelected }) => (
          <>
            <span
              aria-hidden="true"
              className={cx(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition",
                "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[#2457ff] group-data-[focus-visible]:ring-offset-2",
                errorMessage ? "border-red-600" : "border-black/25",
                isSelected && "border-[#2457ff] bg-[#2457ff] text-white",
              )}
            >
              {isSelected ? "✓" : ""}
            </span>
            <span>{children}</span>
          </>
        )}
      </AriaCheckbox>
      {errorMessage ? (
        <p className="pl-8 text-xs font-medium text-red-700">{errorMessage}</p>
      ) : null}
    </div>
  );
}

export function RadioCards({
  label,
  options,
  ...props
}: Omit<RadioGroupProps, "children"> & {
  label: string;
  options: readonly string[];
}) {
  return (
    <RadioGroup {...props} className="grid gap-3">
      <Label className="text-sm font-semibold text-[#171717]">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <Radio
            key={option}
            value={option}
            className="group flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-black/12 bg-white px-3 text-sm text-black/70 outline-none transition data-[selected]:border-[#2457ff] data-[selected]:bg-[#eef2ff] data-[selected]:font-semibold data-[selected]:text-[#173cbb] data-[hovered]:border-black/30 data-[focus-visible]:ring-2 data-[focus-visible]:ring-[#2457ff] data-[focus-visible]:ring-offset-1"
          >
            <span className="size-2 rounded-full bg-black/15 group-data-[selected]:bg-[#2457ff]" />
            {option}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}

export function SelectField<T extends object>({
  label,
  description,
  options,
  ...props
}: Omit<SelectProps<T>, "children"> & {
  label: string;
  description?: string;
  options: readonly string[];
}) {
  return (
    <Select {...props} className="group grid min-w-0 gap-2">
      <SelectLabel className="text-sm font-semibold text-[#171717]">
        {label}
      </SelectLabel>
      <SelectButton className="flex h-13 min-w-0 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-black/15 bg-white px-4 text-left text-sm text-[#171717] outline-none transition data-[focus-visible]:border-[#2457ff] data-[focus-visible]:ring-3 data-[focus-visible]:ring-[#2457ff]/12 data-[pressed]:border-[#2457ff]">
        <SelectValue className="min-w-0 flex-1 truncate data-[placeholder]:text-black/60" />
        <span aria-hidden="true" className="grid size-4 shrink-0 place-items-center text-black/60">
          <span className="-mt-0.5 size-2 rotate-45 border-b-2 border-r-2 border-current" />
        </span>
      </SelectButton>
      {description ? (
        <SelectText slot="description" className="text-xs text-black/65">
          {description}
        </SelectText>
      ) : null}
      <SelectFieldError className="text-xs font-medium text-red-700" />
      <Popover className="w-(--trigger-width) rounded-2xl border border-black/10 bg-white p-1 shadow-[0_18px_50px_rgba(17,17,17,.18)] outline-none">
        <ListBox className="max-h-64 overflow-auto outline-none">
          {options.map((option) => (
            <ListBoxItem
              id={option}
              key={option}
              textValue={option}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-black/70 outline-none data-[focused]:bg-[#eef2ff] data-[selected]:bg-[#2457ff] data-[selected]:font-semibold data-[selected]:text-white"
            >
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

export function DialogSheet({
  title,
  description,
  children,
  isOpen,
  onOpenChange,
}: Pick<ModalOverlayProps, "isOpen" | "onOpenChange"> & {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#111]/55 p-0 backdrop-blur-sm data-[entering]:animate-[fade-in_.18s_ease-out] data-[exiting]:animate-[fade-out_.14s_ease-in] sm:items-center sm:p-5"
    >
      <Modal className="max-h-[94dvh] w-full overflow-hidden rounded-t-[2rem] bg-[#f8f5ed] outline-none shadow-[0_30px_100px_rgba(0,0,0,.3)] data-[entering]:animate-[sheet-in_.24s_ease-out] data-[exiting]:animate-[sheet-out_.18s_ease-in] sm:max-w-2xl sm:rounded-[2rem]">
        <Dialog className="grid max-h-[94dvh] grid-rows-[auto_1fr] outline-none">
          {({ close }) => (
            <>
              <div className="flex items-start justify-between gap-5 border-b border-black/10 px-5 py-5 sm:px-7">
                <div>
                  <Heading slot="title" className="text-xl font-semibold tracking-tight text-[#171717] sm:text-2xl">
                    {title}
                  </Heading>
                  <p className="mt-1 max-w-lg text-sm leading-6 text-black/65">
                    {description}
                  </p>
                </div>
                <Button variant="quiet" aria-label="Close survey" onPress={close} className="min-h-10 px-3 text-lg">
                  ×
                </Button>
              </div>
              <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-7">
                {children}
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
