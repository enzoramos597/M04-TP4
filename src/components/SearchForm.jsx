import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(1);
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, limit, gender);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 my-6"
    >
      <div className='flex flex-col md:flex-row justify-center items-center gap-6 w-full'>
        {/* Campo de búsqueda */}
        <div className='flex items-center gap-2'>
          <label className='text-xl font-bold'>Buscar:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar personaje..."
            className="px-4 py-2 border rounded w-64 bg-white"
            required
          />
        </div>

        {/* Cantidad de personajes */}
        <div className='flex items-center gap-2'>
          <label className='text-xl font-bold'>Cantidad:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            placeholder="Cantidad"
            className="px-4 py-2 border rounded w-24 bg-white"
          />
        </div>

        {/* Género */}
        <div className="flex items-center gap-2 border p-4 rounded bg-gray-100">
          <label className='text-xl font-bold'>Sexo</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
      </div>
      
      {/* Botón de búsqueda */}
      <button
        type="submit"
        className="bg-green-600 text-white px-20 py-4 rounded-lg hover:bg-green-700 text-2xl font-bold mt-4 w-full md:w-auto"
      >
        B u s c a r
      </button>
    </form>
  );
};

export default SearchForm;