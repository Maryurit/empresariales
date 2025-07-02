import { adaptItem } from '../utils/movies.util';

export const getItems = async (resource = import.meta.env.VITE_RESOURCE) => {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}/${resource}`;

    const headers = { 'Content-Type': 'application/json' };
    if (import.meta.env.VITE_API_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
    }

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Error en la solicitud');

    const data = await response.json();

    // Si es PokéAPI, necesitas fetch individuales por cada item
    if (baseUrl.includes('pokeapi')) {
      const results = data.results || [];
      const detailedItems = await Promise.all(
        results.map(async (item) => {
          const res = await fetch(item.url);
          const fullData = await res.json();
          return adaptItem(fullData, baseUrl);
        })
      );
      return detailedItems;
    }

    // Para Rick and Morty o TMDB, sí vienen completos
    const items = (data.results || data.data || data || []);
    return items.map((item) => adaptItem(item, baseUrl));

  } catch (error) {
    console.error('Error en fetch:', error);
    return [];
  }
};
