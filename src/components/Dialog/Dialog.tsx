import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

export interface DialogProps {
  visible?: boolean;
  onHide?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  header?: string;
  maximizable?: boolean;
  children?: React.ReactNode;
}

const Dialog = ({
  visible = false,
  onHide,
  header = "Default Header",
  maximizable = true,
  onAccept,
  onReject,
  acceptLabel,
  rejectLabel,
  children,
}: DialogProps) => {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      message={children}
      header={header}
      maximizable={maximizable}
      accept={onAccept}
      reject={onReject}
      acceptLabel={acceptLabel}
      rejectLabel={rejectLabel}
      style={{ minWidth: "50vw" }}
    />
  );
};

export default Dialog;
