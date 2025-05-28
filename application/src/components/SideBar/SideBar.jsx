import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaListAlt, FaCog, FaBars } from 'react-icons/fa';

const SideBar = ({ isOpen, setIsOpen, isMobile }) => {
  const menuItems = [
    { title: 'Home', icon: <FaHome className="text-xl" />, path: '/' },
    { title: 'Programmi', icon: <FaListAlt className="text-xl" />, path: '/programmi' },
    { title: 'Impostazioni', icon: <FaCog className="text-xl" />, path: '/impostazioni' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-red-700 text-white transition-all duration-300 z-10
      ${isMobile ? 'p-2' : 'p-4'} 
      ${isOpen ? (isMobile ? 'w-44' : 'w-64') : (isMobile ? 'w-0' : 'w-20')}`}>
      
      {/* Bottone hamburger per mobile */}
      {isMobile && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-3 right-3 text-white"
        >
          <FaBars className="text-xl" />
        </button>
      )}

      <div className={`${isMobile ? 'mb-4' : 'mb-8'} text-center ${!isOpen && 'hidden'}`}>
        <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'}`}>
          WorkoutPlus
        </h1>
        <hr className="w-full mx-auto my-2 border-white" />
      </div>
      
      <nav className={`flex flex-col ${isMobile ? 'space-y-1' : 'space-y-2'} ${!isOpen && 'hidden'}`}>
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center ${isMobile ? 'space-x-2 p-2 text-sm' : 'space-x-4 p-3'} rounded-lg hover:bg-white/10 transition-colors duration-200`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <span className={`${isMobile ? 'min-w-[20px]' : 'min-w-[24px]'}`}>{item.icon}</span>
            <span className="whitespace-nowrap">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;