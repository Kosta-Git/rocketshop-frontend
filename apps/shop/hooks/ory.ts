import { Configuration, Session, V0alpha2Api } from '@ory/client';
import { edgeConfig } from '@ory/integrations/next';
import { useRouter } from 'next/router';
import { DependencyList, useEffect, useState } from 'react';

export type OrySession = { session: Session, logoutUrl: string, error: any };

const ory = new V0alpha2Api(new Configuration(edgeConfig));

export function useSession(returnTo?: string, deps?: DependencyList): OrySession {
  const router = useRouter();
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (session || error) return;

    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
        setError(undefined)
        ory.createSelfServiceLogoutFlowUrlForBrowsers().then(({ data }) => {
          setLogoutUrl(data.logout_url);
        });
      })
      .catch((err) => {
        // Redirect to login page
        setError(err)
        return router.push(edgeConfig.basePath + `/ui/login${returnTo ? '?return_to=' + returnTo : ''}`);
      });
  });

  return {
    session,
    logoutUrl,
    error
  };
}
