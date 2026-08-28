export interface CatalogMovie {
  id: number
  title: string
  description: string
  release_year: number
  genre: string
  poster: string
}


export const movieCatalog: CatalogMovie[] = [
  {
    id: 1,
    title: 'Interstellar',
    description:
      'A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.',
    release_year: 2014,
    genre: 'Science Fiction',
    poster: '/auth-posters/interstellar.jpg',
  },

  {
    id: 2,
    title: 'Inception',
    description:
      'A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past.',
    release_year: 2010,
    genre: 'Science Fiction',
    poster: '/auth-posters/inception.jpg',
  },

  {
    id: 3,
    title: 'The Dark Knight',
    description:
      'Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.',
    release_year: 2008,
    genre: 'Action',
    poster: '/auth-posters/the_dark_knight.jpg',
  },

  {
    id: 4,
    title: 'Forrest Gump',
    description:
      'The life of a kind-hearted man unfolds across several decades of American history.',
    release_year: 1994,
    genre: 'Drama',
    poster: '/auth-posters/forrest_gump.jpg',
  },

  {
    id: 5,
    title: 'Project Hail Mary',
    description:
      'An astronaut wakes up alone on a distant mission and must solve a mystery that could determine the future of humanity.',
    release_year: 2026,
    genre: 'Science Fiction',
    poster: '/auth-posters/project_hail_mary.jpg',
  },

  {
    id: 6,
    title: 'Spider-Man: Brand New Day',
    description:
      'Spider-Man begins a new chapter while facing new threats and the responsibilities that come with being a hero.',
    release_year: 2026,
    genre: 'Action',
    poster: '/auth-posters/spiderman_brand_new_day.jpg',
  },

  {
    id: 7,
    title: 'The Conjuring 4',
    description:
      'Paranormal investigators face another terrifying supernatural case involving a dangerous evil presence.',
    release_year: 2025,
    genre: 'Horror',
    poster: '/auth-posters/conjuring_4.jpg',
  },

  {
    id: 8,
    title: 'Obsession',
    description:
      'A dark story of desire and obsession in which personal relationships begin to spiral dangerously out of control.',
    release_year: 2025,
    genre: 'Thriller',
    poster: '/auth-posters/obsession.jpg',
  },

  {
    id: 9,
    title: 'The Odyssey',
    description:
      'A legendary hero faces gods, monsters and dangerous lands during an epic journey back home.',
    release_year: 2026,
    genre: 'Adventure',
    poster: '/auth-posters/odyssey.jpg',
  },

  {
    id: 10,
    title: 'Avengers: Infinity War',
    description:
      'The Avengers and their allies unite in an attempt to stop Thanos from collecting the powerful Infinity Stones.',
    release_year: 2018,
    genre: 'Action',
    poster: '/auth-posters/avengers_infinity_war.jpg',
  },

  {
    id: 11,
    title: 'Cars',
    description:
      'A talented race car finds himself stranded in a small town and discovers that life is about more than winning.',
    release_year: 2006,
    genre: 'Animation',
    poster: '/auth-posters/cars.jpg',
  },

  {
    id: 12,
    title: 'Finding Nemo',
    description:
      'A cautious clownfish crosses the ocean in search of his missing son with the help of an unforgettable companion.',
    release_year: 2003,
    genre: 'Animation',
    poster: '/auth-posters/finding_nemo.jpg',
  },

  {
    id: 13,
    title: 'Gladiator',
    description:
      'A betrayed Roman general becomes a gladiator and fights his way toward revenge against the emperor who destroyed his family.',
    release_year: 2000,
    genre: 'Action',
    poster: '/auth-posters/gladiator.jpg',
  },

  {
    id: 14,
    title: 'Fast & Furious Presents: Hobbs & Shaw',
    description:
      'Two unlikely allies are forced to work together when a dangerous enemy threatens the world.',
    release_year: 2019,
    genre: 'Action',
    poster: '/auth-posters/hobbs_and_shaw.jpg',
  },

  {
    id: 15,
    title: 'Insidious: Out of the Further',
    description:
      'A new supernatural threat emerges from the terrifying realm known as The Further.',
    release_year: 2026,
    genre: 'Horror',
    poster: '/auth-posters/insidious_out_of_the_further.jpg',
  },

  {
    id: 16,
    title: 'Joker',
    description:
      'A lonely man struggling to find his place in society begins a disturbing transformation in Gotham City.',
    release_year: 2019,
    genre: 'Drama',
    poster: '/auth-posters/joker.jpg',
  },

  {
    id: 17,
    title: 'Madagascar',
    description:
      'A group of zoo animals unexpectedly find themselves in the wild after spending their lives in New York City.',
    release_year: 2005,
    genre: 'Animation',
    poster: '/auth-posters/madagascar.jpg',
  },

  {
    id: 18,
    title: 'Oppenheimer',
    description:
      'The story of physicist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    release_year: 2023,
    genre: 'Drama',
    poster: '/auth-posters/oppenheimer.jpg',
  },

  {
    id: 19,
    title: 'Ratatouille',
    description:
      'A rat with an extraordinary talent for cooking dreams of becoming a chef in Paris.',
    release_year: 2007,
    genre: 'Animation',
    poster: '/auth-posters/ratatouille.jpg',
  },

  {
    id: 20,
    title: 'Rogue One: A Star Wars Story',
    description:
      'A group of unlikely heroes joins a dangerous mission to steal the plans for the Empire’s ultimate weapon.',
    release_year: 2016,
    genre: 'Science Fiction',
    poster: '/auth-posters/rogue_one.jpg',
  },

  {
    id: 21,
    title: 'Shutter Island',
    description:
      'A U.S. Marshal investigates the disappearance of a patient from an isolated psychiatric facility.',
    release_year: 2010,
    genre: 'Thriller',
    poster: '/auth-posters/shutter_island.jpg',
  },

  {
    id: 22,
    title: 'Solo: A Star Wars Story',
    description:
      'A young Han Solo begins a dangerous adventure through the criminal underworld and meets the people who shape his future.',
    release_year: 2018,
    genre: 'Science Fiction',
    poster: '/auth-posters/solo.jpg',
  },

  {
    id: 23,
    title: 'Top Gun',
    description:
      'A talented fighter pilot competes at an elite naval aviation school while learning about teamwork and responsibility.',
    release_year: 1986,
    genre: 'Action',
    poster: '/auth-posters/top_gun.jpg',
  },

  {
    id: 24,
    title: 'Toy Story 3',
    description:
      'Woody, Buzz and the rest of the toys face an uncertain future when their owner prepares to leave for college.',
    release_year: 2010,
    genre: 'Animation',
    poster: '/auth-posters/toy_story_3.jpg',
  },

  {
    id: 25,
    title: 'Uncharted',
    description:
      'A young treasure hunter joins an experienced adventurer on a dangerous search for a legendary lost fortune.',
    release_year: 2022,
    genre: 'Adventure',
    poster: '/auth-posters/uncharted.jpg',
  },

  {
    id: 26,
    title: 'Avengers: Endgame',
    description:
      'The Avengers assemble once more in a final attempt to reverse the devastation caused by Thanos.',
    release_year: 2019,
    genre: 'Action',
    poster: '/auth-posters/avengers_endgame.jpg',
  },

  {
    id: 27,
    title: 'Avengers: Doomsday',
    description:
      'The Avengers return to face a powerful new threat that could change the future of their world.',
    release_year: 2026,
    genre: 'Action',
    poster: '/auth-posters/avengers_doomsday.jpg',
  },
]