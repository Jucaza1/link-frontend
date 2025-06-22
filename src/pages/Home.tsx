import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
import waving from "@/assets/waving.svg"

function Home() {
    const [isRegistering, setIsRegistering] = useState(false);
    const { isLoggedIn } = useContext(UserContext);
    function handleRegister(event: React.FormEvent) {
        event.preventDefault();
        // Handle registration logic here
        console.log("Registering user...");
        toast.success("Registration successful!");
        setIsRegistering(false);
        // After successful registration, you might want to redirect or update state
    }
    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        // Handle login logic here
        console.log("Logging in user...");
        toast.success("Login successful!");
        // After successful login, you might want to redirect or update state
    }
    return (
        <main className="h-full flex flex-col items-center justify-center p-6">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to LinkEase</h1>
                <p className="text-gray-600 text-lg">
                    Easily shorten and manage your URLs. Sign in or continue as a guest to get started.
                </p>
            </section>
            {!isLoggedIn ? (
                <section className="text-center mb-12">
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">You are logged in!</h2>
                            <p className="text-gray-600 text-lg">Welcome back! You can now manage your links.</p>
                            <img src={waving} alt="Waving Hand" className="size-40 mt-6 mx-auto animate-bounce" />
                            <Button variant="outline" asChild className="mt-4 bg-lime-200 hover:bg-lime-400">
                                <Link to="/links" className="size-full p-0 m-0 cursor-pointer z-10">
                                    Go to Links
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            ) : (

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Register Card | or | Login Card */}
                    {isRegistering ? (
                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                                <form className="flex flex-col gap-4">
                                    <Input type="username" placeholder="username" required />
                                    <Input type="email" placeholder="Email" required />
                                    <Input type="password" placeholder="Password" required />
                                    <Button type="submit" className="w-full" onClick={handleRegister}>Register</Button>
                                </form>
                                <p className="text-sm text-gray-500 mt-4">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setIsRegistering(false)}
                                        className="text-blue-500 cursor-pointer hover:underline"
                                    >
                                        Log in here
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                                <form className="flex flex-col gap-4">
                                    <Input type="email" placeholder="Email" required />
                                    <Input type="password" placeholder="Password" required />
                                    <Button type="submit" onClick={handleLogin} className="w-full ">Log In</Button>
                                </form>
                                <p className="text-sm text-gray-500 mt-4">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => setIsRegistering(true)}
                                        className="text-blue-500 cursor-pointer hover:underline"
                                    >
                                        Register here
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Guest Access Card */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Guest Access</h2>
                            <p className="text-gray-600 mb-6">
                                Use the service without an account. Your data won't be saved across sessions.
                            </p>
                            <Button variant="outline" asChild className="w-full bg-lime-200 hover:bg-lime-400">
                                <Link to="/links" className="size-full p-0 m-0 cursor-pointer z-10">
                                    Continue as Guest
                                </Link>
                            </Button>

                        </CardContent>
                    </Card>
                </section>
            )}
        </main>
    );
};

export default Home;

