import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalLoadingContext } from '../Context/GlobalLoadingContext';
import { currentUser, LoginService } from '../Services/AuthServices';

export default function Login() {
    
    const [user,setUser] = useState(currentUser.value);
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const [userDetails,setUserDetails] = useState({
        emailId: "",
        password: ""
    })

    useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))

        return () => {
            AuthObservalble.unsubscribe();
        }
    },[])

    useEffect(() => {
        if(user!==null){
            window.location = "/";
        }
    },[])

    let HandleLogin =async (e) => {
        e.preventDefault();

        setGlobalLoading(true);
        let LoginResponse = await LoginService(userDetails);
        setGlobalLoading(false);
        if(LoginResponse.status){
            
            toast.success(LoginResponse.message);
            window.location = "/"
        }
        else{
            toast.error(LoginResponse.message)
        }
    }

    return (
        <>
        {user===null && <div className="d-flex justify-content-center align-items-center login-page py-4">
            <form onSubmit={(e) => HandleLogin(e)} className="col-lg-5 col-md-5 col-11 px-lg-5 px-md-4 px-2 shadow py-5 mb-5" >
                <div className="text-center"><img className="mx-auto" height={150} src="guide.png"></img></div>
                <h1 className="text-center py-2">Login</h1>
                <TextField
                    label= "Email" 
                    required
                    type = "email"
                    className = "mx-3 mt-3 mb-3 col-10"
                    value={userDetails.emailId}
                    onChange={(e) => setUserDetails({...userDetails,emailId: e.target.value})}
                />
                <TextField
                    label= "Password" 
                    required
                    type = "password"
                    className = "mx-3 mb-5 col-10"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails,password: e.target.value})}
                />
                <div className="d-flex justify-content-center align-items-enter">
                    <Button type = "submit" variant="contained" disabled={userDetails.emailId==="" || userDetails.password===""} className="text-center mx-auto w-50" color="primary">Submit</Button>
                </div>

                <div className="w-100 my-3 divider"></div>

                <p className="text-center">Create account <Link to="/register">Register</Link></p>
                
            </form>
        </div> }
        </>
    )
}
