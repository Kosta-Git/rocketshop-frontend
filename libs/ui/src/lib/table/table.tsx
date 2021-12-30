import { Column, usePagination, useSortBy, useTable } from "react-table";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { useEffect } from "react";
import { TableControls } from './table-controls';

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  loading: boolean;
  fetchData: (page: number, size: number) => void;
  pageCount: number;
  totalRows: number;
}

export function Table<T extends object>(props: TableProps<T>) {
  const {
    data,
    columns,
    className = "",
    loading,
    fetchData,
    pageCount,
    totalRows,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: pageCount,
    } as any,
    useSortBy,
    usePagination
  ) as any;

  useEffect(() => {
    fetchData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <table className={`table ${className}`.trim()} {...getTableProps()}>
      <thead className="table-head">
        {headerGroups.map((headerGroup: any) => (
          <tr className="table-row" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                className="table-head-cell"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <span>
                  {column.render("Header")}
                  {column.isSorted &&
                    (column.isSortedDesc ? (
                      <RiSortDesc className="inline ml-2 w-4 h-4" />
                    ) : (
                      <RiSortAsc className="inline ml-2 w-4 h-4" />
                    ))}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="table-body" {...getTableBodyProps()}>
        {page.map((row: any) => {
          prepareRow(row);

          return (
            <tr className="table-row" {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <td className="table-cell" {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
        <tr className="table-row">
          {loading && (
            <td className="table-cell" colSpan={500}>
              Loading...
            </td>
          )}

          {!loading && (
            <td className="table-controls" colSpan={500}>
              <div className="flex flex-wrap justify-between">
                <div>
                  Showing {page.length} of {totalRows} results
                </div>
                <div>
                  <TableControls
                    gotoPage={gotoPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    pageCount={pageCount}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                  />
                </div>
              </div>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
}
