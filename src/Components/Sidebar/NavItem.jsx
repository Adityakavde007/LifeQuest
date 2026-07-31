import React from 'react'
import { NavLink } from 'react-router-dom';

const NavItem = ({title , icon:Icon, path, closeMenu}) => {
  return (
    <NavLink to={path} onClick={closeMenu} className={({isActive}) =>`nav-item ${isActive ? "active" : ""}`}>
      <Icon size={20} />
      <span>{title}</span>
    </NavLink>
  );
};

export default NavItem
