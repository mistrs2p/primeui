import { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import React from "react";

export interface MultipleSelectProps {
  options?: any;
  defaultValue?: any[];
  optionLabel?: string;
  placeHolder?: string;
  optionValue?: string;
  onChange?: (e: any) => void;
}

const MultipleSelect = ({
  options,
  defaultValue,
  optionLabel = "name",
  optionValue,
  placeHolder = "Select your Items",
  onChange,
}: MultipleSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<any>(null);
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedItems(defaultValue);
      onChange && onChange(defaultValue);
    }
  }, []);
  const handleChange = (e: any) => {
    setSelectedItems(e.value);
    onChange && onChange(e.value);
  };

  return (
    <FloatLabel>
      <MultiSelect
        value={selectedItems}
        onChange={handleChange}
        options={options}
        optionLabel={optionLabel}
        // optionValue={optionValue}
        maxSelectedLabels={3}
        className="w-full"
      />
      <label htmlFor={`${placeHolder}id`}>{placeHolder}</label>
    </FloatLabel>
  );
};

export default MultipleSelect;
