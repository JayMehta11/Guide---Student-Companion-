import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,TextField } from '@material-ui/core'
import { CancelOutlined, CancelSharp } from '@material-ui/icons'
import React, { useState, useContext, useEffect, useRef } from 'react'
import './course.scss'
import {GlobalLoadingContext} from '../../Context/GlobalLoadingContext'
import { toast } from 'react-toastify'
import { addCourse, updateCourse } from '../../Services/CourseServices'

export default function Operation(props) {

    const [courseDetails,setCourseDetails] = useState(props.course || {
        courseName: "",
        courseCode: "",
        credits: "",
        prerequisites: [],
        courseDescription: "",
        faculty: "",
        categoryIds: [],
        schedule: [],
        school: "Seas"
    })
    const init = {
        courseName: "",
        courseCode: "",
        credits: "",
        prerequisites: [],
        courseDescription: "",
        faculty: "",
        categoryIds: [],
        schedule: [],
        school: "Seas"
    }
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const [dataIsValid,setDataIsValid] = useState(false);
    const prerequisitesRef = useRef("")
    const categoryRef = useRef("")
    const ScheduleDay = useRef("");
    const start = useRef("")
    const end = useRef("")

    let Days = [
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ]

    useEffect(() => {
        setCourseDetails(props.course || init)
    },[props.course])

    useEffect(() => {
        let isValid = true;
        
        Object.keys(courseDetails).map(key => {
            
            if(key!=="prequisites" && key!=="ratings" && (courseDetails[key]==="" || courseDetails[key].length===0)){
                isValid=false;
            }
        })
        setDataIsValid(isValid);
    },[courseDetails])

    let DeletePrerequisites = (pre) => () => {
        let updatedList = [];
        courseDetails.prerequisites.map(pred => {
            if(pred !== pre){
                updatedList.push(pred)
            }
        })

        setCourseDetails({...courseDetails,prerequisites: updatedList})
    }
    let DeleteCategory = (cat) => () => {
        let updatedList = [];
        courseDetails.categoryIds.map(cate => {
            if(cate !== cat){
                updatedList.push(cate)
            }
        })

        setCourseDetails({...courseDetails,categoryIds: updatedList})
    }
    let DeleteDay = (sche) => () => {
        let updatedList = [];
        courseDetails.schedule.map(sched => {
            if(`${sche.day}-${sche.time}` !== `${sched.day}-${sched.time}`){
                updatedList.push(sched)
            }
        })

        setCourseDetails({...courseDetails,schedule: updatedList})
    }

    let AddPrerequisites = () => {
        if(prerequisitesRef.current.value === ""){
            return;
        }
        let updatedList = courseDetails.prerequisites;
        updatedList.push(prerequisitesRef.current.value)

        setCourseDetails({...courseDetails,prerequisites: updatedList})
        prerequisitesRef.current.value = ""
    }
    let AddCategory = () => {
        if(categoryRef.current.value === ""){
            return;
        }
        let updatedList = courseDetails.categoryIds;
        updatedList.push(categoryRef.current.value)

        setCourseDetails({...courseDetails,categoryIds: updatedList})
        categoryRef.current.value = ""
    }
    let AddDay = () => {
        if(ScheduleDay.current.value === "" || start.current.value === "" || end.current.value === ""){
            return;
        }
        let updatedList = courseDetails.schedule;
        updatedList.push({
            day: ScheduleDay.current.value,
            time: `${start.current.value}-${end.current.value}` 
        })

        setCourseDetails({...courseDetails,schedule: updatedList})
        ScheduleDay.current.value = 0
        start.current.value = ""
        end.current.value = ""
    }
    console.log(courseDetails)

    let AddCourse = async () => {
        setGlobalLoading(true);
        try{
            let AddCourseResponse = await addCourse(courseDetails);
            if(AddCourseResponse.status){
                toast.success(AddCourseResponse.message)
                setGlobalLoading(false)
                await props.FetchCourses()
                props.close()
            }else{
                console.log(AddCourseResponse)
                toast.error(AddCourseResponse.message)
                setGlobalLoading(false)
            }
        }catch(err){
            toast.error("Unable to Add Course")
            setGlobalLoading(false)
        }
    }
    let UpdateCourse = async () => {
        setGlobalLoading(true)
        try{
            let UpdateCourseResponse = await updateCourse(courseDetails);
            setGlobalLoading(false)
            if(UpdateCourseResponse.status){
                toast.success(UpdateCourseResponse.message)
                await props.updateCourse(courseDetails);
                setCourseDetails(init)
                props.close();
            }else{
                toast.error(UpdateCourseResponse.message)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Update Course")
        }
    }

    return (
        <Dialog open={props.open} fullWidth className="operation-dialog">
            <DialogActions><CancelSharp onClick={() => {setCourseDetails(init); props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
            <DialogTitle className="dialog-title">{props.course ? "Update Course" : "Add Course"}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField 
                        label="Course Name"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={courseDetails.courseName}
                        onChange={(e) => setCourseDetails({...courseDetails,courseName: e.target.value})}
                        required
                    />
                    <TextField 
                        label="Course Code"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={courseDetails.courseCode}
                        onChange={(e) => setCourseDetails({...courseDetails,courseCode: e.target.value})}
                        required
                    />
                    <TextField 
                        label="Credits"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        type="Number"
                        value={courseDetails.credits}
                        onChange={(e) => setCourseDetails({...courseDetails,credits: e.target.value})}
                        required
                    />
                    <div className="my-2">
                        
                        <div className="d-flex align-items-end">
                            <TextField label="Prerequisites" inputRef={prerequisitesRef} />
                            <Button variant="contained" color="secondary" className="ms-3" onClick={AddPrerequisites} >Add</Button>
                        </div>
                        {courseDetails.prerequisites.map((pre,i) => 
                            <Chip
                                className="my-2"
                                key={i}
                                label={pre}
                                onDelete={DeletePrerequisites(pre)}
                                variant="outlined"
                                color="secondary"
                            />
                        )}
                    </div>
                    <TextField 
                        label="Course Description"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        multiline
                        rows={3}
                        value={courseDetails.courseDescription}
                        onChange={(e) => setCourseDetails({...courseDetails,courseDescription: e.target.value})}
                        required
                    />
                    <TextField 
                        label="Faculty"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={courseDetails.faculty}
                        onChange={(e) => setCourseDetails({...courseDetails,faculty: e.target.value})}
                        required
                    /> 
                    <TextField label="School"
                        select
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={courseDetails.school}
                        onChange={(e) => setCourseDetails({...courseDetails,school: e.target.value})}
                        required
                        SelectProps={{
                            native: true
                        }} >
                                <option value="Seas">SEAS</option>
                                <option value="Amsom">AMSOM</option>
                                <option value="Sas">SAS</option>
                    </TextField>
                    <div className="my-2">
                        
                        <div className="d-flex align-items-end">
                            <TextField label="Category" required inputRef={categoryRef} />
                            <Button variant="contained" color="secondary" className="ms-3" onClick={AddCategory} >Add</Button>
                        </div>
                        {courseDetails.categoryIds.map((cat,i) => 
                            <Chip
                                className="my-2"
                                key={i}
                                label={cat}
                                onDelete={DeleteCategory(cat)}
                                variant="outlined"
                                color="secondary"
                            />
                        )}
                    </div>
                    <div className="my-2">
                        
                        <div className="d-flex mt-4 align-items-end">
                            <TextField label="Day"
                            select
                            className="me-2"
                            SelectProps={{
                                native: true
                            }}
                            inputRef={ScheduleDay} >

                                {Days.map((day,i) => 
                                    <option value={i}>{day}</option>
                                )}
                            </TextField>
                            <TextField label="ST"  focused type="time" className="me-2" inputRef={start} />
                            <TextField label="ET" focused type="time" inputRef={end} />
                            <Button variant="contained" color="secondary" className="ms-3" onClick={AddDay} >Add</Button>
                        </div>
                        {courseDetails.schedule.map((sche,i) => 
                            <Chip
                                className="my-2"
                                key={i}
                                label={`${Days[sche.day]}  ${sche.time}`}
                                onDelete={DeleteDay(sche)}
                                variant="outlined"
                                color="secondary"
                            />
                        )}
                    </div>
                </form>

                <DialogActions>
                    <Button variant="outlined" onClick={() => {setCourseDetails(init);props.close()}}>Cancel</Button>
                    <Button variant="contained" onClick={props.course ? UpdateCourse : AddCourse} disabled={!dataIsValid} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
