import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React from "react";

interface Props {
  title: React.ReactNode;
  className?: string;
}

export default function ModalHeader({ title, className }: Props) {
  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-between bg-gray-800 p-4 text-white"
      )}
    >
      {["string", "number", "boolean"].includes(typeof title) ? (
        <span className="text-lg font-bold">{title}</span>
      ) : (
        title
      )}
      <Dialog.Close asChild>
        <button
          className={clsx(
            "inline-flex h-[25px] w-[25px] items-center justify-center rounded-full text-white",
            "hover:bg-white hover:text-gray-800",
            "focus:bg-white focus:text-gray-800"
          )}
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </div>
  );
}
