// Profile page component
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { toast } from 'react-hot-toast';


export function Profile() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        // Clear user data and redirect to home
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <main className="h-full flex flex-col items-center justify-center p-6">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Profile</h1>
                <p className="text-gray-600 text-lg">Manage your account settings.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Profile Card */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                        <div className="flex flex-col gap-4">
                            <Input type="text" value={user?.ID || ''} readOnly placeholder="User ID" />
                            <Input type="text" value={user?.email || ''} readOnly placeholder="Email" />
                            <Input type="text" value={user?.username || ''} readOnly placeholder="Username" />
                            <Input type="text" value={user?.createdAt || ''} readOnly placeholder="Account Created At" />

                        </div>
                    </CardContent>
                </Card>

                {/* Logout Card */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
                        <Button onClick={handleLogout} variant="outline" className="w-full bg-red-200 hover:bg-red-400">
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
