import { ApiMovie } from '@/types/Movie';
import { json } from 'stream/consumers';
import { reqdev } from './axios';

export const getAll = async (): Promise<ApiMovie[]> => {
  console.log('GET ALL');
  const token = localStorage.getItem('movienight');
  console.log(token);
  const json = await reqdev.get('/towatch', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(json.data.movies);
  return json.data.movies;
};

export const addMovie = async (movie: ApiMovie) => {
  const token = localStorage.getItem('movienight');
  try {
    const json = await reqdev.post('/towatch', movie, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (json.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const removeMovie = async (name: string, year: string) => {
  const token = localStorage.getItem('movienight');
  try {
    const json = await reqdev.delete(`towatch/${name}/${year}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (json.data) {
      return json.data.success;
    }
  } catch (error) {
    return false;
  }
};
