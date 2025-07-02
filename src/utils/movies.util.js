// utils/movies.util.js

export const getImageUrl = (size = 'w342', path) => {
  if (!path) return `https://picsum.photos/${size === 'w342' ? '342/513' : '780/439'}?random`;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Adaptador para TMDB
export const adaptTmdbToMovie = (item) => {
  const {
    id,
    title,
    overview,
    release_date,
    vote_average,
    genre_ids,
    poster_path,
    backdrop_path
  } = item;

  return {
    id,
    title,
    description: overview,
    duration: '120 min',
    releaseDate: release_date,
    rating: Math.round(vote_average) / 2,
    genre: genres[genre_ids?.[0]] || '🎞️',
    poster: getImageUrl('w342', poster_path),
    backdrop: getImageUrl('w1280', backdrop_path),
    showTimes: ['2:30 PM', '5:45 PM', '9:00 PM', '11:30 PM'],
  };
};

// Adaptador para Rick and Morty
export const adaptRickToMovie = (item) => {
  return {
    id: item.id,
    title: item.name,
    description: `Status: ${item.status} - Species: ${item.species}`,
    duration: '20 min',
    releaseDate: '2023',
    rating: 4,
    genre: item.gender || '🧬',
    poster: item.image,
    backdrop: item.image,
    showTimes: ['1:00 PM', '4:00 PM', '8:00 PM'],
  };
};

// Adaptador para PokéAPI
export const adaptPokeToMovie = (item) => {
  const image =
    item.sprites?.other?.['official-artwork']?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` ||
    `https://via.placeholder.com/300x300?text=No+Image`;

  return {
    id: item.id,
    title: item.name,
    description: `Weight: ${item.weight}, Height: ${item.height}`,
    duration: '10 min',
    releaseDate: '1998',
    rating: 3,
    genre: item.types?.[0]?.type?.name || '🐾',
    poster: image,
    backdrop: image,
    showTimes: ['10:00 AM', '12:00 PM', '3:00 PM'],
  };
};

// Adaptador para Dragon Ball API
export const adaptDbzToMovie = (item) => {
  return {
    id: item.id,
    title: item.name,
    description: `Ki: ${item.ki}, Max Power: ${item.max_power}`,
    duration: '30 min',
    releaseDate: '1990',
    rating: 4,
    genre: item.race || '🥋',
    poster: item.image,
    backdrop: item.image,
    showTimes: ['6:00 PM', '7:45 PM', '10:00 PM'],
  };
};

// Función general
export const adaptItem = (item, baseUrl = '') => {
  if (baseUrl.includes('rickandmorty')) return adaptRickToMovie(item);
  if (baseUrl.includes('pokeapi')) return adaptPokeToMovie(item);
  if (baseUrl.includes('dragonball')) return adaptDbzToMovie(item);
  return adaptTmdbToMovie(item); // default: TMDB
};
