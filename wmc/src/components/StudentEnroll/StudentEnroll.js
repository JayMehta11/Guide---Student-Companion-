import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { AddOutlined, FirstPageOutlined, LastPageOutlined, NavigateBeforeOutlined, NavigateNextOutlined, SearchOutlined, SentimentDissatisfiedOutlined } from '@material-ui/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

import { toast } from 'react-toastify'
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext'

import { currentUser } from '../../Services/AuthServices'
import { getCourse } from '../../Services/CourseServices'
import { getUsers } from '../../Services/UserServices'
import Operation from './Operation'
import RegisterStudent from './RegisterStudent'
import './student.scss'


export default function StudentEnroll() {

    const [students,setStudents] = useState("loading");
    const [loading,setLoading] = useState(false);
    
    const [openOperationDialog,setOpenOperationDialog] = useState(false);
    const [openRegisterStudentDialog,setOpenRegisterStudentDialog] = useState(false);
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const selectAllResf = useRef("");
    const [user,setUser] = useState(currentUser.value)
    const selectRef = useRef([])
    const [page,setPage] = useState(0);
    const [courses,setcourses] = useState([]);
    const searchTerm = useRef("")
    const [dataToshow,setDataToShow] = useState([]);
    
    useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))
    
        return () => {
          AuthObservalble.unsubscribe();
        }
      },[])
    let Days = [
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ]

    let CloseDialog = () => {
        setOpenOperationDialog(false);
    }
    let CloseRegisterStudentDialog = () => {
        setOpenRegisterStudentDialog(false);
    }

    let getTableScaling = () => {
        let student = document.querySelectorAll(".student-details");
        let studentsContainer = document.querySelector(".student-container");
        let mainContainer = document.querySelector("#main-container")
        if(student !== undefined && studentsContainer!==undefined && student.length > 0){
            if(mainContainer.offsetWidth < student[0].offsetWidth){
                for(let i=0;i<student.length;i++){
                    student[i].style.transform = `scale(${(mainContainer.offsetWidth / student[i].offsetWidth) - 0.03})`
                    student[i].style.transformOrigin = "center 0%";
                }
            }
            else{
                for(let i=0;i<student.length;i++){
                    student[i].style.transform = `scale(1)`
                    student[i].style.transformOrigin = "0% 0%"
                    studentsContainer.style.rowGap = "0rem 0.8rem"
                }
            }
            
        }
        
    }
    let FetchCourses = async () => {
            getCourse().then(CourseResponse => {
                if(CourseResponse.status){
                    setcourses(CourseResponse.courses)
                }else{
                    setcourses([])
                    toast.error("Unable to get Courses") 
                }
            }).catch(err => {
                toast.error("Unable to get Courses")
            })
        
        
    }
    let FetchStudents = async () => {
        setLoading(true);
        try{
            
            let StudentResponse = await getUsers(searchTerm.current.value);
            setLoading(false);
            console.log(StudentResponse)
            if(StudentResponse.status){
                setStudents(StudentResponse.students)
            }else{
                setStudents([])
                toast.error("Unable to get Students") 
            }
        }catch(err){
            setLoading(false);
            console.log(err)
            toast.error("Unable to get Students")
        }
        
        
    }

    let ChangeSelect = (e,i) => {
        let dp = students;
        dp[i] = {...dp[i],checked: e.target.checked};
        console.log(dp[i])
        setStudents(dp);
    }

    let HandleSelectAll = () => {
        for(let i=0;i<selectRef.current.length;i++){
            selectRef.current[i].checked = selectAllResf.current.checked;
        }
    }
     
    useEffect(() => {
        FetchCourses();
        FetchStudents();
    },[])

    useEffect(() => {
        getTableScaling();

        window.addEventListener('resize',getTableScaling)

        return () => {
            window.removeEventListener('resize',getTableScaling)
        }
    },[students])

    
    console.log("Select",students)
    return (
        <>
            <div className="w-100 mt-4 px-lg-5 px-md-4 px-1 d-flex flex-wrap justify-content-between align-items-center">
                <Button variant="contained" 
                onClick={() => setOpenRegisterStudentDialog(true)}
                 startIcon={<AddOutlined />} color="primary">Add Student</Button>
                <TextField 
                    inputRef={searchTerm}
                    label="Search"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment><SearchOutlined style={{cursor: 'pointer'}} onClick={() => FetchStudents()} /></InputAdornment>
                        )
                    }}
                />
            </div>
            {students==="loading" || loading ? <div className="w-100 mt-4 text-center"><PulseLoader size={15} margin={2} color="#36D7B7" /></div> : 
            <>
            {students.length===0 ? <h4 className={`text-center mt-5 no-data-found`}>No Data Found <SentimentDissatisfiedOutlined /></h4> :
            <div className="w-100 my-4 d-flex flex-column justify-content-between align-items-center student-container px-lg-5 px-md-4 px-1 mx-auto">
                <div className="w-100 d-flex  align-items-center py-0 header">
                    {/* <span><Fab className={"col-1 fab-button " + (course.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(course.done ? "completed" :"not_completed")} /></Fab></span> */}
                    <span className="col-1 text-center"><input ref={selectAllResf} type="checkbox" onChange={(e) => HandleSelectAll()} style={{color: '#0d6efd'}} /></span>
                    <span className="col-3 text-center">{"Id"}</span>
                    <span className="col-3 text-center" style={{textAlign: "right"}}>{"Name"}</span>
                    <span className="col-4 text-center">{"Email-id"}</span>
                    <span className="col-1 text-center">{"Programme"}</span>
                </div>
                {students.map((student,i) => 
                    
                    
                    <span key={student._id} className={"w-100 student-details "+(!((i>=(10*page)) && i<(Math.min(10*(page+1),students.length))) ? "hindrence" : "")}>
                        <div className="w-100 d-flex  align-items-center student py-0">
                            <span className="col-1 text-center">{<input type="checkbox" ref={el => selectRef.current[i]=el} />}</span>
                            <span className="col-3 text-center">{student.enrollmentNumber}</span>
                            <span className="col-3 text-center">{student.firstName}</span>
                            <span className="col-4 text-center" >{student.emailId}</span>
                            <span className="col-1 text-center" >{student.programme}</span>
                        </div>
                    </span>
                )}    
                <div className="w-100 d-flex justify-content-between align-items-center py-0 mx-2">
                    <Button variant="contained" onClick={async () => {
                        setOpenOperationDialog(true)
                        }} color="secondary">Action</Button>

                    <div className="d-flex align-items-center"><IconButton size="small" disabled={page===0} onClick={() => setPage(0)}><FirstPageOutlined /></IconButton>
                    <IconButton size="small" disabled={page===0} onClick={() => setPage(prev => prev - 1)}><NavigateBeforeOutlined /></IconButton>
                    <IconButton size="small" disabled={page===(Math.ceil((students.length)/10) - 1)} onClick={() => setPage(prev => prev + 1)}><NavigateNextOutlined /></IconButton>
                    <IconButton className="me-2" size="small" disabled={page===(Math.ceil((students.length)/10) - 1)} onClick={() => setPage((Math.ceil((students.length)/10) - 1))}><LastPageOutlined /></IconButton>
                    {`${page+1} of ${Math.ceil((students.length)/10)} page`}
                    </div>
                </div>

            </div>
            
            }
            
            </>
            }
            {openRegisterStudentDialog && <RegisterStudent FetchStudents={FetchStudents} open={openRegisterStudentDialog} close={CloseRegisterStudentDialog} />}
            {openOperationDialog && <Operation open={openOperationDialog} students={students} select={selectRef} courses={courses} close={CloseDialog} />}
            {/* <ConfirmDialog open={ConfirmDeleteDialog.open} item={"Course"} close={CloseConfirmDeleteDialog} action={() => DeleteCourse(ConfirmDeleteDialog.idx)} /> */}
        </>
    )
}
