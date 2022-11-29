import { Coloc } from "@prisma/client";
import { useCurrentUserContext } from "../provider/CurrentUserContext";
import { Dropdown } from "./Dropdown";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Link from "next/link";

type NavBarProps = {};

function NavBar({}: NavBarProps) {
  const { drawerOpen, setDrawerOpen } = useCurrentUserContext();
  return (
    <nav className="sticky top-0 w-full flex flex-row justify-center text-center shadow-sm bg-blue-400 items-center">
      <Bars3Icon
        className="w-10 h-10 text-center"
        onClick={() => setDrawerOpen(!drawerOpen)}
      />
      <Dropdown />
    </nav>
  );
}

export default NavBar;
