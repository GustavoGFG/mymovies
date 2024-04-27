'use client';

import { useEffect, useState } from 'react';
import { getAll } from '@/api/movies';
import { MoviesToWatch } from '@/components/global/MoviesToWatch';
import { ApiMovie } from '@/types/Movie';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import React from 'react';
import { MoviesContext } from '@/contexts/MoviesContext';
import { Toaster } from '@/components/ui/sonner';

const Page = () => {
  const [movies, setMovies] = useState<ApiMovie[] | []>([]);

  const fetchData = async () => {
    try {
      const fetchedMovies = await getAll();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      <Header />
      <div className="min-h-[calc(100dvh-100px)] py-4">
        {movies && <MoviesToWatch movies={movies} />}
      </div>
      <Toaster className="bg-white" />
      <Footer />
    </MoviesContext.Provider>
  );
};

export default Page;
