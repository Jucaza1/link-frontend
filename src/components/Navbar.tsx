// lets create a Navbar component
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { purgeLocalStorage } from '@/util/helpers';


export function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault()
        purgeLocalStorage()
        setIsLoggedIn(false)
        window.location.href = '/'
    }
    return (
        <nav className="bg-white drop-shadow-lg pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 gap-8 items-center">
                    <div className="flex items-center">
                        {/* Logo or Brand Name , with animation on the lowdash*/}
                        <Link to="/" className="text-3xl font-bold text-gray-900">LinkShare<span className="font-extrabold text-5xl text-lime-500 animate-caret-blink">_</span></Link>
                    </div>
                    <div className="flex items-center space-x-4 gap-3">
                        {/* underline where the user is currently at */}
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? "px-2 border-b-2 border-lime-500 text-gray-700 hover:text-gray-900"
                                    : "px-2 text-gray-700 hover:text-gray-900"
                            }
                        >Home</NavLink>
                        <NavLink to="/links"
                            className={({ isActive }) =>
                                isActive ? "px-2 border-b-2 border-lime-500 text-gray-700 hover:text-gray-900"
                                    : "px-2 text-gray-700 hover:text-gray-900"
                            }
                        >Links</NavLink>
                        <NavLink to="/profile"
                            className={({ isActive }) =>
                                isActive ? "px-2 border-b-2 border-lime-500 text-gray-700 hover:text-gray-900"
                                    : "px-2 text-gray-700 hover:text-gray-900"
                            }
                        >Profile</NavLink>
                        <NavLink to="/about"
                            className={({ isActive }) =>
                                isActive ? "px-2 border-b-2 border-lime-500 text-gray-700 hover:text-gray-900"
                                    : "px-2 text-gray-700 hover:text-gray-900"
                            }
                        >About</NavLink>
                        <Button variant="outline" asChild>
                            {isLoggedIn ? (
                                <Link onClick={handleLogout} to="/" className="bg-red-300">Log out</Link>
                            ) : (
                                <Link to="/">Log in</Link>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
