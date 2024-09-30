import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React from "react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

export interface InputTextProps {
  label?: string;
  defaultValue?: string;
  type?: string;
  onChange?: (e: string) => void;
}

const NInputText = ({
  label = "Label",
  defaultValue,
  type = "text",
  onChange,
}: InputTextProps) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FloatLabel>
      <InputText
        className="w-full"
        type={type}
        accept="Hello"
        id={label}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="username">{label}</label>
    </FloatLabel>
  );
};

export default NInputText;
