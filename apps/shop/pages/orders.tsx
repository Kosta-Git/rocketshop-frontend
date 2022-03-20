import { PageContent } from '@rocketshop-monorepo/ui';
import CreateOrderForm from '../components/orders/create-order';
import OrdersTable from '../components/orders/orders-table';

const Orders = () => {
  return (
    <PageContent title={'Orders'}>
      <OrdersTable />
      <CreateOrderForm/>
    </PageContent>
  );
};

export default Orders;
