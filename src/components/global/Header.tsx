'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Search } from 'lucide-react';
import { MovieModal } from './MovieModal';
import { getMovie } from '@/api/omdb';
import { Movie } from '@/types/Movie';

export const Header = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [open, setOpen] = useState(false);

  const handleButton = async () => {
    const movie = await getMovie(title, year);
    setMovie(movie);
    setOpen(true);
  };

  return (
    <header className="bg-project-primary shadow-lg shadow-zinc-400 h-[200px] md:h-[60px] flex md:flex-row flex-col gap-4 md:gap-8 justify-center lg:justify-end items-center px-4">
      <div className="flex items-center gap-4 text-lg">
        <Label className="text-white text-md w-12">Nome:</Label>
        <Input
          className="w-[250px]"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 text-lg">
        <Label className="text-white text-md w-12">Ano:</Label>
        <Input
          className="w-[250px]"
          value={year}
          onChange={e => {
            setYear(e.target.value);
          }}
        />
      </div>
      {movie && <MovieModal movie={movie} open={open} setOpen={setOpen} />}
      <Button
        className="rounded-[10px] md:rounded-full border border-white w-[310px] md:w-[60px] mt-2 md:mt-0 hover:bg-project-primaryHover text-white hover:text-black"
        onClick={() => handleButton()}
      >
        <Search size={20} />
      </Button>
    </header>
  );
};
