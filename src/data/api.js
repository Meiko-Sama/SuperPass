const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const mockResults = [
  {
    id: 1,
    original_title: "The Adventures of ChatGPT",
    poster_path: require("../assets/images/Academias/academiaJoy.png"),
    backdrop_path: require("../assets/images/Academias/academiaperto1.jpg"),
    vote_average: 5,
    overview: "A thrilling AI adventure!",
    release_date: "2025-09-25",
    genre_ids: [12, 878],
  },
  {
    id: 2,
    original_title: "React Native: The Movie",
    poster_path: require("../assets/images/Academias/academiaperto3.jpg"),
    backdrop_path: require("../assets/images/Academias/academiapopular1.jpg"),
    vote_average: 10,
    overview: "A developer's journey through code.",
    release_date: "2025-09-20",
    genre_ids: [35, 18],
  },
];

export const getMovies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockResults.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: poster_path,
      backdrop: backdrop_path,
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

};


