'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Search, LogOut, X } from 'lucide-react';
import { MovieModal } from './MovieModal';
import { getMovie } from '@/api/omdb';
import { Movie } from '@/types/Movie';
import { navigate } from '@/utils/serverUtils';

export const Header = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const handleSearchMovieButton = async () => {
    if (!search && window.innerWidth < 768) {
      setSearch(true);
    } else {
      const movie = await getMovie(title, year);
      setSearch(false);
      setMovie(movie);
      setOpen(true);
    }
  };

  const handleLogoutButton = () => {
    localStorage.removeItem('movienight');
    navigate('/');
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setSearch(false);
      }
    }

    // Event listener for window resize
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`bg-project-primary shadow-lg shadow-zinc-400 h-[60px] flex justify-between px-8 ${search ? 'fixed min-h-[100dvh] w-full z-30 py-[18px]' : 'items-center py-1'}`}
    >
      {search && (
        <X
          width={20}
          height={25}
          className="cursor-pointer text-white"
          onClick={() => {
            setSearch(false);
          }}
        />
      )}
      {!search && (
        <LogOut
          width={20}
          height={25}
          className="cursor-pointer text-white"
          onClick={() => {
            handleLogoutButton();
          }}
        />
      )}

      <div
        className={`absolute top-[75px] flex flex-col gap-4 items-center px-8 left-0 right-0 md:relative md:top-0 md:flex-row md:flex-1  md:justify-end ${search ? 'flex' : 'hidden md:flex'}`}
      >
        <Input
          placeholder="Busque filmes, series..."
          className="w-full max-w-[500px] md:w-[200px] rounded-none bg-transparent text-white border-x-0 px-2 m-0 py-0 border-t-0 border-b-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          placeholder="Ano"
          className="w-full max-w-[500px] md:w-[200px] rounded-none bg-transparent text-white border-x-0 px-2 m-0 py-0 border-t-0 border-b-1"
          value={year}
          onChange={e => {
            setYear(e.target.value);
          }}
        />
      </div>
      <Search
        width={20}
        height={25}
        onClick={() => handleSearchMovieButton()}
        className="text-white cursor-pointer"
      />

      {movie && <MovieModal movie={movie} open={open} setOpen={setOpen} />}
    </header>
  );
};
