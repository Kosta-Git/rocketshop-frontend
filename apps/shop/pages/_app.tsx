import { Sidebar, SidebarLink } from '@rocketshop-monorepo/ui';
import { AppProps } from 'next/app';
import {
  RiCouponFill,
  RiDashboardFill,
  RiAdminFill,
  RiSettings2Fill,
} from 'react-icons/ri';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from './../redux/store';
import './../styles/styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RocketShop</title>
      </Head>
      <main id="app" className="app md:flex min-h-screen relative">
        <Sidebar>
          <SidebarLink link={'/'} icon={RiDashboardFill} text={'Dashboard'} />
          <SidebarLink link={'/admin'} icon={RiAdminFill} text={'Admin'} />
          <SidebarLink link={'/orders'} icon={RiCouponFill} text={'Orders'} />
          <SidebarLink
            link={'/settings'}
            icon={RiSettings2Fill}
            text={'Settings'}
          />
        </Sidebar>
        <div className="flex-1">
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </div>
      </main>
    </>
  );
}

export default CustomApp;
