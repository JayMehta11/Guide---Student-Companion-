import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { CancelSharp } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext';
import { RegisterService } from '../../Services/AuthServices';
import './student.scss';

export default function RegisterStudent(props) {

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

    let HandleRegister = async (e) => {
        e.preventDefault();

        setGlobalLoading(true);
        let RegsitrationResponse = await RegisterService(userDetails);
        setGlobalLoading(false);
        if(RegsitrationResponse.status){
            
            toast.success(RegsitrationResponse.message);
            await props.FetchStudents()
            props.close();
        }
        else{
            toast.error(RegsitrationResponse.message)
        }
    }

    return (
        <Dialog open={props.open} fullWidth className="operation-dialog">
            <DialogActions><CancelSharp onClick={() => {props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
            <DialogTitle className="dialog-title">{"Add Student"}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        label= "First Name" 
                        required
                        type = "text"
                        className = "my-2 col-lg-7 col-md-8 col-11"
                        value={userDetails.firstName}
                        onChange={(e) => setUserDetails({...userDetails,firstName: e.target.value})}
                    />
                    <TextField
                        label= "Last Name" 
                        required
                        type = "text"
                        className = "my-2 col-lg-7 col-md-8 col-11"
                        value={userDetails.lastName}
                        onChange={(e) => setUserDetails({...userDetails,lastName: e.target.value})}
                    />
                    <TextField
                        label= "Enrollment Number" 
                        required
                        type = "text"
                        className = "my-2 col-lg-7 col-md-8 col-11"
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
                        className = "my-2 col-lg-7 col-md-8 col-11"
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
                        className = "my-2 col-lg-7 col-md-8 col-11"
                        value={userDetails.emailId}
                        onChange={(e) => setUserDetails({...userDetails,emailId: e.target.value})}
                    />
                    <TextField
                        label= "Password" 
                        required
                        type = "password"
                        className = "my-2 col-lg-7 col-md-8 col-11"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({...userDetails,password: e.target.value})}
                    />
                    <TextField
                        label= "Confirm Password" 
                        required
                        type = "password"
                        className = "my-2 col-lg-7 col-md-8 col-11"
                        value={userDetails.confirmPassword}
                        onChange={(e) => setUserDetails({...userDetails,confirmPassword: e.target.value})}
                    />
                </form>

                <DialogActions>
                    <Button variant="outlined" onClick={() => {props.close()}}>Cancel</Button>
                    <Button variant="contained" disabled={!detailsIsValid} onClick={HandleRegister} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
