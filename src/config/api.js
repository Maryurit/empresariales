// src/config/api.js
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_HEADERS = API_TOKEN
  ? {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    }
  : {
      'Content-Type': 'application/json',
    };
