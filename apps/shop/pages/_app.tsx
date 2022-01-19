import { Sidebar, SidebarLink } from '@rocketshop-monorepo/ui';
import { AppProps } from 'next/app';
import {
  HomeIcon,
  KeyIcon,
  ReceiptTaxIcon,
  CogIcon,
} from '@heroicons/react/outline';
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
