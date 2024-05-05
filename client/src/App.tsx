import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PATHNAMES } from "./utils/constants";
import { ToastContainer } from 'react-toastify';
import { LoginI } from "./interfaces";

import GenericRegister from "./components/genericRegister/genericRegister";
import HomePage from "./pages/home/home";
import NotFound from "./pages/common/notFound";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

  const loginProps: LoginI = {
    name: 'Log in',
    slug: 'login'
  }
  const signUpProps: LoginI = {
    name: 'Sign-up',
    slug: 'signup'
  }

  return (
    <Router>
      <Routes>
        <Route path={PATHNAMES.dashboard} element={<HomePage/>}/>
        <Route path={PATHNAMES.login} element={<GenericRegister data={loginProps} />}/>
        <Route path={PATHNAMES.signUp} element={<GenericRegister data={signUpProps} />}/>

        <Route path='*'  Component={NotFound} />
      </Routes>
      <ToastContainer className="react-toast-container" />
    </Router>

  );
}

export default App;
