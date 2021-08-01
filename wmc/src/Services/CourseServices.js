async function addCourse(courseDetails){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/add',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            courseName: courseDetails.courseName,
            courseCode: courseDetails.courseCode,
            credits: courseDetails.credits,
            prerequisites: courseDetails.prerequisites,
            courseDescription: courseDetails.courseDescription,
            faculty: courseDetails.faculty,
            categoryIds: courseDetails.categoryIds,
            schedule: courseDetails.schedule,
            school: courseDetails.school
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Add Course"
        }
    })
}
async function updateCourse(courseDetails){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/update',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            courseName: courseDetails.courseName,
            courseCode: courseDetails.courseCode,
            credits: courseDetails.credits,
            prerequisites: courseDetails.prerequisites,
            courseDescription: courseDetails.courseDescription,
            faculty: courseDetails.faculty,
            categoryIds: courseDetails.categoryIds,
            schedule: courseDetails.schedule,
            school: courseDetails.school
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Update Course"
        }
    })
}
async function addRating(idx,comment,rating){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/addRating',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            _id: idx,
            rating: {
                rating: rating,
                comment: comment || ""
            }
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Add Rating"
        }
    })
}
async function deleteCourse(idx){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/delete',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            _id: idx
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Delete Course"
        }
    })
}
async function getCourse(search=""){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/get',{
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
            message: "Unable to get Course"
        }
    })
}

async function getEnrolledIn(semester="",year=""){
    return fetch('https://student-companion-backend.herokuapp.com/api/course/enrolledIn',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "authorization": localStorage.getItem("StudentToken")
        },
        body: JSON.stringify({
            semester: semester,
            year: year
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to get Course"
        }
    })
}

async function enrollStudents(data,otherData,m){
    let students = [];
    console.log(m)
    data.map(d => {
        console.log(d)
        students.push({
            student: d.student,
            year: parseInt(otherData.year),
            course: m.get(otherData.course),
            semester: otherData.semester
        })
    })

    return fetch('https://student-companion-backend.herokuapp.com/api/course/enrollInCourse',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            students: students
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Enroll Students"
        }
    })

}



export {addCourse, getCourse,updateCourse,deleteCourse,addRating, enrollStudents,getEnrolledIn}