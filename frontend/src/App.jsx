import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <AppRouter />
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
