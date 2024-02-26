import axios from 'axios';
import { config } from '../config';
import {
  ApiResponse,
  DeleteApiParams,
  GetApiParams,
  PostApiParams,
  PutApiParams,
} from '../types/apiParams';

export const baseURL =
  process.env.NODE_ENV === 'production' ||
  import.meta.env.VITE_PROD_MODE === 'true'
    ? config.backend.baseUrl
    : config.backend.baseUrl;
const apiPath = config.backend.apiPath;

const errHandler = async (promise: Promise<ApiResponse>) => {
  try {
    const { data } = await promise;

    return { data: data, err: null };
  } catch (err) {
    return { data: null, err: err };
  }
};

const customErrHandler = async (promise: Promise<ApiResponse>) => {
  try {
    const { data } = await promise;

    return { data: data, err: null };
  } catch (err) {
    return { data: null, err: err };
  }
};

const api = {
  delete: ({ url, params = {} }: DeleteApiParams) => {
    return errHandler(
      axios.delete(url, {
        params,
      }),
    );
  },

  get: ({ url, params = {}, headers = {} }: GetApiParams) => {
    return errHandler(
      axios.get(url, {
        headers,
        params,
      }),
    );
  },

  init: async () => {
    axios.defaults.baseURL = baseURL + apiPath;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  },

  post: ({ url, data = null, headers = {} }: PostApiParams) => {
    return errHandler(
      axios.post(url, data, {
        headers,
      }),
    );
  },

  postStreamingWithCustomBaseURL: async ({ url, data = null, headers = {}, customBaseURL, onStream }: PostApiParams & { customBaseURL: string }) => {
    const config = {
      baseURL: customBaseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      responseType: 'stream'
    };
    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      response.data.on('data', (chunk) => {
        if(onStream) onStream(chunk);
      });
      return { data: null, err: null };
    } catch (err) {
      return { data: null, err: err };
    }
  },

  postWithCustomBaseURL: ({ url, data = null, headers = {}, customBaseURL }: PostApiParams & { customBaseURL: string }) => {
    const instance = axios.create({
      baseURL: customBaseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return customErrHandler(
      instance.post(url, data)
    );
  },

  put: ({ url, data = null }: PutApiParams) => {
    return errHandler(axios.put(url, data));
  },
};

export default api;
