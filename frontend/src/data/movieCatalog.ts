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

  {
    id: 28,
    title: 'The Shawshank Redemption',
    description:
      'A banker sentenced to prison develops an unlikely friendship while holding on to hope through years of hardship.',
    release_year: 1994,
    genre: 'Drama',
    poster: '/auth-posters/the_shawshank_redemption.jpg',
  },
  {
    id: 29,
    title: 'The Godfather',
    description:
      'The aging leader of a powerful crime family prepares his reluctant son to become part of the family business.',
    release_year: 1972,
    genre: 'Crime',
    poster: '/auth-posters/the_godfather.jpg',
  },
  {
    id: 30,
    title: 'Pulp Fiction',
    description:
      'Several interconnected stories involving criminals and unexpected encounters unfold across Los Angeles.',
    release_year: 1994,
    genre: 'Crime',
    poster: '/auth-posters/pulp_fiction.jpg',
  },
  {
    id: 31,
    title: 'Fight Club',
    description:
      'An unhappy office worker forms an underground fight club with a mysterious and unpredictable new friend.',
    release_year: 1999,
    genre: 'Drama',
    poster: '/auth-posters/fight_club.jpg',
  },
  {
    id: 32,
    title: 'Se7en',
    description:
      'Two detectives investigate a disturbing series of murders connected by a carefully designed pattern.',
    release_year: 1995,
    genre: 'Thriller',
    poster: '/auth-posters/se7en.jpg',
  },
  {
    id: 33,
    title: 'The Green Mile',
    description:
      'A prison guard discovers that a death row inmate possesses an extraordinary and mysterious gift.',
    release_year: 1999,
    genre: 'Drama',
    poster: '/auth-posters/the_green_mile.jpg',
  },
  {
    id: 34,
    title: 'Goodfellas',
    description:
      'A young man enters the world of organized crime and experiences both its rewards and its consequences.',
    release_year: 1990,
    genre: 'Crime',
    poster: '/auth-posters/goodfellas.jpg',
  },
  {
    id: 35,
    title: 'Django Unchained',
    description:
      'A freed man joins a bounty hunter on a dangerous mission while searching for his wife.',
    release_year: 2012,
    genre: 'Adventure',
    poster: '/auth-posters/django_unchained.jpg',
  },
  {
    id: 36,
    title: 'The Wolf of Wall Street',
    description:
      'An ambitious stockbroker rises to enormous wealth while his reckless lifestyle attracts increasing attention.',
    release_year: 2013,
    genre: 'Drama',
    poster: '/auth-posters/the_wolf_of_wall_street.jpg',
  },
  {
    id: 37,
    title: 'Titanic',
    description:
      'Two passengers from very different backgrounds fall in love aboard a famous ocean liner on its tragic voyage.',
    release_year: 1997,
    genre: 'Drama',
    poster: '/auth-posters/titanic.jpg',
  },
  {
    id: 38,
    title: 'Avatar',
    description:
      'A former Marine travels to the distant world of Pandora and becomes involved in a conflict over its future.',
    release_year: 2009,
    genre: 'Science Fiction',
    poster: '/auth-posters/avatar.jpg',
  },
  {
    id: 39,
    title: 'Dune',
    description:
      'A young nobleman travels to a dangerous desert world where powerful families compete for control of a vital resource.',
    release_year: 2021,
    genre: 'Science Fiction',
    poster: '/auth-posters/dune.jpg',
  },
  {
    id: 40,
    title: 'Dune: Part Two',
    description:
      'Paul Atreides continues his journey across Arrakis while facing decisions that could determine the fate of the galaxy.',
    release_year: 2024,
    genre: 'Science Fiction',
    poster: '/auth-posters/dune_part_two.jpg',
  },
  {
    id: 41,
    title: 'Blade Runner 2049',
    description:
      'A new blade runner uncovers a hidden secret that leads him toward a former officer who disappeared decades earlier.',
    release_year: 2017,
    genre: 'Science Fiction',
    poster: '/auth-posters/blade_runner_2049.jpg',
  },
  {
    id: 42,
    title: 'Arrival',
    description:
      'A linguist is recruited to communicate with mysterious visitors after spacecraft appear around the world.',
    release_year: 2016,
    genre: 'Science Fiction',
    poster: '/auth-posters/arrival.jpg',
  },
  {
    id: 43,
    title: 'The Martian',
    description:
      'An astronaut stranded alone on Mars must use science and determination to survive while waiting for rescue.',
    release_year: 2015,
    genre: 'Science Fiction',
    poster: '/auth-posters/the_martian.jpg',
  },
  {
    id: 44,
    title: 'The Matrix',
    description:
      'A computer programmer discovers that the world around him hides a reality far stranger than he imagined.',
    release_year: 1999,
    genre: 'Science Fiction',
    poster: '/auth-posters/the_matrix.jpg',
  },
  {
    id: 45,
    title: 'Jurassic Park',
    description:
      'Visitors to an advanced theme park must survive after genetically recreated dinosaurs escape their controlled environment.',
    release_year: 1993,
    genre: 'Adventure',
    poster: '/auth-posters/jurassic_park.jpg',
  },
  {
    id: 46,
    title: 'Jaws',
    description:
      'A seaside community is threatened by a dangerous shark as three men set out to stop it.',
    release_year: 1975,
    genre: 'Thriller',
    poster: '/auth-posters/jaws.jpg',
  },
  {
    id: 47,
    title: 'Alien',
    description:
      'The crew of a deep-space vessel encounters a deadly unknown creature after responding to a mysterious signal.',
    release_year: 1979,
    genre: 'Horror',
    poster: '/auth-posters/alien.jpg',
  },
  {
    id: 48,
    title: 'Terminator 2: Judgment Day',
    description:
      'A powerful machine is sent from the future to protect a young boy from a more advanced enemy.',
    release_year: 1991,
    genre: 'Action',
    poster: '/auth-posters/terminator_2.jpg',
  },
  {
    id: 49,
    title: 'Back to the Future',
    description:
      'A teenager accidentally travels into the past and must repair history before returning to his own time.',
    release_year: 1985,
    genre: 'Science Fiction',
    poster: '/auth-posters/back_to_the_future.jpg',
  },
  {
    id: 50,
    title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    description:
      'A blacksmith joins an eccentric pirate captain on a journey involving a stolen ship and an ancient curse.',
    release_year: 2003,
    genre: 'Adventure',
    poster: '/auth-posters/pirates_of_the_caribbean.jpg',
  },
  {
    id: 51,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    description:
      'A young hobbit begins a dangerous journey with a fellowship determined to destroy a powerful ancient ring.',
    release_year: 2001,
    genre: 'Adventure',
    poster: '/auth-posters/lotr_fellowship.jpg',
  },
  {
    id: 52,
    title: 'The Lord of the Rings: The Return of the King',
    description:
      'The final battle for Middle-earth begins as the quest to destroy the One Ring reaches its conclusion.',
    release_year: 2003,
    genre: 'Adventure',
    poster: '/auth-posters/lotr_return_of_the_king.jpg',
  },
  {
    id: 53,
    title: 'Harry Potter and the Philosopher’s Stone',
    description:
      'A young boy discovers that he is a wizard and begins his first year at a mysterious school of magic.',
    release_year: 2001,
    genre: 'Adventure',
    poster: '/auth-posters/harry_potter_philosophers_stone.jpg',
  },
  {
    id: 54,
    title: 'The Lion King',
    description:
      'A young lion prince must overcome loss and responsibility before returning to reclaim his place as king.',
    release_year: 1994,
    genre: 'Animation',
    poster: '/auth-posters/the_lion_king.jpg',
  },
  {
    id: 55,
    title: 'WALL-E',
    description:
      'A lonely waste-collecting robot discovers a new purpose after meeting a sophisticated robot from space.',
    release_year: 2008,
    genre: 'Animation',
    poster: '/auth-posters/wall_e.jpg',
  },
  {
    id: 56,
    title: 'Up',
    description:
      'An elderly man begins an unexpected adventure after lifting his home into the sky with thousands of balloons.',
    release_year: 2009,
    genre: 'Animation',
    poster: '/auth-posters/up.jpg',
  },
  {
    id: 57,
    title: 'Coco',
    description:
      'A young musician enters the Land of the Dead and uncovers long-hidden secrets about his family.',
    release_year: 2017,
    genre: 'Animation',
    poster: '/auth-posters/coco.jpg',
  },
  {
    id: 58,
    title: 'Shrek',
    description:
      'A solitary ogre begins an unexpected adventure after his peaceful home is filled with fairy-tale creatures.',
    release_year: 2001,
    genre: 'Animation',
    poster: '/auth-posters/shrek.jpg',
  },
  {
    id: 59,
    title: 'John Wick',
    description:
      'A retired assassin returns to the criminal world after a personal tragedy forces him back into action.',
    release_year: 2014,
    genre: 'Action',
    poster: '/auth-posters/john_wick.jpg',
  },
  {
    id: 60,
    title: 'The Prestige',
    description:
      'Two rival magicians become consumed by competition as each tries to create the ultimate illusion.',
    release_year: 2006,
    genre: 'Thriller',
    poster: '/auth-posters/the_prestige.jpg',
  },
    {
    id: 61,
    title: 'Superman',
    description:
      'Superman tries to balance his Kryptonian heritage with his human upbringing while protecting the world from new threats.',
    release_year: 2025,
    genre: 'Action',
    poster: '/auth-posters/superman.jpg',
  },
  {
    id: 62,
    title: '28 Years Later',
    description:
      'Years after a devastating outbreak, survivors continue to face the dangers of a world transformed by infection.',
    release_year: 2025,
    genre: 'Horror',
    poster: '/auth-posters/28_years_later.jpg',
  },
  {
    id: 63,
    title: 'The Mandalorian & Grogu',
    description:
      'The Mandalorian and Grogu continue their journey across the galaxy while facing new enemies and dangerous missions.',
    release_year: 2026,
    genre: 'Science Fiction',
    poster: '/auth-posters/the_mandalorian_and_grogu.jpg',
  },
]