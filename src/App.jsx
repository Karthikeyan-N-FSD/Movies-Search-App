import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
import NavBar from './NavBar';
import { MovieProvider } from './MovieContext';

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-200 p-3">
          <NavBar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
