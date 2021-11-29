import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route path='/' exact >
          <Home />
       </Route>
    </Switch>
    </>
  );
}

export default App;
