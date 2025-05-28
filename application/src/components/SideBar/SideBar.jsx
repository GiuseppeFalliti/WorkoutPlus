import React, { useState, useEffect } from 'react'; // Aggiunto useState qui
import { Link } from 'react-router-dom';
import { FaHome, FaListAlt, FaCog, FaBars } from 'react-icons/fa'; // Aggiunto FaBars

const SideBar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuItems = [
    { title: 'Home', icon: <FaHome className="text-xl" />, path: '/' },
    { title: 'Programmi', icon: <FaListAlt className="text-xl" />, path: '/programmi' },
    { title: 'Impostazioni', icon: <FaCog className="text-xl" />, path: '/impostazioni' },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Chiudi sidebar automaticamente su mobile
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  return (
    <div className={`fixed top-0 left-0 h-screen bg-red-700 text-white transition-all duration-300 z-10
      ${isMobile ? 'p-2' : 'p-4'} 
      ${isOpen ? (isMobile ? 'w-40' : 'w-64') : (isMobile ? 'w-14' : 'w-20')}`}>

      {/* Bottone hamburger per mobile */}{/*{isMobile ? (isOpen ?<button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative top-3 left-15 text-white"
        >
          <FaBars className="text-xl" />
        </button> : <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative top-2 left-2 text-white"
        >
          <FaBars className="text-xl" />
        </button> ) : null} 
*/ }
      {isMobile && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 left-2 text-white"
        >
          <FaBars className="text-xl" />
        </button>
      )}
      
      <div className={`${isMobile ? 'mb-4' : 'mb-8'} text-center`}>
        
        {isMobile ? null :<h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'} ${!isOpen && isMobile && 'hidden'}`}>
          WorkoutPlus
        </h1> }
        
        <hr className="absolute bottomo-1 w-full mx-auto my-2 border-white" />
      </div>
      
      <nav className={`flex flex-col ${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center ${isMobile ? 'space-x-2 p-2 text-sm' : 'space-x-4 p-3'} rounded-lg hover:bg-white/10 transition-colors duration-200`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <span className={`${isMobile ? 'min-w-[20px]' : 'min-w-[24px]'}`}>{item.icon}</span>
            <span className={`whitespace-nowrap ${!isOpen && 'hidden'}`}>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;