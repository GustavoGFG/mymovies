import axios from 'axios';

export const getMovie = async (title: string, year: string) => {
  title = title.trim().replaceAll(' ', '+');
  console.log(title);
  const json = await axios.get(
    `https://omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&t=${title}&y=${year}`
  );
  return json.data;
};
