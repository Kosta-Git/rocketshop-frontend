import { Order, OrderQuery } from "../../models/queries/order";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Page } from "../../models/abstractions/page";
import CreateValidationRule from "../../models/mutations/create-validation-rule";
import CreateOrder from "../../models/mutations/create-order";
import {
  ValidationRule,
  ValidationRuleQuery,
} from "../../models/queries/validation-rule";
import Coin from "../../models/queries/coin";

export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Coin", "Order", "ValidationRule"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ORDERS_API}/api`,
    prepareHeaders: (headers) => {
        return headers;
    },
    credentials: 'include'
  }),
  endpoints(builder) {
    return {
      // Coins
      coins: builder.query<Coin[], void>({
        query: () => ({
          url: "/Coin",
        }),
        providesTags: ["Coin"],
      }),

      // Orders
      orders: builder.query<Page<Order>, OrderQuery>({
        query: (query: OrderQuery) => ({
          url: "/Order",
          params: query,
        }),
        providesTags: (_, __, query) => [{ type: "Order", query }],
      }),
      orderCreate: builder.mutation<
        Order,
        CreateOrder
      >({
        query: (order: CreateOrder) => ({
          url: "/Order",
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["Order"],
      }),

      // Validation rules
      validationRules: builder.query<Page<ValidationRule>, ValidationRuleQuery>(
        {
          query: (query: ValidationRuleQuery) => ({
            url: "/ValidationRule",
            params: query,
          }),
          providesTags: (_, __, query) => [{ type: "ValidationRule", query }],
        }
      ),
      validationRuleCreate: builder.mutation<
        ValidationRule,
        CreateValidationRule
      >({
        query: (rule: CreateValidationRule) => ({
          url: "/ValidationRule",
          method: "POST",
          body: rule,
        }),
        invalidatesTags: ["ValidationRule"],
      }),
    };
  },
});

export const {
  useCoinsQuery,
  useOrdersQuery,
  useOrderCreateMutation,
  useValidationRulesQuery,
  useValidationRuleCreateMutation,
} = apiSlice;
