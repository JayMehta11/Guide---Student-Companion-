import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalLoadingContext } from '../Context/GlobalLoadingContext';
import { currentUser, RegisterService } from '../Services/AuthServices';

export default function Register() {

    const [user,setUser] = useState(currentUser.value);
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const [detailsIsValid,setDetailsIsValid] = useState(false);
    const [userDetails,setUserDetails] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        isAdmin: false,
        password: "",
        enrollmentNumber: "",
        confirmPassword: "",
        programme: "B.Tech"
    })

    useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))

        return () => {
            AuthObservalble.unsubscribe();
        }
    },[])
    
    useEffect(() => {
        let isValid = true;
        Object.keys(userDetails).map(key => {
            if(key!=="isAdmin" && userDetails[key]===""){
                isValid=false;
            }
        })
        if(userDetails.confirmPassword !== userDetails.password){
            isValid=false;
        }
        setDetailsIsValid(isValid);
    }, [userDetails])

    useEffect(() => {
        if(user!==null){
            window.location = "/";
        }
    },[])

    let HandleRegister =async (e) => {
        e.preventDefault();

        setGlobalLoading(true);
        let RegsitrationResponse = await RegisterService(userDetails);
        setGlobalLoading(false);
        if(RegsitrationResponse.status){
            
            toast.success(RegsitrationResponse.message);
            window.location = "/login"
        }
        else{
            toast.error(RegsitrationResponse.message)
        }
    }

    return (
        <>
        {user===null && <div className="d-flex justify-content-center align-items-center register-page">
            <form onSubmit={(e) => HandleRegister(e)} className="col-lg-5 col-md-5 col-11 px-lg-5 px-md-4 px-2 mt-5 shadow py-5" >
                
            <div className="text-center"><img className="mx-auto" height={150} src="guide.png"></img></div>
            <h1 className="text-center py-2" color="secondary">Regsiter</h1>
                <TextField
                    label= "First Name" 
                    required
                    type = "text"
                    className = "mx-3 mt-3 mb-3 col-10"
                    value={userDetails.firstName}
                    onChange={(e) => setUserDetails({...userDetails,firstName: e.target.value})}
                />
                <TextField
                    label= "Last Name" 
                    required
                    type = "text"
                    className = "mx-3 mb-3 col-10"
                    value={userDetails.lastName}
                    onChange={(e) => setUserDetails({...userDetails,lastName: e.target.value})}
                />
                <TextField
                    label= "Enrollment Number" 
                    required
                    type = "text"
                    className = "mx-3 mb-3 col-10"
                    value={userDetails.enrollmentNumber}
                    onChange={(e) => setUserDetails({...userDetails,enrollmentNumber: e.target.value})}
                />
                <TextField
                    label= "Programme" 
                    required
                    select
                    SelectProps={{
                        native:true
                    }}
                    className = "mx-3 mb-3 col-10"
                    value={userDetails.programme}
                    onChange={(e) => setUserDetails({...userDetails,programme:e.target.value})}
                >
                    <option value="B.Tech">
                        B.Tech 
                    </option>
                    <option value="BS Hons">
                        Bs Hons 
                    </option>
                    <option value="BA">
                        BA 
                    </option>
                    <option value="B.B.A">
                        B.B.A 
                    </option>
                </TextField>
                <TextField
                    label= "Email" 
                    required
                    type = "email"
                    className = "mx-3 mb-3 col-10"
                    value={userDetails.emailId}
                    onChange={(e) => setUserDetails({...userDetails,emailId: e.target.value})}
                />
                <TextField
                    label= "Password" 
                    required
                    type = "password"
                    className = "mx-3 mb-3 col-10"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails,password: e.target.value})}
                />
                <TextField
                    label= "Confirm Password" 
                    required
                    type = "password"
                    className = "mx-3 mb-5 col-10"
                    value={userDetails.confirmPassword}
                    onChange={(e) => setUserDetails({...userDetails,confirmPassword: e.target.value})}
                />
                
                <div className="d-flex justify-content-center align-items-enter">
                    <Button type = "submit" variant="contained" disabled={!detailsIsValid} className="text-center mx-auto w-50" color="primary">Submit</Button>
                </div>

                <div className="w-100 my-3 divider"></div>

                <p className="text-center">Already have account? <Link to="/login">Login</Link></p>
                
            </form>
        </div> }
        </>
    )
}
