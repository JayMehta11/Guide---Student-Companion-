async function getUsers(search=""){
    return fetch('https://student-companion-backend.herokuapp.com/api/auth/get',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            search: search
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to get Students"
        }
    })
}

export {getUsers}