import * as Yup from 'yup';
import { useFormik, validateYupSchema } from 'formik';
import {
  useCoinsQuery,
  useOrderCreateMutation,
} from '../../features/api/api-slice';
import { Alert, Button, ComboBox, InputField } from '@rocketshop-monorepo/ui';
import Network from '../../models/queries/network';
import Coin from '../../models/queries/coin';
import { useState } from 'react';
import ValidationRulesTable from '../validation-rules/validation-rule-table';

interface OrderForm {
  userGuid: string;
  walletAddress: string;
  walletAddressTag?: string;
  network: Network;
  amount: number;
  coin: Coin;
}

const CreateValidationSchema = (network?: Network) => {
  const walletAddress =
    (network?.addressRegex ?? '') !== ''
      ? Yup.string()
          .matches(new RegExp(network.addressRegex))
          .required('Required!')
      : Yup.string().required('Required!');

  const addressTag =
    (network?.memoRegex ?? '') !== ''
      ? Yup.string()
          .matches(new RegExp(network.memoRegex))
          .required('Required!')
      : Yup.string();

  const amount = network
    ? Yup.number().min(network.withdrawMin).max(network.withdrawMax)
    : Yup.number();

  return Yup.object().shape({
    userGuid: Yup.string()
      .uuid('User ID has to be a valid UUIDv4')
      .required('Required!'),
    walletAddress,
    walletAddressTag: addressTag,
    amount,
  });
};

const CreateOrderForm = () => {
  const [createOrder] = useOrderCreateMutation();
  const { data: coinData, isLoading } = useCoinsQuery();
  const [status, setStatus] = useState<{title: string, type: 'error' | 'warning' | 'success' | 'info', content: string} | undefined>();
  const [network, setNetwork] = useState<Network | undefined>();

  const formik = useFormik({
    initialValues: {
      userGuid: '4962b6ba-700c-4a25-b3a2-c4b2d65a33c8',
    } as OrderForm,
    validationSchema: CreateValidationSchema(network),
    onSubmit: async (values) => {
      const response = await createOrder({
        userGuid: values.userGuid,
        walletAddress: values.walletAddress,
        walletAddressTag: values.walletAddressTag,
        network: values.network.network,
        amount: values.amount,
        coin: values.coin.asset,
      });

      if(response['error']) setStatus({ content: response['error']['data'], type: 'error', title: "Unable to process order" })
      else setStatus({ content: "Order is being processed", type: 'success', title: "Success" })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {coinData && (
        <>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            state={
              formik.touched.userGuid && Boolean(formik.errors.userGuid)
                ? 'error'
                : 'success'
            }
            helpers={formik.touched.userGuid && [formik.errors.userGuid]}
            value={formik.values.userGuid}
            name={'userGuid'}
            label="User ID"
          />

          <ComboBox
            label={'Coin'}
            name={'coin'}
            query={coinData}
            onSelected={(c) => {
              formik.setFieldValue('coin', c);
              formik.setFieldValue('network', undefined);
            }}
            keyExtractor={(coin) => coin.asset}
            nameExtractor={(coin) => coin.name}
          />

          {formik.values.coin && (
            <ComboBox
              label={'Network'}
              name={'network'}
              onSelected={(n) => {
                setNetwork(n);
                formik.setFieldValue('network', n);
              }}
              query={formik.values.coin.networkList.filter(
                (n) => n.withdrawEnabled
              )}
              keyExtractor={(net) => net.network}
              nameExtractor={(net) =>
                `${net.name} - Fee ~${net.withdrawFee} ${formik.values.coin.asset}`
              }
            />
          )}

          {formik.values.network && (
            <>
              <InputField
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                state={
                  formik.touched.walletAddress &&
                  Boolean(formik.errors.walletAddress)
                    ? 'error'
                    : 'success'
                }
                helpers={
                  formik.touched.walletAddress && [formik.errors.walletAddress]
                }
                value={formik.values.walletAddress}
                name={'walletAddress'}
                label="Address"
              />
              {formik.values?.network?.memoRegex !== '' && (
                <InputField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  state={
                    formik.touched.walletAddressTag &&
                    Boolean(formik.errors.walletAddressTag)
                      ? 'error'
                      : 'success'
                  }
                  helpers={
                    formik.touched.walletAddressTag && [
                      formik.errors.walletAddressTag,
                    ]
                  }
                  value={formik.values.walletAddressTag}
                  name={'walletAddressTag'}
                  label="Address MEMO"
                  required={formik.values?.network?.memoRegex !== '' ?? false}
                />
              )}
              <InputField
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                state={
                  formik.touched.amount && Boolean(formik.errors.amount)
                    ? 'error'
                    : 'success'
                }
                helpers={formik.touched.amount && [formik.errors.amount]}
                value={formik.values.amount}
                name={'amount'}
                label="Amount"
              />
            </>
          )}
          {
            status &&
            <Alert title={status.title} content={status.content} status={status.type}/>
          }
          <Button
            className="mt-2 w-full"
            disabled={!formik.isValid || formik.isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </>
      )}
    </form>
  );
};

export default CreateOrderForm;
