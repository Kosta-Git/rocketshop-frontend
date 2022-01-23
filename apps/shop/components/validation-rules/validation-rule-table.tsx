import { useEffect, useMemo, useState } from 'react';
import {
  ValidationRule,
  ValidationRuleQuery,
} from '../../models/queries/validation-rule';
import { Column } from 'react-table';
import { useValidationRulesQuery } from '../../features/api/api-slice';
import { emptyPage } from '../../models/abstractions/page';
import { Table } from '@rocketshop-monorepo/ui';

const ValidationRulesTable = () => {
  const [query, setQuery] = useState<ValidationRuleQuery>({
    pageNumber: 1,
    pageSize: 10,
  });
  const { data = emptyPage<ValidationRule>(), isLoading } =
    useValidationRulesQuery(query);

  const columns = useMemo<Column<ValidationRule>[]>(
    () => [
      {
        Header: 'Start',
        accessor: 'start',
      },
      {
        Header: 'End',
        accessor: 'end',
      },
      {
        Header: 'Confirms.',
        accessor: 'confirmations',
      },
      {
        Header: 'Enabled',
        accessor: (r) => (r.enabled ? '✔️' : '❌'),
      },
    ],
    []
  );

  return (
    <Table
      data={data.data}
      pageCount={data.totalPages}
      totalRows={data.totalValues}
      loading={isLoading}
      columns={columns}
      className="w-full"
      fetchData={(page: number, size: number) =>
        setQuery({ pageNumber: page, pageSize: size })
      }
    />
  );
};

export default ValidationRulesTable;
