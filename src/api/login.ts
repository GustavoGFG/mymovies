import { reqdev } from './axios';

export const signup = async (email: string, password: string) => {
  try {
    const json = await reqdev.post('/signup', { email, password });
    if (json.data.success) {
      localStorage.setItem('movienight', json.data.token);
    }
    return json.data;
  } catch (error) {
    return false;
  }
};

type loginResponse = {
  success: boolean;
  token?: string;
  error?: string;
};
export const login = async (
  email: string,
  password: string
): Promise<loginResponse | false> => {
  try {
    const json = await reqdev.post('/login', { email, password });
    if (json.data.success) {
      localStorage.setItem('movienight', json.data.token);
    }
    return json.data;
  } catch (error) {
    return false;
  }
};
