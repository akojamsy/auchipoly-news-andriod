import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../utils/BaseUrl";
import { setToken, clearToken } from "../features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().auth.token
    console.log(token, 'api')
    // const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // Handle 403 Forbidden errors
  }

  if (result?.error?.status === 401) {
    // Handle 401 Unauthorized errors
    await AsyncStorage.removeItem('token');
    // api.dispatch(clearToken());
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: "baseApi",
});
