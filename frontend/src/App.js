import { Route, Routes } from "react-router-dom";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./components/Profiles/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./components/Profiles/AdminProfile";

function App() {
  const dispatch = useDispatch();
  /* Extrai o estado do Redux Store */
  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn",isUserLoggedIn);
  useEffect(()=> {
    if(localStorage.getItem("userID")){
      dispatch(userActions.login())

    }else if(localStorage.getItem("adminID")){
      dispatch(adminActions.login())
    }
  },[])
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/movies" element={<Movies/>}/>
            {!isUserLoggedIn && !isAdminLoggedIn && (
              <>
              {" "}
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/auth" element={<Auth/>}/>
              </>
            )}
            {isUserLoggedIn && !isAdminLoggedIn &&(
              <>
              {""}
              <Route path="/user" element={<UserProfile/>}/>
              <Route path="/booking/:id" element={<Booking/>}/>
              </>
            )}

            {isAdminLoggedIn && !isUserLoggedIn &&(
              <>
              {""}
              <Route path="/add" element={<AddMovie/>}/>
              <Route path="/user-admin" element={<AdminProfile/>}/>
              </>
            )}
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
