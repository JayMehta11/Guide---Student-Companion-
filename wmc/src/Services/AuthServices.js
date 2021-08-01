import { BehaviorSubject } from 'rxjs';

let getUser = () => {
    let token = localStorage.getItem("StudentToken") || null;
    if(token === null){
        return null;
    }
    else{
        let payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    }
} 

let currentUser = new BehaviorSubject(getUser());

async function RegisterService(userDetails){
    console.log(process.env.REACT_APP_Backend)
    return fetch("https://student-companion-backend.herokuapp.com/api/auth/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            emailId: userDetails.emailId,
            isAdmin: userDetails.isAdmin,
            enrollmentNumber: userDetails.enrollmentNumber,
            password: userDetails.password,
            programme: userDetails.programme
        })
    }).then(res => res.json()).catch(err => {
        console.log(err)
        return {
            
            status: false,
            message: "Something Went Wrong!"
        }
    })
}
async function LoginService(userDetails){
    console.log(process.env.REACT_APP_Backend)
    return fetch("https://student-companion-backend.herokuapp.com/api/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailId: userDetails.emailId,
            password: userDetails.password
        })
    }).then(res => res.json()).then(data => {
        if(data.status){
            localStorage.setItem("StudentToken",data.token);
            currentUser.next(getUser)
        }

        return data;
    }).catch(err => {
        return {
            status: false,
            message: "Something Went Wrong!"
        }
    })
}


function Logout(){
    console.log("enterd")
    window.localStorage.removeItem("StudentToken");
    currentUser.next(getUser());
}



export {LoginService, RegisterService, Logout, currentUser}