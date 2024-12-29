import Routes from "./Routes/Rotas";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div>
          <ToastContainer autoClose={2000} />
          <Routes />
    </div>
  )
  
}

export default App;
