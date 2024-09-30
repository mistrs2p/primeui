import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

interface NInputTextareaProps {
  defaultValue?: string;
  label?: string;
  onChange?: (e: any) => void;
  maxLength?: number;
  autoResize?: boolean;
}

const NInputTextarea = ({
  defaultValue,
  onChange,
  label = "Label",
  maxLength = 10000000000000,
  autoResize = false,
}: NInputTextareaProps) => {
  const [localValue, setLocalValue] = useState<string>("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    // console.log(e);

    onChange && onChange(e.target.value);
  };

  return (
    <div>
      <FloatLabel>
        <InputTextarea
          maxLength={maxLength}
          className={`w-full ${autoResize ? "h-10" : ""}`}
          value={defaultValue}
          onChange={handleChangeValue}
          id={label}
          rows={5}
          autoResize={autoResize}
        ></InputTextarea>
        <label htmlFor={label}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default NInputTextarea;
