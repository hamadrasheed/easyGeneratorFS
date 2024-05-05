import * as React from 'react';
import { PATHNAMES } from '../../utils/constants';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import classes from "./home.module.css";
import Button from '../../components/button/button';

const HomePage = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            navigate(PATHNAMES.login)
        } else {
            toast("Welcome to the application.", {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: false

            })
        }

      }, [localStorage.getItem('token')]);

      const logout = () => {
        localStorage.removeItem('token');
        navigate(PATHNAMES.login)

    };
    
    return (
        <div className={classes.centerText}>

            <h1>
                Home page
            </h1>

            <div>
                <Button
                    fullWidth
                    color='primary'
                    size='large'
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>
            
        </div>
    )
}

export default HomePage;