import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navbar /> }>
          <Route index path="/" element={ <Home /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );

};

export default App;