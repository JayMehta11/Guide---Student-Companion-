import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,TextField } from '@material-ui/core'
import { CancelSharp } from '@material-ui/icons'
import React, { useState, useContext, useEffect, useRef } from 'react'
import './student.scss'
import {GlobalLoadingContext} from '../../Context/GlobalLoadingContext'
import { toast } from 'react-toastify'
import moment from 'moment'
import { enrollStudents } from '../../Services/CourseServices'

export default function Operation(props) {
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const [students,setStudents] = useState([]);
    const [otherData,setOtherData] = useState({
        semester: "Monsoon",
        year: moment().format('YYYY'),
        course: ""
    })

    useEffect(() => {
        let data = []
        console.log(props)
        setStudents([]);
        
            for(let i=0;i<props.students.length;i++){
                if(props.select.current[i].checked){
                    data.push(
                        {
                            student: props.students[i]._id,
                        }
                    )
                }
            }
        
        
        setStudents(data);
    },[])
    let courseMap = new Map();
    let courseData = [];
    for(let i=0;i<props.courses.length;i++){
        courseData.push(
            <option key={props.courses[i]._id} value={props.courses[i].courseCode} />
        )
        courseMap.set(props.courses[i].courseCode,props.courses[i]._id)
    }

    let EnrollStudents = async () => {
        setGlobalLoading(true);

        try{
            let response = await enrollStudents(students,otherData,courseMap);
            if(response.status){
                setGlobalLoading(false)
                toast.success(response.message)
                props.close();
            }else{
                setGlobalLoading(false)
                toast.error("Unable to Enroll Students")
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Enroll Students")
        }
    }

    return (
        <Dialog open={props.open} fullWidth className="operation-dialog">
            <DialogActions><CancelSharp onClick={() => {props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
            <DialogTitle className="dialog-title">{"Enroll Students"}</DialogTitle>
            <DialogContent>
                <form>
                    <h5 className={students.length===0 ? "text-danger" : "text-success"}>{`${students.length} students are selected`}</h5>
                    <TextField 
                        label="Year"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={otherData.year}
                        required
                    /> 
                    <TextField label="Course"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={otherData.course}
                        onChange={(e) => setOtherData({...otherData,course: e.target.value})}
                        required
                        inputProps={{
                            list: "courses"
                        }}
                    />
                    <datalist id="courses">
                        {courseData}
                    </datalist>
                    {/* <Autocomplete
                        value={otherData.course}
                        options={props.courses}
                        getOptionLabel={option => option}
                        style={{ width: 300 }}
                        renderInput={params => (
                        <TextField
                            {...params}
                            label="Course"
                            required

                        />
                        )}
                    /> */}
                    <TextField label="Semester"
                        select
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={otherData.semester}
                        onChange={(e) => setOtherData({...otherData,semester: e.target.value})}
                        required
                        SelectProps={{
                            native: true
                        }} >
                                <option value="Monsoon">Monsoon</option>
                                <option value="Winter">Winter</option>
                                <option value="Summer">Summer</option>
                    </TextField>
                </form>

                <DialogActions>
                    <Button variant="outlined" onClick={() => {props.close()}}>Cancel</Button>
                    <Button variant="contained" disabled={students.length===0} onClick={EnrollStudents} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
