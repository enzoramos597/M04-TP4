import { useContext, useState, useEffect } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import logo from '../assets/react.svg';

const Header = () => {
  const { favorites, removeFavorite, clearFavorites } = useContext(FavoritesContext);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Nuevo estado para mostrar/ocultar botón vaciar favoritos
  const [showClearButton, setShowClearButton] = useState(false);

  // useEffect que actualiza showClearButton cuando cambia favorites
  useEffect(() => {
    setShowClearButton(favorites.length > 0);
  }, [favorites]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showFavorites) setShowFavorites(false);
  };

  const navbarLinks = [
    { id: 1, title: "Inicio", link: "/" },
    { id: 2, title: "Nosotros", link: "/" },
    { id: 3, title: "Contacto", link: "/" },
    { id: 4, title: "Soporte", link: "/" }
  ];

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-10 dark:bg-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center ">
        {/* LOGO y TÍTULO de E-Tienda */}
        <div className='flex items-center gap-2'>
          <img
            src={logo}
            alt="LogoJS"
            className='w-[40px] p-0.5'
          />
          <h1 className='text-white font-bold text-2xl'>Rick & Morty</h1>
        </div>

        {/* NAVEGACIÓN LINKS DESKTOP */}
        <div className='hidden md:block'>
          <ul className='flex space-x-6 px-4'>
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a href={link.link} className='text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110 inline-block'>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">

          {/* Botón de favoritos y contador (Solo para Desktop) */}
          <div className="relative  items-center hidden md:flex">
            {/* Mini imágenes de personajes favoritos */}
            <div className="flex -space-x-2 mr-2">
              {favorites.slice(0, 3).map((fav) => (
                <img
                  key={fav.id}
                  src={fav.image}
                  alt={fav.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            {/* Botón de favoritos */}
            <button onClick={() => setShowFavorites(!showFavorites)} className="relative">
              <i className="bi bi-heart text-2xl"></i>
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full px-2 text-sm">
                {favorites.length}
              </span>
            </button>
          </div>

          {/* BURGER BUTTON para móvil */}
          <button
            className='md:hidden text-white p-2 cursor-pointer z-50'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {
                isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                )
                  : (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  )
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable de favoritos (para Desktop) */}
      {showFavorites && (
        <div className="absolute right-4 mt-4 w-96 bg-white text-black rounded-lg shadow-lg p-4 dark:bg-slate-700 dark:text-white">
          <h2 className="text-xl font-bold">Favoritos</h2>
          {favorites.length === 0 ? (
            <p className="text-center">No tienes favoritos aún.</p>
          ) : (
            <>
              {favorites.map(fav => (
                <div key={fav.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center gap-2">
                    <img src={fav.image} alt={fav.name} className="w-8 h-8 rounded object-cover" />
                    <span>{fav.name}</span>
                  </div>
                  <button onClick={() => removeFavorite(fav.id)} className="text-red-500 ml-2 font-bold">Quitar</button>
                </div>
              ))}

              {/* Botón para vaciar favoritos que se muestra controlado por useEffect */}
              {showClearButton && (
                <div className="mt-4 text-center">
                  <button
                    onClick={clearFavorites}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Vaciar favoritos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* VISTA MOBILE (Menú desplegable) */}
      <div
        className={`md:hidden absolute top-[70px] left-0 w-full bg-gray-800 transition-all duration-300 ease-in-out z-40 flex flex-col ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {/* VISTA MOBILE LINKS */}
        <ul className='flex flex-col px-4 py-2 flex-grow'>
          {navbarLinks.map((link) => (
            <li key={link.id} className='py-2 text-center'>
              <a
                href={link.link}
                className='text-sm text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110'
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Favoritos para móvil */}
        <div className="flex flex-col items-center gap-4 px-4 py-4 border-t border-emerald-400">
          <div className="relative flex flex-col items-center w-full">
            <button
              onClick={() => {
                setShowFavorites(!showFavorites);
                setIsOpen(false);
              }}
              className="relative p-2 bg-slate-700 rounded hover:bg-slate-600 flex items-center justify-center w-full"
            >
              <i className="bi bi-heart text-2xl mr-2"></i>
              <span>Ver Favoritos ({favorites.length})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
