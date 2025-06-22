import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
import { Links } from './pages/Links'
import { UserContextProvider } from './context/UserContextProvider'
import { Toaster } from 'react-hot-toast'
import { Profile } from './pages/Profile'
import { About } from './pages/About'

function App() {

    return (
        <>
            <UserContextProvider>
                <BrowserRouter>
                    <div className="w-full min-h-screen flex flex-col bg-gray-100 ">
                        <Navbar />
                        <div className="flex-1/2 max-w-10/12 self-center w-full bg-white shadow-md mx-auto h-full">
                            <Routes>
                                <Route path="/" Component={Home} />
                                <Route path="/links" Component={Links} />
                                <Route path="/profile" Component={Profile} />
                                <Route path="/about" Component={About} />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </UserContextProvider>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}

export default App
