import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hace scroll suave o instantáneo al tope de la página cada vez que cambia la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}