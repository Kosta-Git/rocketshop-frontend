import { PageContent } from '@rocketshop-monorepo/ui';
import OrdersTable from '../components/orders/orders-table';
import { useOrdersQuery } from '../features/api/api-slice';
import { emptyPage } from '../models/abstractions/page';
import { Order } from '../models/queries/order';

const Orders = () => {
  const { data = emptyPage<Order>() } = useOrdersQuery({
    pageNumber: 0,
    pageSize: 100,
  });

  return (
    <PageContent title={'Orders'}>
      <OrdersTable />
    </PageContent>
  );
};

export default Orders;
