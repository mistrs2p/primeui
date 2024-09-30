import { useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import Dialog from "../Dialog";
import LocalDataTable from "../LocalDataTable";
import { DataTableSelectionSingleChangeEvent } from "primereact/datatable";
import React from "react";

export interface SelectOptionProps {
  isSingleSelect?: boolean;
  isDialogTable?: boolean;
  options?: any[];
  label?: string;
  defaultValue?: any;
  onSelectOption?: (e: any) => void;
  optionLabel?: string;
  dataTableSearchHidden?: boolean;
  dialogHeader?: string;
}

const SelectOption = ({
  isSingleSelect = false,
  isDialogTable = false,
  options = [],
  label,
  defaultValue,
  optionLabel = "name",
  onSelectOption: handleSelectOptionChange,
  dataTableSearchHidden,
  dialogHeader,
}: SelectOptionProps) => {
  const [selection, setSelection] = useState<any | null>(null);
  const [tempSelection, setTempSelection] = useState<any | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      handlePassToParent(defaultValue);
    }
  }, []);
  const handleChange = (e: DropdownChangeEvent | MultiSelectChangeEvent) => {
    handlePassToParent(e.value);
  };

  const handleDialogBtnClick = () => {
    setIsDialogVisible(true);
  };

  const handleDialogHide = () => {
    setIsDialogVisible(false);
  };

  const handleSelection = (e: DataTableSelectionSingleChangeEvent<any>) => {
    setTempSelection(e.value);
  };

  const handleRowDoubleClick = (
    e: DataTableSelectionSingleChangeEvent<any>,
  ) => {
    handlePassToParent(e.data);
    setIsDialogVisible(false);
  };

  const handleCloseDialog = () => {
    handlePassToParent(tempSelection);
    setTempSelection(null);
  };

  const handlePassToParent = (data: any) => {
    setSelection(data);
    handleSelectOptionChange && handleSelectOptionChange(data);
  };

  return (
    <div className="flex items-center gap-2">
      {isSingleSelect ? (
        <div className="flex-grow">
          <FloatLabel>
            <Dropdown
              showClear
              value={selection}
              onChange={handleChange}
              options={options}
              optionLabel={optionLabel}
              className="w-full"
              inputId="singleSelect"
            />
            <label htmlFor="singleSelect">{label}</label>{" "}
          </FloatLabel>
        </div>
      ) : (
        <div className="flex-grow">
          <FloatLabel>
            <MultiSelect
              value={selection}
              onChange={handleChange}
              options={options}
              optionLabel={optionLabel}
              maxSelectedLabels={5}
              showClear
              className="w-full"
              inputId="multiSelect"
            />
            <label htmlFor="multiSelect">{label}</label>{" "}
          </FloatLabel>
        </div>
      )}
      {isDialogTable && (
        <>
          <Button
            onClick={handleDialogBtnClick}
            aria-label="Options"
            className="rounded-full p-2 bg-[#ef4444]"
          >
            <i className="pi pi-ellipsis-h"></i>
          </Button>
          <Dialog
            visible={isDialogVisible}
            onHide={handleDialogHide}
            onAccept={handleCloseDialog}
            acceptLabel="Select"
            rejectLabel="Cancel"
            header={dialogHeader}
          >
            <LocalDataTable
              data={options ?? []}
              onSelection={handleSelection}
              onDoubleClick={handleRowDoubleClick}
              selectedRows={selection}
              isSingleSelect={isSingleSelect}
              searchBoxHidden={dataTableSearchHidden}
            />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default SelectOption;
