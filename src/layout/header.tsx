import React from "react";
import ModeToggle from "@/components/dark-mode-toggle.tsx";

const Header: React.FC = () => {
  return (
    <header className="inset-x-0 top-0 z-50 sticky backdrop-blur dark:backdrop-brightness-90 border-b">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              src="/logo.png"
              alt="logo"
              className=""
              width={64}
              height={64}
            />
            <span className="sr-only">Home Page</span>
          </a>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Clip Path{" "}
            <span className="bg-gradient-to-r from-primary to-blue-700 inline-block text-transparent bg-clip-text">
              {" "}
              Maker
            </span>
          </h1>
        </div>
        <div className="flex gap-x-12">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
