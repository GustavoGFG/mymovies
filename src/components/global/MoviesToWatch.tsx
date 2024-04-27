import React from 'react';
import { MovieCard } from '@/components/global/MovieCard';
import { ApiMovie } from '@/types/Movie';
type Prop = {
  movies: ApiMovie[];
};
export const MoviesToWatch = ({ movies }: Prop) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 mx-auto gap-4 w-fit">
      {movies.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      ))}
    </div>
  );
};
