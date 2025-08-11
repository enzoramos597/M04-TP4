import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) return <p className="text-center mt-6">No tienes favoritos aún.</p>;

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Favoritos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map(fav => (
          <div key={fav.id} className="p-4 border rounded bg-white dark:bg-gray-800 text-black dark:text-white">
            <img src={fav.image} alt={fav.name} className="w-full h-40 object-cover rounded" />
            <p className="font-semibold">{fav.name}</p>
            <button
              onClick={() => removeFavorite(fav.id)}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
