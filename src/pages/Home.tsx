import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Home() {
    return (
        <main className="min-h-screen bg-gray-200">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to LinkEase</h1>
                <p className="text-gray-600 text-lg">
                    Easily shorten and manage your URLs. Sign in or continue as a guest to get started.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Login Card */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Login</h2>
                        <form className="flex flex-col gap-4">
                            <Input type="email" placeholder="Email" required />
                            <Input type="password" placeholder="Password" required />
                            <Button type="submit" className="w-full ">Sign In</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Guest Access Card */}
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Guest Access</h2>
                        <p className="text-gray-600 mb-6">
                            Use the service without an account. Your data won't be saved across sessions.
                        </p>
                        <Button variant="outline" className="w-full bg-lime-200 hover:bg-lime-400">Continue as Guest</Button>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};

export default Home;

