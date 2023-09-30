import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">
          <Link href="/">Shortener</Link>
        </div>

        <a
          href="https://github.com/gbagush"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 flex items-center"
        >
        <Image
          src="/github-mark-white.svg"
          alt="Vercel Logo"
          width={35}
          height={35}
          priority
        />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
