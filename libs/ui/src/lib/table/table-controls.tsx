import React from "react";
import { Button } from "../button/button";
import { SelectInput } from "../forms/select-input";

interface TableControlProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  setPageSize: (size: number) => void;
  pageSize: number;
  pageIndex: number;
}

export const TableControls = (props: TableControlProps) => {
  const {
    gotoPage,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
    pageSize,
    pageIndex,
  } = props;

  return (
    <>
      <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
        {"<<"}
      </Button>
      <Button
        disabled={!canPreviousPage}
        onClick={previousPage}
        className="mx-2"
      >
        {"<"}
      </Button>
      <p className="inline">
        {pageIndex + 1}/{pageCount}
      </p>
      <Button disabled={!canNextPage} onClick={nextPage} className="mx-2">
        {">"}
      </Button>
      <Button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
        {">>"}
      </Button>
      <SelectInput
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="ml-2"
      >
        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </SelectInput>
    </>
  );
};
