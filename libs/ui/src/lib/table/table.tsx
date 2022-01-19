import { Column, usePagination, useSortBy, useTable } from 'react-table';
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';
import { useEffect } from 'react';
import { TableControls } from './table-controls';
import classNames from 'classnames';

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
    className = '',
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

  const tableClass = classNames(
    'bg-white border-collapse border-0 table-auto'.split(' '),
    className.split(' ')
  );

  const tableHeadClass = classNames('bg-gray-50');

  const tableHeadCellClass = classNames(
    'px-6 py-2 text-xs text-gray-500 border'.split(' ')
  );

  const tableCellClass = classNames(
    'px-6 py-4 text-sm text-gray-500 border'.split(' ')
  );

  const tableBodyClass = classNames(
    'bg-white divide-y divide-gray-300'.split(' ')
  );

  const tableRowClass = classNames();

  const tableControlsClass = classNames(
    'px-6 py-4 text-gray-500 border'.split(' ')
  );

  useEffect(() => {
    fetchData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <table className={tableClass} {...getTableProps()}>
      <thead className={tableHeadClass}>
        {headerGroups.map((headerGroup: any) => (
          <tr className={tableRowClass} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                className={tableHeadCellClass}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <span>
                  {column.render('Header')}
                  {column.isSorted &&
                    (column.isSortedDesc ? (
                      <SortDescendingIcon className="inline ml-2 w-4 h-4" />
                    ) : (
                      <SortAscendingIcon className="inline ml-2 w-4 h-4" />
                    ))}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={tableBodyClass} {...getTableBodyProps()}>
        {page.map((row: any) => {
          prepareRow(row);

          return (
            <tr className={tableRowClass} {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <td className={tableCellClass} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
        <tr className={tableRowClass}>
          {loading && (
            <td className={tableCellClass} colSpan={500}>
              Loading...
            </td>
          )}

          {!loading && (
            <td className={tableControlsClass} colSpan={500}>
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
