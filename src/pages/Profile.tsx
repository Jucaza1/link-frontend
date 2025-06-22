// Profile page component
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { toast } from 'react-hot-toast';
import { API_URL } from "@/config";
import { User_DTO } from "@/types/state";
import { dateToHumanReadable, purgeLocalStorage } from "@/util/helpers";


export function Profile() {
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('You must be logged in to view your profile.')
            return
        }
        async function fetchUserProfile() {
            // Simulate fetching user profile data
            try {
                const userID = localStorage.getItem('userID')
                if (!userID) {
                    throw new Error('User ID not found in localStorage')
                }
                const response = await fetch(`${API_URL}/users/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-authorization': `${localStorage.getItem('x-authorization')}`
                    }
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile')
                }

                const userData = await response.json() as User_DTO
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            } catch (error) {
                console.error("Error fetching user profile:", error)
                toast.error('Failed to load user profile.')
            }
        }
        fetchUserProfile()
        console.log("User context:", user)
    }, [isLoggedIn])

    const handleLogout = () => {
        // Clear user data and redirect to home
        setUser(null)
        purgeLocalStorage()
        setIsLoggedIn(false)
        toast.success('Logged out successfully')
    }

    return (
        <main className="h-full flex flex-col items-center justify-center pt-10">
            <section className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <p className="text-gray-600 text-lg">Manage your account settings.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Profile Card */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                        <div className="flex flex-col gap-4">
                            {/*let not use input and use key - value instead*/}
                            <div className="flex flex-col gap-2 justify-between w-full">
                                <div className="flex gap-4 bg-gray-100 rounded-lg shadow-sm">
                                    <span className="font-medium p-2 min-w-[26%] text-gray-500 bg-lime-100">UserID:</span>
                                    <span className="self-center py-2 flex-1">{user?.ID || 'N/A'}</span>
                                </div>
                                <div className="flex gap-4 bg-gray-100 rounded-lg shadow-sm">
                                    <span className="font-medium p-2 min-w-[26%] text-gray-500 bg-lime-100">Username:</span>
                                    <span className="self-center py-2 flex-1">{user?.username || 'N/A'}</span>
                                </div>
                                <div className="flex gap-4 bg-gray-100 rounded-lg shadow-sm">
                                    <span className="font-medium p-2 min-w-[26%] text-gray-500 bg-lime-100">Email:</span>
                                    <span className="self-center py-2 flex-1">{user?.email || 'N/A'}</span>
                                </div>
                                <div className="flex gap-4 bg-gray-100 rounded-lg shadow-sm">
                                    <span className="font-medium p-2 min-w-[26%] text-gray-500 bg-lime-100">Created At:</span>
                                    <span className="self-center py-2 flex-1 ">{user?.createdAt ? dateToHumanReadable(user.createdAt) : "unknown"}</span>
                                </div>

                            </div>


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
