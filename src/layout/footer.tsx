import React from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="sticky bg-background bottom-0 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Made with ❤️ by AvaYnE
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a
          className="bg-black p-2 shadow-xl rounded-full"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Github</span>
          <Github />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
