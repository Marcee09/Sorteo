import { ThemeProvider } from './componentes/ThemeContext'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './componentes/Nav';
import Footer from './componentes/Footer';
import PrimerOpcion from './pages/Opcion1'; 
import './App.css';
import ImageSExcel from '../src/assets/sorteoexcel.png'; 
import ImageSInsta from '../src/assets/instagram.webp';
import ImageSAlea from '../src/assets/numalea.avif';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="bannerHome">
                  <h1>SORTEO ALEATORIO</h1>
                  <p>¡Descubre todas las formas de realizar tus sorteos!</p>
                </div>
                <div>
                  <h2 className="TextOpcion">Elije una opción para comenzar</h2>
                </div>
                <div className="cardlinks">
                  <div className="card">
                    <img src={ImageSExcel} alt="Excel" />
                    <Link to="/primer-opcion" className="button-overlay">
                      Crear
                    </Link>
                  </div>
                  <div className="card">
                    <img src={ImageSInsta} alt="Instagram" />
                    <Link to="/primer-opcion" className="button-overlay">
                      Crear
                    </Link>
                  </div>
                  <div className="card">
                    <img src={ImageSAlea} alt="Sorteo Aleatorio" />
                    <Link to="/primer-opcion" className="button-overlay">
                      Crear
                    </Link>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/primer-opcion" element={<PrimerOpcion />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;



