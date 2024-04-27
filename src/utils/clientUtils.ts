import { usePathname } from 'next/navigation';

export const getTitle = () => {
  const pathName = usePathname();

  switch (pathName) {
    case '/operation':
      return 'Modulo 1: Operation';
    case '/quality':
      return 'Modulo 2: Quality';
  }
};
