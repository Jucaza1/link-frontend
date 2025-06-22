// Lets do an About talking about the backend and a little bit about the frontend and put a card with my contact

import { Card } from "@/components/ui/card";

//
export function About() {
    // wrap the first div ina card with a white background, rounded corners, and shadow
    return (
        <div className="flex flex-row flex-wrap items-start justify-center gap-5 min-h-screen p-4 w-full mx-auto">
            <Card className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <div className="flex items-center justify-center mb-4 gap-3">
                    <h2 className="text-2xl font-bold mb-4">Juan Cano Zamora</h2>
                    <img
                        src="https://avatars.githubusercontent.com/u/159819086?v=4"
                        alt="Juan Cano Zamora"
                        className="rounded-full w-32 h-32 mb-4"
                    />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contact Me</h3>
                <p>If you have any questions or feedback, feel free to reach out!</p>
                <div className="flex flex-col items-start mt-4">
                    <span className="text-gray-600">Juan C. Z.</span>
                    <span className="text-gray-600">Software Engineer</span>
                    <span className="text-gray-600">Based in Madrid</span>
                </div>
                <p className="mt-4 text-gray-600">You can also find me on:</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                    <li>
                        <a href="https://jucaza.pages.dev" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            Personal Website
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Jucaza1" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            GitHub Profile
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/juan-cano-zamora/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                        </a>
                    </li>
                    <li>
                        <a href="mailto:juan01cz@gmail.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            juan01cz@gmail.com
                        </a>
                    </li>
                </ul>

            </Card>
            <Card className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
                <h1 className="text-3xl font-bold mb-4">About This Project</h1>
                <p className="mb-4">
                    This project is a full-stack application built with <span className="font-bold">Node.js + Express + Sqlite</span> and backend and a <span className="font-bold">React</span> app as the frontend both using <span className="font-bold">TypeScript</span>.
                    It showcases how to create a modern web application with a focus on user authentication and data management.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Backend</h2>
                <p className="mb-4">
                    The backend is the core as its the purpose of this project. It provides a RESTful API for the frontend to interact with.
                    It handles user authentication via <span className="font-bold">JWT</span>, data storage, and business logic. Allowing guests users to create temporary links.
                    Everything is containerized using <span className="font-bold">Docker</span> for easy deployment and scalability.
                    <br />
                    Repository: <a href="https://github.com/Jucaza1/link_shortener_ts" className="text-blue-500 hover:underline">Link Shortener Backend</a>
                </p>
                <h2 className="text-2xl font-semibold mb-2">Frontend</h2>
                <p className="mb-4">
                    The frontend is developed using React, leveraging hooks and context for state management.
                    It provides a responsive user interface and communicates with the backend via HTTP calls.
                    <br />
                    Repository: <a href="https://github.com/Jucaza1/link-frontend" className="text-blue-500 hover:underline">Link Shortener Frontend</a>
                </p>
                <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>SQLite</li>
                    <li>JWT for authentication</li>
                    <li>Tailwind CSS for styling</li>
                    <li>TypeScript for type safety</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-2">Features</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>User registration and login</li>
                    <li>Link shortening and management</li>
                    <li>Responsive design for mobile and desktop</li>
                    <li>Guest user functionality</li>
                </ul>
            </Card>
        </div>
    );
}

