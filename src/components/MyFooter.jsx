import 'bootstrap/dist/css/bootstrap.min.css';

const MyFooter = () => (
    <footer className="d-flex bg-dark mt-5 fixed-bottom">
      <span className="text-white m-auto p-2">
        Meteo <strong>EPICODE</strong> - Copyright {new Date().getFullYear()}
      </span>
    </footer>
  )
  
  export default MyFooter