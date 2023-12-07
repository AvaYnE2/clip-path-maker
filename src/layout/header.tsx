import React from "react";
import ModeToggle from "@/components/dark-mode-toggle.tsx";

const Header: React.FC = () => {
  return (
    <header className="inset-x-0 top-0 z-50 sticky backdrop-blur dark:backdrop-brightness-90">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home Page</span>
          </a>
        </div>
        <div className="flex gap-x-12">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
