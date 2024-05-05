import './App.css';
import Jobs from './pages/Jobs';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/store';
import Navbar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
