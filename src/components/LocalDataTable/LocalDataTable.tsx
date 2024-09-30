import { ChangeEvent, useEffect, useState } from "react";
import {
  DataTable,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import React from "react";

export interface LocalTableProps {
  data: any[];
  onSelection?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
  onRowSelection?: (e: any) => void;
  selectedRows?: any;
  isSingleSelect?: boolean;
  searchBoxHidden?: boolean;
  rows?: number;
}

const LocalDataTable = ({
  data,
  onSelection,
  onDoubleClick,
  selectedRows,
  isSingleSelect,
  searchBoxHidden,
  rows = 7,
}: LocalTableProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData] = useState<any[]>(data);
  const [headers, setHeaders] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<any | null>(null);

  useEffect(() => {
    setRowSelection(selectedRows);
    const handleSetHeaders = (data: any[]) => {
      if (data.length > 0) {
        setHeaders(Object.keys(data[0]));
      }
      setLoading(false);
    };
    handleSetHeaders(tableData);
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  const handleRowSelection = (e: DataTableSelectionSingleChangeEvent<any>) => {
    setRowSelection(e.value);
    onSelection && onSelection(e);
  };

  const handleRowDoubleClick = (e: any) => {
    if (isSingleSelect) {
      onDoubleClick && onDoubleClick(e);
      // onSelection && onSelection(e);
    }
  };

  const renderMainHeader = () => (
    <div className="flex justify-start items-center">
      <IconField>
        <InputText
          placeholder="Search"
          value={globalFilter}
          onChange={handleSearch}
        ></InputText>
        <InputIcon className={"pi pi-search"}></InputIcon>
      </IconField>
    </div>
  );

  return (
    <DataTable
      value={tableData}
      size="normal"
      rows={rows}
      loading={loading}
      header={!searchBoxHidden ? renderMainHeader : null}
      globalFilter={globalFilter}
      selectionMode="single"
      selection={rowSelection}
      onSelectionChange={handleRowSelection}
      onRowDoubleClick={handleRowDoubleClick}
      showGridlines
      resizableColumns
      paginator={tableData.length > 25}
      stripedRows
      removableSort
      scrollable
    >
      {!isSingleSelect ? (
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
      ) : null}
      {headers.map((header: any, index: number) => (
        <Column key={index} field={header} header={header} sortable />
      ))}
    </DataTable>
  );
};

export default LocalDataTable;
