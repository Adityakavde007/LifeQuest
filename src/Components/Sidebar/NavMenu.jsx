import { useState } from 'react';
import React from 'react'
import NavItem from './NavItem'
import {
  House,
  SquareCheckBig,
  Target,
  Bot,
  ChartNoAxesCombined,
  Trees,
  Trophy,
  Settings,
} from "lucide-react";

// const menuItems = [
//   "Dashboard",
//   "Tasks",
//   "Focus",
//   "AI Assistant",
//   "Analytics",
//   "Forest",
//   "Achievements",
//   "Settings",
// ];

const menuItems = [
  {
    title: "Dashboard",
    icon: House,
    path: "/",
  },
  {
    title: "Tasks",
    icon: SquareCheckBig,
    path: "/tasks",
  },
  {
    title: "Focus",
    icon: Target,
    path: "/focus",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/ai-assistant",
  },
  {
    title: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/analytics",
  },
  {
    title: "Forest",
    icon: Trees,
    path: "/forest",
  },
  {
    title: "Achievements",
    icon: Trophy,
    path: "/achivements",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const NavMenu = ({closeMenu, isOpen}) => {

    // const [active,setActive]= useState(menuItems[0].title);

  return (
    <nav className="nav-menu">
     {menuItems.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          icon={item.icon}
          path={item.path}
          closeMenu={closeMenu}
        />
      ))}
    </nav>
  );
};

export default NavMenu
