import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'
import Default from './pages/Default'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'

function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className="bg-gray-100 min-h-screen max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" Component={Home} />
                        <Route path="/default" Component={Default} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
