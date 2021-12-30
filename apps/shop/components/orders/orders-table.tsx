import { Table } from "@rocketshop-monorepo/ui";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { useOrdersQuery } from "../../features/api/api-slice";
import { emptyPage } from "../../models/abstractions/page";
import { Order, OrderQuery } from "../../models/queries/order";

const OrdersTable = () => {
  const [query, setQuery] = useState<OrderQuery>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data = emptyPage<Order>(), isLoading } = useOrdersQuery(query);

  const columns = useMemo<Column<Order>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "User",
        accessor: "userGuid",
      },
      {
        Header: "Address",
        accessor: "walletAddress",
      },
      {
        Header: "Network",
        accessor: "network",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Coin",
        accessor: (r) => r.coin.name,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Confirms.",
        accessor: (r) => `0/${r.validationRule.confirmations}`,
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

export default OrdersTable;
