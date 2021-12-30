import { SelfServiceError } from '@ory/kratos-client';
import { Card } from '@rocketshop-monorepo/ui';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ory from '../core/ory-sdk';

const Login: NextPage = () => {
  const [error, setError] = useState<SelfServiceError | string>();

  // Get ?id=... from the URL
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have an error, do nothing.
    if (!router.isReady || error) {
      return;
    }

    ory
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          // The error id could not be found. Let's just redirect home!
            return router.push('/');
          case 403:
          // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
            return router.push('/');
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push('/');
        }

        return Promise.reject(err);
      });
  }, [id, router, router.isReady, error]);

  if (!error) {
    return null;
  }

  return (
    <>
      <Card>
        An error occurred
        {JSON.stringify(error, null, 2)}
      </Card>
      <Card>
        <Link href="/" passHref>
          Go back
        </Link>
      </Card>
    </>
  );
};

export default Login;
