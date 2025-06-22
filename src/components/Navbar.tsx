// lets create a Navbar component
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';


export function Navbar() {
    return (
        <nav className="bg-white drop-shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo or Brand Name , with animation on the lowdash*/}
                        <Link to="/" className="text-3xl font-bold text-gray-900">LinkShare<span className="text-lime-500 animate-caret-blink">__</span></Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* underline where the user is currently at */}
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? "border-b-2 border-lime-500 text-gray-700 hover:text-gray-900" : "text-gray-700 hover:text-gray-900"
                            }
                        >Home</NavLink>
                        <NavLink to="/links"
                            className={({ isActive }) =>
                                isActive ? "border-b-2 border-lime-500 text-gray-700 hover:text-gray-900" : "text-gray-700 hover:text-gray-900"
                            }
                        >Links</NavLink>
                        <NavLink to="/profile"
                            className={({ isActive }) =>
                                isActive ? "border-b-2 border-lime-500 text-gray-700 hover:text-gray-900" : "text-gray-700 hover:text-gray-900"
                            }
                        >Profile</NavLink>
                        <Button variant="outline" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
