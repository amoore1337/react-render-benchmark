import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import React from "react";

interface Props extends Dialog.DialogContentProps {
  disableOutsideClick?: boolean;
  disableEscClose?: boolean;
}

export const ModalContent = React.forwardRef<HTMLDivElement, Props>(
  (
    { children, disableEscClose, disableOutsideClick = true, ...props },
    forwardedRef
  ) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-[fadeInContent_300ms_cubic-bezier(0.16,1,0.3,1)] bg-gray-800/30" />
        <Dialog.Content
          {...props}
          onPointerDownOutside={(event) => {
            if (disableOutsideClick) {
              event.preventDefault();
            }
          }}
          onEscapeKeyDown={(event) => {
            if (disableEscClose) {
              event.preventDefault();
            }
          }}
          className={clsx(
            props.className,
            "overflow-auto rounded border-2 border-solid border-gray-800",
            "fixed left-1/2 top-1/2 max-h-[90vh] min-w-[300px] -translate-x-1/2 -translate-y-1/2 bg-white md:max-w-[90vw]",
            "animate-[modalSlideContentIn_300ms_cubic-bezier(0.16,1,0.3,1)]"
          )}
          ref={forwardedRef}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);

ModalContent.displayName = "ModalContent";

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;
export { default as ModalHeader } from "./ModalHeader";
