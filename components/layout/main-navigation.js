import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  function logoutHandler() {
    signOut();
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight hover:text-gray-300 transition-colors duration-200"
        >
          Next Auth
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-lg font-medium">
            {!session && !loading && (
              <li>
                <Link
                  href="/auth"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            )}

            {session && (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-gray-300 transition-colors duration-200"
                  >
                    Profile
                  </Link>

                  

                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;

