import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import { Flow, Methods, Messages } from '../core/nodes';
import { handleFlowError } from '../core/errors';
import ory from '../core/ory-sdk';
import { Card } from '@rocketshop-monorepo/ui';

interface Props {
  flow?: SelfServiceSettingsFlow;
  only?: Methods;
}

function SettingsCard({
  flow,
  only,
  children,
}: Props & { children: ReactNode }) {
  if (!flow) {
    return null;
  }

  const nodes = only
    ? flow.ui.nodes.filter(({ group }) => group === only)
    : flow.ui.nodes;

  if (nodes.length === 0) {
    return null;
  }

  return <Card className="m-4 p-4">{children}</Card>;
}

const Settings: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, 'settings', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'settings', setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceSettingsFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/settings?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceSettingsFlow(String(flow?.id), undefined, values)
          .then(({ data }) => {
            // The settings have been saved and the flow was updated. Let's show it to the user!
            setFlow(data);
          })
          .catch(handleFlowError(router, 'settings', setFlow))
          .catch(async (err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );

  return (
    <>
      <Head>
        <title>
          Profile Management and Security Settings - Ory NextJS Integration
          Example
        </title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Profile & Security Settings
          </h2>

          <SettingsCard only="profile" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Profile Settings
            </h3>
            <Messages messages={flow?.ui.messages} />
            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="profile"
              flow={flow}
            />
          </SettingsCard>
          <SettingsCard only="password" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Change Password
            </h3>

            <Messages messages={flow?.ui.messages} />
            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="password"
              flow={flow}
            />
          </SettingsCard>
          <SettingsCard only="oidc" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Manage Social Sign In
            </h3>

            <Messages messages={flow?.ui.messages} />
            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="oidc"
              flow={flow}
            />
          </SettingsCard>
          <SettingsCard only="lookup_secret" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Manage 2FA Backup Recovery Codes
            </h3>
            <Messages messages={flow?.ui.messages} />
            <p>
              Recovery codes can be used in panic situations where you have lost
              access to your 2FA device.
            </p>

            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="lookup_secret"
              flow={flow}
            />
          </SettingsCard>
          <SettingsCard only="totp" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Manage 2FA TOTP Authenticator App
            </h3>
            <p className='mb-4'>
              Add a TOTP Authenticator App to your account to improve your
              account security. Popular Authenticator Apps are{' '}
              <a
                className="text-gray-600 underline"
                href="https://www.lastpass.com"
                rel="noreferrer"
                target="_blank"
              >
                LastPass
              </a>{' '}
              and Google Authenticator (
              <a
                className="text-gray-600 underline"
                href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                target="_blank"
                rel="noreferrer"
              >
                iOS
              </a>
              ,{' '}
              <a
                className="text-gray-600 underline"
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
                target="_blank"
                rel="noreferrer"
              >
                Android
              </a>
              ).
            </p>
            <Messages messages={flow?.ui.messages} />
            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="totp"
              flow={flow}
            />
          </SettingsCard>
          <SettingsCard only="webauthn" flow={flow}>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Manage Hardware Tokens and Biometrics
            </h3>
            <Messages messages={flow?.ui.messages} />
            <p>
              Use Hardware Tokens (e.g. YubiKey) or Biometrics (e.g. FaceID,
              TouchID) to enhance your account security.
            </p>
            <Flow
              hideGlobalMessages
              onSubmit={onSubmit}
              only="webauthn"
              flow={flow}
            />
          </SettingsCard>
          <Card className="m-4 p-4">
            <Link href="/" passHref>
              <a className="text-gray-600 underline">Go back</a>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
