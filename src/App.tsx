import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'
import Default from './pages/Default'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
import { Links } from './pages/Links'
import { UserContextProvider } from './context/UserContextProvider'
import { Toaster } from 'react-hot-toast'
import { Profile } from './pages/Profile'

function App() {

    return (
        <>
            <UserContextProvider>
                <BrowserRouter>
                    <div className="w-full min-h-screen flex flex-col bg-gray-100 ">
                        <Navbar />
                        <div className="flex-1/2 max-w-10/12 self-center w-full p-6 bg-white shadow-md mx-auto h-full">
                            <Routes>
                                <Route path="/" Component={Home} />
                                <Route path="/links" Component={Links} />
                                <Route path="/profile" Component={Profile} />
                                <Route path="/default" Component={Default} />
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
