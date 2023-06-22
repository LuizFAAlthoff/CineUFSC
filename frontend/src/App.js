import { Route, Routes } from "react-router-dom";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import { useSelector } from "react-redux";

function App() {
  /* Extrai o estado do Redux Store */
  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn",isUserLoggedIn);
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
