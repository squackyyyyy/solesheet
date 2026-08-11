"use client";

import type { ReactNode } from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";
import {
  Button as ComboBoxButton,
  ComboBox,
  FieldError as ComboBoxFieldError,
  Input as ComboBoxInput,
  Label as ComboBoxLabel,
  ListBox as ComboBoxListBox,
  ListBoxItem as ComboBoxListBoxItem,
  Popover as ComboBoxPopover,
} from "react-aria-components/ComboBox";
import {
  Group,
  Input as NumberInput,
  Label as NumberLabel,
  NumberField,
  Text as NumberText,
  type NumberFieldProps,
} from "react-aria-components/NumberField";
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
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabsProps,
} from "react-aria-components/Tabs";

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
            "bg-[var(--brand-action)] text-white shadow-[0_12px_30px_rgba(4,120,87,.24)] data-[hovered]:bg-[var(--brand-action-hover)] data-[pressed]:translate-y-px data-[focus-visible]:ring-[var(--brand-green)]",
          variant === "secondary" &&
            "border border-[#14213d]/15 bg-white text-[var(--brand-ink)] data-[hovered]:border-[var(--brand-action)] data-[hovered]:bg-[var(--brand-mist)] data-[focus-visible]:ring-[var(--brand-green)]",
          variant === "quiet" &&
            "text-[var(--brand-ink)] data-[hovered]:bg-[#14213d]/5 data-[focus-visible]:ring-[var(--brand-green)]",
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
      <Label className="text-sm font-semibold text-[var(--brand-ink)]">{label}</Label>
      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="h-13 w-full rounded-2xl border border-[#14213d]/15 bg-white px-4 text-base text-[var(--brand-ink)] outline-none transition placeholder:text-[#14213d]/55 data-[focused]:border-[var(--brand-action)] data-[focused]:ring-3 data-[focused]:ring-[#22c55e]/18 data-[invalid]:border-red-600"
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
                "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[var(--brand-green)] group-data-[focus-visible]:ring-offset-2",
                errorMessage ? "border-red-600" : "border-black/25",
                isSelected && "border-[var(--brand-action)] bg-[var(--brand-action)] text-white",
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
      <Label className="text-sm font-semibold text-[var(--brand-ink)]">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <Radio
            key={option}
            value={option}
            className="group flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-[#14213d]/12 bg-white px-3 text-sm text-[#14213d]/70 outline-none transition data-[selected]:border-[var(--brand-action)] data-[selected]:bg-[var(--brand-mist)] data-[selected]:font-semibold data-[selected]:text-[var(--brand-action-hover)] data-[hovered]:border-[var(--brand-action)] data-[focus-visible]:ring-2 data-[focus-visible]:ring-[var(--brand-green)] data-[focus-visible]:ring-offset-1"
          >
            <span className="size-2 rounded-full bg-[#14213d]/15 group-data-[selected]:bg-[var(--brand-green)]" />
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
      <SelectLabel className="text-sm font-semibold text-[var(--brand-ink)]">
        {label}
      </SelectLabel>
      <SelectButton className="flex h-13 min-w-0 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-[#14213d]/15 bg-white px-4 text-left text-sm text-[var(--brand-ink)] outline-none transition data-[focus-visible]:border-[var(--brand-action)] data-[focus-visible]:ring-3 data-[focus-visible]:ring-[#22c55e]/18 data-[pressed]:border-[var(--brand-action)]">
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
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-[#14213d]/70 outline-none data-[focused]:bg-[var(--brand-mist)] data-[selected]:bg-[var(--brand-action)] data-[selected]:font-semibold data-[selected]:text-white"
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
      <Modal className="max-h-[94dvh] w-full overflow-hidden rounded-t-[2rem] bg-[var(--brand-soft)] outline-none shadow-[0_30px_100px_rgba(0,0,0,.3)] data-[entering]:animate-[sheet-in_.24s_ease-out] data-[exiting]:animate-[sheet-out_.18s_ease-in] sm:max-w-2xl sm:rounded-[2rem]">
        <Dialog className="grid max-h-[94dvh] grid-rows-[auto_1fr] outline-none">
          {({ close }) => (
            <>
              <div className="flex items-start justify-between gap-5 border-b border-black/10 px-5 py-5 sm:px-7">
                <div>
                  <Heading slot="title" className="text-xl font-semibold tracking-tight text-[var(--brand-ink)] sm:text-2xl">
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

export function AppProofTabs({
  tabs,
  ...props
}: Omit<TabsProps, "children"> & {
  tabs: ReadonlyArray<{ id: string; label: string; content: ReactNode }>;
}) {
  return (
    <Tabs {...props} className="min-w-0">
      <TabList
        aria-label="Choose a workflow to try"
        className="grid grid-cols-2 gap-1 rounded-[1.1rem] bg-stone-200/75 p-1"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            id={tab.id}
            className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[.85rem] px-3 text-center text-xs font-bold text-stone-600 outline-none transition data-[hovered]:text-stone-950 data-[selected]:bg-stone-950 data-[selected]:text-white data-[focus-visible]:ring-2 data-[focus-visible]:ring-emerald-700 data-[focus-visible]:ring-offset-2 sm:text-sm"
          >
            <span aria-hidden="true" className="text-[10px]">
              0{index + 1}
            </span>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel
          key={tab.id}
          id={tab.id}
          className="mt-4 outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-emerald-700 data-[focus-visible]:ring-offset-4"
        >
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}

export function AppComboBoxField({
  label,
  value,
  onChange,
  options,
  errorMessage,
  description,
  isDisabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  errorMessage?: string;
  description?: string;
  isDisabled?: boolean;
}) {
  return (
    <ComboBox
      allowsCustomValue
      inputValue={value}
      onInputChange={onChange}
      onSelectionChange={(key) => {
        if (key != null) onChange(String(key));
      }}
      isInvalid={Boolean(errorMessage)}
      isDisabled={isDisabled}
      className="group grid gap-1.5"
    >
      <ComboBoxLabel className="text-xs font-bold text-stone-700">
        {label}
      </ComboBoxLabel>
      <div className="flex min-h-12 overflow-hidden rounded-xl border border-stone-300 bg-white transition group-data-[focus-within]:border-emerald-700 group-data-[focus-within]:ring-3 group-data-[focus-within]:ring-emerald-700/12 group-data-[invalid]:border-red-700">
        <ComboBoxInput className="min-w-0 flex-1 bg-transparent px-3.5 text-base font-medium text-stone-950 outline-none placeholder:text-stone-400" />
        <ComboBoxButton className="grid min-h-11 w-11 shrink-0 cursor-pointer place-items-center border-l border-stone-200 text-stone-500 outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-emerald-700">
          <span aria-hidden="true" className="-mt-1 size-2 rotate-45 border-b-2 border-r-2 border-current" />
        </ComboBoxButton>
      </div>
      {description ? <p className="text-[11px] leading-4 text-stone-500">{description}</p> : null}
      <ComboBoxFieldError className="text-xs font-semibold text-red-700">
        {errorMessage}
      </ComboBoxFieldError>
      <ComboBoxPopover className="w-(--trigger-width) rounded-xl border border-stone-200 bg-white p-1 shadow-[0_18px_50px_rgba(17,17,17,.18)] outline-none">
        <ComboBoxListBox className="max-h-56 overflow-auto outline-none">
          {options.map((option) => (
            <ComboBoxListBoxItem
              key={option}
              id={option}
              textValue={option}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 outline-none data-[focused]:bg-emerald-50 data-[selected]:bg-emerald-700 data-[selected]:text-white"
            >
              {option}
            </ComboBoxListBoxItem>
          ))}
        </ComboBoxListBox>
      </ComboBoxPopover>
    </ComboBox>
  );
}

export function AppSelectField({
  label,
  options,
  errorMessage,
  ...props
}: Omit<SelectProps<object>, "children"> & {
  label: string;
  options: readonly string[];
  errorMessage?: string;
}) {
  return (
    <Select {...props} isInvalid={Boolean(errorMessage)} className="group grid min-w-0 gap-1.5">
      <SelectLabel className="text-xs font-bold text-stone-700">{label}</SelectLabel>
      <SelectButton className="flex min-h-12 min-w-0 w-full cursor-pointer items-center justify-between overflow-hidden rounded-xl border border-stone-300 bg-white px-3.5 text-left text-base font-medium text-stone-950 outline-none transition data-[focus-visible]:border-emerald-700 data-[focus-visible]:ring-3 data-[focus-visible]:ring-emerald-700/12 data-[pressed]:border-emerald-700 data-[invalid]:border-red-700">
        <SelectValue className="min-w-0 flex-1 truncate data-[placeholder]:text-stone-400" />
        <span aria-hidden="true" className="-mt-1 size-2 shrink-0 rotate-45 border-b-2 border-r-2 border-current text-stone-500" />
      </SelectButton>
      <SelectFieldError className="text-xs font-semibold text-red-700">
        {errorMessage}
      </SelectFieldError>
      <Popover className="w-(--trigger-width) rounded-xl border border-stone-200 bg-white p-1 shadow-[0_18px_50px_rgba(17,17,17,.18)] outline-none">
        <ListBox className="max-h-56 overflow-auto outline-none">
          {options.map((option) => (
            <ListBoxItem
              id={option}
              key={option}
              textValue={option}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 outline-none data-[focused]:bg-emerald-50 data-[selected]:bg-emerald-700 data-[selected]:text-white"
            >
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

export function PesoNumberField({
  label,
  description,
  errorMessage,
  ...props
}: Omit<NumberFieldProps, "children" | "formatOptions"> & {
  label: string;
  description?: string;
  errorMessage?: string;
}) {
  return (
    <NumberField
      {...props}
      formatOptions={{
        style: "currency",
        currency: "PHP",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }}
      isInvalid={Boolean(errorMessage)}
      className="group grid gap-1.5"
    >
      <NumberLabel className="text-xs font-bold text-stone-700">{label}</NumberLabel>
      <Group className="flex min-h-12 overflow-hidden rounded-xl border border-stone-300 bg-white transition group-data-[focus-within]:border-emerald-700 group-data-[focus-within]:ring-3 group-data-[focus-within]:ring-emerald-700/12 group-data-[invalid]:border-red-700">
        <NumberInput className="min-w-0 flex-1 bg-transparent px-3.5 text-base font-semibold tabular-nums text-stone-950 outline-none placeholder:text-stone-400" />
      </Group>
      {description ? (
        <NumberText slot="description" className="text-[11px] leading-4 text-stone-500">
          {description}
        </NumberText>
      ) : null}
      {errorMessage ? <p className="text-xs font-semibold text-red-700">{errorMessage}</p> : null}
    </NumberField>
  );
}
