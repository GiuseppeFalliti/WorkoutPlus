import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaDumbbell, FaListAlt, FaUtensils, FaCog } from 'react-icons/fa';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: 'Home', icon: <FaHome className="text-xl" />, path: '/' },
    { title: 'Programmi', icon: <FaListAlt className="text-xl" />, path: '/programmi' },
    { title: 'Impostazioni', icon: <FaCog className="text-xl" />, path: '/impostazioni' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen w-64 bg-red-700 text-white p-4 transition-all duration-300 ${!isOpen && 'w-20'}`}>
      <div className="mb-8 text-center">
        {/*Titolo*/}
        <h1 className="text-2xl font-bold mb-2">WorkoutPlus</h1>
        {/*line di separazione bianca che prende tutta la larghezza della side bar*/}
        <hr className="w-full mx-auto my-2 border-white" />
      </div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <span className="min-w-[24px]">{item.icon}</span>
            <span className={`whitespace-nowrap ${!isOpen && 'hidden'}`}>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
