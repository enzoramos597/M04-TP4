import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const CharacterCard = ({ character }) => {
  const { addFavorite, favorites, removeFavorite } = useContext(FavoritesContext);

  // Verifica si el personaje actual está en la lista de favoritos
  const isFavorite = favorites.some(fav => fav.id === character.id);

  return (
    <div className="border p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-black dark:text-white">
      <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{character.name}</h2>
      <p className="text-sm">Especie: {character.species}</p>
      <p className="text-sm">Género: {character.gender}</p>
      <p className="text-sm">Locación: {character.location.name}</p>
      {isFavorite ? (
        <button
          onClick={() => removeFavorite(character.id)}
          className="mt-2 w-full bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 flex items-center justify-center space-x-2"
        >
          <i className="bi bi-trash text-xl"></i>
          <span>Quitar de Favoritos</span>
        </button>
      ) : (
        <button
          onClick={() => addFavorite(character)}
          className="mt-2 w-full bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
        >
          <i className="bi bi-heart text-xl"></i>
          <span>Agregar a Favoritos</span>
        </button>
      )}
    </div>
  );
};

export default CharacterCard;
