"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  behavioralRoles,
  behavioralFocus,
  technicalRoles,
  experienceLevels,
} from "./roles";
import { Controller } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dropdown({
  type,
  label,
  name,
  control,
  setOpen,
  setSelected,
  open,
}) {
  const openRoles = type === "behavioral" ? behavioralRoles : type === "experience" ? experienceLevels : type === "focus" ? behavioralFocus : technicalRoles;
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef.current]);

  const getButtonText = (value) => {
    if (value) {
      return value;
    }
    else{

      return `Select ${label}`;
    }

  }

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-between border-gray-300 shadow-sm"
                  variant="outline"
                  ref={buttonRef}
                >
                  {getButtonText(field.value)}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" style={{width: buttonWidth}}>
                <Command>
                  <CommandInput placeholder={`Select ${label}`} />
                  <CommandGroup>
                    {openRoles.map((role) => (
                      <CommandItem
                        key={role}
                        value={role}
                        onSelect={(selectedRole) => {
                          field.onChange(
                            selectedRole === field.value ? "" : selectedRole
                          );
                          setOpen(false);
                          setSelected(selectedRole);
                        }}
                      >
                        <CheckIcon
                          className={`${
                            field.value === role ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {role}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      />
    </div>
  );
}
