import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Estado para almacenar los favoritos
  // Inicializamos con los datos de localStorage si existen, o con un array vacío.
  const [favorites, setFavorites] = useState(() => {
    // Al inicializar el estado, primero intenta cargar los datos de localStorage.
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  });

  // Este useEffect ahora solo se encargará de guardar en localStorage cuando el estado 'favorites' cambie.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  // Funciones para manejar los favoritos
  // Agrega un personaje a favoritos si no está ya en la lista
  const addFavorite = (character) => {
    if (!favorites.find(f => f.id === character.id)) {
      setFavorites([...favorites, character]);
    }
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  }

  const clearFavorites = () => {
  setFavorites([]);
};

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}