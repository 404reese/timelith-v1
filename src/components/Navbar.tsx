import Link from 'next/link';
import {ModeToggle} from '@/components/theme-toggle';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background rounded-lg border border-gray-200 p-4 m-2">
      <div className="mr-4 ml-4 mx-auto flex justify-between items-center">
        <div className="text-primary text-2xl font-bold">
          TIMELITH
        </div>

        <div className="space-x-4">
          <Link href="/dashboard" className="text-primary hover:text-primary/50">
            Dashboard
          </Link>
          <Link href="/login" className="text-primary hover:text-primary/50">
            Login
          </Link>
          <Link href="/about" className="text-primary hover:text-primary/50">
            About
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


