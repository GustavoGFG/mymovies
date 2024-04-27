'use client';
import { addMovie, getAll } from '@/api/movies';
import { MoviesContext } from '@/contexts/MoviesContext';
import { toastTheme } from '@/data/toastThemes';
import { Movie } from '@/types/Movie';
import { StreamingType } from '@/types/Streaming';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import StreamingSelector from './StreamingSelector';

type Props = {
  movie: Movie;
  open: boolean;
  setOpen: (b: boolean) => void;
};
export const MovieModal = ({ movie, open, setOpen }: Props) => {
  const [selectedStreaming, setSelectedStreaming] =
    useState<StreamingType | null>(null);
  const [loading, setLoading] = useState(false);
  let moviesCtx = useContext(MoviesContext);

  const handleAddMovie = async () => {
    setLoading(true);
    const response = await addMovie({
      name: movie.Title,
      year: movie.Year,
      imageLink: movie.Poster,
      watchedDate: null,
      whereToWatch: selectedStreaming == null ? '' : selectedStreaming.name,
    });
    if (response) {
      setOpen(false);
      const fetchedMovies = await getAll();
      moviesCtx?.setMovies(fetchedMovies);
      setSelectedStreaming(null);
      toast.success('Filme adicionado!', toastTheme.success);
    } else {
      toast.error('Erro ao adicionar filme!', toastTheme.error);
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-none focus:outline-none ">
        <div className=" bg-white rounded-[20px] w-full h-full py-4 px-6 flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-center text-project-primary text-xl">
              {movie.Title} - {movie.Year}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 md:flex-row items-center">
            <div className="rounded-[20px] overflow-hidden w-[280px] h-[420px] relative">
              {movie.Poster != 'N/A' && (
                <Image
                  src={movie.Poster}
                  layout="fill"
                  objectFit="contain"
                  alt={movie.Title + ' poster'}
                />
              )}
            </div>
            <div className="w-[280px] self-center flex-1 text-md font-semibold text-project-primary text-center flex-col gap-4 p-4 hidden md:flex ">
              <p>{movie.Plot}</p>
              <div>
                <p className="font-bold">Elenco:</p>
                <p className="text-sm">{movie.Actors}</p>
              </div>
              <div>
                <p className="font-bold">Gênero:</p>
                <p className="text-sm">{movie.Genre}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col items-center w-full gap-4">
              <StreamingSelector
                selectedStreaming={selectedStreaming}
                setSelectedStreaming={setSelectedStreaming}
              />
              <Button
                disabled={loading}
                className="flex gap-2 items-center justify-center w-full shadow-none rounded-xl bg-project-primary text-white hover:bg-white hover:text-project-primary hover:shadow-lg"
                onClick={() => handleAddMovie()}
              >
                <span>Add to list</span>
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
