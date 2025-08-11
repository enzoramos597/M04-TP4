import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import CharacterList from './components/CharacterList';
import Favorites from './components/Favorites';
import { searchCharacters } from './services/api';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // <-- estado para errores

  const handleSearch = async (query, limit, gender) => {
    setLoading(true);
    setError(null); // limpiamos error anterior
    try {
      const results = await searchCharacters(query);

      // Filtramos por género si está seleccionado
      let filteredResults = gender
        ? results.filter((char) => char.gender === gender)
        : results;

      const foundCount = filteredResults.length;

      if (foundCount === 0) {
        // No hay resultados
        const msg = `No se encontraron personajes para "${query}"${gender ? ` con género ${gender}` : ''}.`;
        setCharacters([]);
        setError(msg);
        toast.error(msg);
        return;
      }

      // Recortamos según límite pedido
      const limitedResults = filteredResults.slice(0, limit);
      setCharacters(limitedResults);

      // Mensaje según la comparación entre encontrado y pedido
      if (foundCount < limit) {
        const msg = `Se encontraron solo ${foundCount} personajes${gender ? ` de género ${gender}` : ''} para "${query}". Tú pediste ${limit}.`;
        setError(msg);           // dejamos el mensaje de info en el estado
        toast.info(msg);
      } else {
        const msg = `Se encontraron ${limitedResults.length} personajes${gender ? ` de género ${gender}` : ''} para "${query}".`;
        setError(null);          // sin error real
        toast.success(msg);
      }
    } catch (err) {
      // Usamos el error aquí (antes: catch(error) y no se usaba -> ESLint)
      const msg = err?.response?.status === 404
        ? `No se encontraron personajes para "${query}".`
        : 'Error al buscar personajes';
      setError(msg);
      toast.error(msg);
      setCharacters([]);
    } finally {
      setLoading(false);
      // opcional: limpiar el error luego de X segundos
      // setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <FavoritesProvider>
      <Header />
      <main className="min-h-screen bg-yellow-100 dark:bg-gray-900 text-black dark:text-white">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-4 mt-3">Buscador de Personajes</h2>

          <SearchForm onSearch={handleSearch} />

          {/* Mensaje de error visible en la UI */}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}

          {loading && <p className="text-center text-lg">Cargando...</p>}
          {!loading && <CharacterList characters={characters} />}
          <Favorites />
        </div>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </FavoritesProvider>
  );
};

export default App;


