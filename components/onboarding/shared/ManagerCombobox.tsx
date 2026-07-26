"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { Manager } from "@/lib/mockData";

type ManagerComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  managers: Manager[];
  disabled?: boolean;
  placeholder?: string;
};

const ManagerCombobox = <T extends FieldValues>({
  control,
  name,
  label,
  managers,
  disabled = false,
  placeholder = "Select manager",
}: ManagerComboboxProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = managers.find((m) => m.id === field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                id={field.name}
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-invalid={fieldState.invalid}
                disabled={disabled}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "w-full justify-between font-normal",
                )}
              >
                {selected
                  ? selected.name
                  : disabled
                    ? "Select a department first"
                    : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search manager..." />
                  <CommandList>
                    <CommandEmpty>No manager found.</CommandEmpty>
                    <CommandGroup>
                      {managers.map((manager) => (
                        <CommandItem
                          key={manager.id}
                          value={manager.name}
                          onSelect={() => {
                            field.onChange(manager.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === manager.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {manager.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default ManagerCombobox;
