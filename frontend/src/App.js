import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { Provider, useSelector } from "react-redux";
import { store } from "./Redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Modal from "./components/Modal";
import Adminlogin from "./pages/Adminlogin";
import Adminhome from "./pages/Adminhome";
import Adminprotected from "./components/Adminprotected";

function App() {
  const islogedin = useSelector((state) => state.Auth.logedin);
  const admin = useSelector((state)=>state.Admin.Admin)
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route  element={admin ? <Navigate replace to={"/admin/home"} /> : <Adminlogin />} path="/admin"></Route>
            <Route element = {<Adminprotected/>}>
          
          <Route element={<Adminhome/>} path="/admin/home"></Route>

            </Route>
         
            <Route element={<Protected />}>
              <Route element={<Home />} path="/"></Route>
            </Route>

            <Route
              element={islogedin ? <Navigate replace to={"/"} /> : <Register />}
              path="/signup"
            ></Route>
            <Route
              element={islogedin ? <Navigate replace to={"/"} /> : <Login />}
              path="/login"
            ></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
