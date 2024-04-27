import { ApiMovie } from '@/types/Movie';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { getAll, removeMovie } from '@/api/movies';
import { streaming } from '@/data/streaming';
import { toast } from 'sonner';
import { MoviesContext } from '@/contexts/MoviesContext';
import { toastTheme } from '@/data/toastThemes';

type Props = {
  movie: ApiMovie;
};
export const MovieCard = ({ movie }: Props) => {
  const [loading, setLoading] = useState(false);

  const moviesCtx = useContext(MoviesContext);

  const handleRemoveButton = async (name: string, year: string) => {
    setLoading(true);
    const response = await removeMovie(name, year);
    if (response) {
      setLoading(false);

      toast.success('Filme removido!', toastTheme.success);
      const fetchedMovies = await getAll();
      moviesCtx?.setMovies(fetchedMovies);
    } else {
      toast.error('Erro ao remover Filme!', toastTheme.error);
    }
  };
  return (
    <div className="flex flex-col w-fit gap-2 relative">
      {movie.whereToWatch != '' && (
        <div
          className={`absolute bottom-[58px] right-2 z-10 flex items-center justify-center rounded-full w-12 h-12 overflow-hidden bg-transparent hover:opacity-100  
      opacity-60
      `}
        >
          <Image
            src={
              streaming.find(stream => {
                return stream.name == movie.whereToWatch;
              })?.logo
            }
            alt={movie.name}
            width={85}
            height={85}
          />
        </div>
      )}
      <div className="rounded-[20px] overflow-hidden w-[160px] h-[240px] md:w-[320px] md:h-[480px] relative">
        <Image
          src={movie.imageLink}
          layout="fill"
          objectFit="contain"
          alt={movie.name + ' poster'}
        />
      </div>
      <Button
        className="w-full flex gap-2 text-project-primary font-semibold rounded-xl shadow-lg hover:bg-project-primary hover:text-white"
        onClick={() => handleRemoveButton(movie.name, movie.year)}
      >
        <Trash2 size={18} />
        <span>Remove</span>
      </Button>
    </div>
  );
};
