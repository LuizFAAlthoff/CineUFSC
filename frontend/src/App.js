import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/auth" element={<Auth/>}/>
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;