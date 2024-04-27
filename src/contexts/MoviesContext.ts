import { ApiMovie } from '@/types/Movie';
import React, { createContext, useState } from 'react';

type MoviesContextType = {
  movies: ApiMovie[];
  setMovies: (array: ApiMovie[]) => void;
};

export const MoviesContext = createContext<MoviesContextType | null>(null);
