import './App.css';
import MyNav from './components/MyNav';
import MyHome from './components/MyHome';
import MyFooter from './components/MyFooter';
import ChiSiamo from './components/ChiSiamo';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(173, 216, 230, 0.63);
  }

  h2,
  h3{
    color: rgb(35, 35, 150);
  }

  p{
    color: rgb(24, 24, 134)
  }

  .navbar.bg-body-tertiary {
    background-color: rgb(168, 211, 223) !important;
  }

  .navbar-brand,
  .navbar-expand-lg
  .navbar-nav .nav-link,
  .dropdown-item{
    color: rgb(24, 24, 134)
  }

  .navbar-nav .nav-link.active{
    color: rgb(35, 35, 150);
    font-weight: bold;
  }

 `;

function App() {
  return (

    <BrowserRouter>
    <GlobalStyle />
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
