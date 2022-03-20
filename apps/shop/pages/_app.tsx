import { Sidebar, SidebarLink } from '@rocketshop-monorepo/ui';
import { AppProps } from 'next/app';
import {
  HomeIcon,
  KeyIcon,
  ReceiptTaxIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from './../redux/store';
import './../styles/styles.css';
import { useSession } from '../hooks/ory';

function CustomApp({Component, pageProps}: AppProps) {
  const { session, logoutUrl } = useSession(process.env.NEXT_PUBLIC_HOST);

  if (!session) return <></>;

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <Sidebar
        links={[
          <SidebarLink key={0} link={'/'} icon={HomeIcon} text={'Dashboard'} />,
          <SidebarLink key={1} link={'/admin'} icon={KeyIcon} text={'Admin'} />,
          <SidebarLink
            key={2}
            link={'/orders'}
            icon={ReceiptTaxIcon}
            text={'Orders'}
          />,
          <SidebarLink
            key={3}
            link={'/settings'}
            icon={CogIcon}
            text={'Settings'}
          />,
          <SidebarLink
            key={5}
            link={logoutUrl ?? ''}
            icon={LogoutIcon}
            text={'Logout'}
          />,
        ]}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Sidebar>
    </>
  );
}

export default CustomApp;
