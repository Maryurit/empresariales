// src/services/movies.service.js

export const getItems = async (resource = import.meta.env.VITE_RESOURCE) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/${resource}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (import.meta.env.VITE_API_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) throw new Error('Error en la solicitud');

    const data = await response.json();

    // Las APIs varían: adaptamos según el tipo
    return data.results || data.data || data || [];
  } catch (error) {
    console.error('Error en fetch:', error);
    return [];
  }
};
