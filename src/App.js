import './App.css';
import MyNav from './components/MyNav';
import MyHome from './components/MyHome';
import MyFooter from './components/MyFooter';
import ChiSiamo from './components/ChiSiamo';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="/chisiamo" element={<ChiSiamo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>

  );
}

export default App;
