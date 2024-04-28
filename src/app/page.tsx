'use client';

import { login, signup } from '@/api/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { toastTheme } from '@/data/toastThemes';
import { navigate } from '@/utils/serverUtils';
import { emailRegex } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [form, setForm] = useState('signin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleFormButton = async () => {
    if (form == 'signin') {
      const response = await login(email, password);
      if (response && response?.success) {
        navigate('/movies');
      } else {
        toast.error('Dados inválidos', toastTheme.error);
      }
    } else {
      if (password === confirmPassword) {
        const response = await signup(email, password);
        if (response && response?.success) {
          navigate('/movies');
        } else {
          toast.error('Dados inválidos', toastTheme.error);
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('movienight') !== null) {
      navigate('/movies');
    }
  }, []);

  return (
    <div className="h-[100dvh] flex justify-between overflow-hidden">
      <div className="w-full relative">
        <div className="absolute top-0 bottom-0  w-full bg-black/50 z-10"></div>
        <Image
          className="blur-sm"
          src={'/assets/background.png'}
          layout="fill"
          objectFit="cover"
          alt={'background image'}
        />
      </div>
      <div className="top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[400px] bg-project-primary opacity-70 absolute z-10 py-8 px-12 flex flex-col gap-8">
        <div className="flex justify-between">
          <h2
            className={`text-white text-xl font-semibold ${form == 'signup' ? 'opacity-25 cursor-pointer hover:opacity-100' : ''}`}
            onClick={() => {
              setForm('signin');
            }}
          >
            ENTRAR
          </h2>
          <h2
            className={`text-white text-xl font-semibold ${form == 'signin' ? 'opacity-25 cursor-pointer hover:opacity-100' : ''}`}
            onClick={() => {
              setForm('signup');
            }}
          >
            CADASTRAR
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Email"
            className="text-white bg-project-primary"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />

          <Input
            type="password"
            placeholder="Senha"
            className="text-white bg-project-primary"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />

          {form == 'signup' && (
            <Input
              type="password"
              placeholder="Confirmar senha"
              className="text-white bg-project-primary"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
          )}
          <div className="flex flex-col pl-2">
            {!emailRegex.test(email) && email != '' && (
              <span className="text-red-500 opacity-100 font-bold text-[12px]">
                Email inválido
              </span>
            )}
            {password.length < 8 && password != '' && (
              <span className="text-red-500 opacity-100 font-bold text-[12px] ">
                Mínimo 8 dígitos
              </span>
            )}
            {form == 'signup' &&
              password != confirmPassword &&
              password.length >= 8 &&
              password != '' && (
                <span className="text-red-500 opacity-100 font-bold text-[12px] ">
                  Senhas diferentes
                </span>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant={'projectprimary'}
            disabled={
              form == 'signin'
                ? !emailRegex.test(email) || password.length < 8
                : !emailRegex.test(email) ||
                  password != confirmPassword ||
                  password.length < 8
            }
            onClick={() => {
              handleFormButton();
            }}
          >
            {form == 'signin' ? 'Entrar' : 'Cadastrar'}
          </Button>
          {form == 'signin' && (
            <span className="text-white text-center cursor-pointer">
              Esqueceu a senha?
            </span>
          )}
        </div>
      </div>
      <Toaster className="bg-white" />
    </div>
  );
};
export default Page;
