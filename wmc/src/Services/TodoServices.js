async function getTodos(filter){

    let formData = new FormData();

    formData.append('filter',filter)
    return fetch('https://student-companion-backend.herokuapp.com/api/todo/get',{
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("StudentToken"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filter: filter
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to fetch Todos"
        }
    })
}
async function addTodos(todoDetails){
    return fetch('https://student-companion-backend.herokuapp.com/api/todo/add',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("StudentToken")
        },
        body: JSON.stringify({
            task: todoDetails.task,
            description: todoDetails.description
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Add Todo"
        }
    })
}
async function updateTodos(todoDetails){
    return fetch('https://student-companion-backend.herokuapp.com/api/todo/update',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("StudentToken")
        },
        body: JSON.stringify({
            _id: todoDetails._id,
            task: todoDetails.task,
            description: todoDetails.description,
            done: todoDetails.done
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Update Todo"
        }
    })
}
async function deleteTodos(idx){
    return fetch('https://student-companion-backend.herokuapp.com/api/todo/delete',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("StudentToken")
        },
        body: JSON.stringify({
            _id: idx
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Delete Todo"
        }
    })
}

async function setReminder(schedule,data){
    let d = new Date(schedule)
    return fetch('https://student-companion-backend.herokuapp.com/api/todo/reminder',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            schedule: `${d.getSeconds()} ${d.getMinutes()} ${d.getHours()} ${d.getDate()} ${d.getMonth() + 1} ${d.getDay()}`,
            emailId: data.emailId,
            task: data.task
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Enroll Students"
        }
    })
}



export {getTodos, addTodos, updateTodos, deleteTodos,setReminder}