// lets create a Navbar component
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


export function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-gray-900">LinkEase</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className={cn("text-gray-700 hover:text-gray-900")}>Home</Link>
                        <Link to="/default" className={cn("text-gray-700 hover:text-gray-900")}>Default</Link>
                        <Button variant="outline" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
