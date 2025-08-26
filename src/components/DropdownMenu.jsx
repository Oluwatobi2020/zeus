"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../utils/cn";

function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

function DropdownMenuPortal(props) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger(props) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white text-black shadow-md",
          "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup(props) {
  return <DropdownMenuPrimitive.Group {...props} />;
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-gray-100 focus:bg-gray-100 text-gray-900",
        "data-[inset=true]:pl-8",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[variant=destructive]:text-red-600 data-[variant=destructive]:hover:bg-red-50",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuLabel({ className, inset, ...props }) {
  return (
    <DropdownMenuPrimitive.Label
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium text-gray-500",
        "data-[inset=true]:pl-8",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
};
