import { Button, Dialog, DialogActions, DialogContent, DialogTitle,TextField } from '@material-ui/core'
import { CancelOutlined, CancelSharp } from '@material-ui/icons'
import React, { useState, useContext, useEffect } from 'react'
import './todo.scss'
import {GlobalLoadingContext} from '../../Context/GlobalLoadingContext'
import { toast } from 'react-toastify'
import { addTodos, setReminder, updateTodos } from '../../Services/TodoServices'


export default function ReminderDilaog(props) {
    const [todoDetails,setTodoDetails] = useState({
        task: props.task,
        emailId: props.emailId
    })
    const [reminderDate,setReminderDate] = useState("")
    const {setGlobalLoading} = useContext(GlobalLoadingContext)
    useEffect(() => {
        setTodoDetails({
            task: props.task,
            emailId: props.emailId
        })
    },[props.task,props.emailId])
    let SetReminder = async () => {
        setGlobalLoading(true);
        try{
            let reminderResponse = await setReminder(reminderDate,todoDetails);
            if(reminderResponse.status){
                setGlobalLoading(false);
                toast.success(reminderResponse.message)
                props.close()
            }else{
                setGlobalLoading(false);
                toast.error("Unable to Set Reminder")
            }
        }catch(err){
            setGlobalLoading(false);
            toast.error("Unable to Set Reminder")
        }
    }

    return (
        <Dialog open={props.open} fullWidth className="operation-dialog">
            <DialogActions><CancelSharp onClick={() => {setTodoDetails({
                task: props.task,
                emailId: props.emailId,
            }); props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
            <DialogTitle className="dialog-title">{"Set Reminder"}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField 
                        label="Date"
                        focused
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        required
                        type="datetime-local"
                    />
                </form>

                <DialogActions>
                    <Button variant="outlined" onClick={() => {setTodoDetails({
                        task: props.task,
                        emailId: props.emailId,
                    });props.close()}}>Cancel</Button>
                    <Button variant="contained" onClick={SetReminder} disabled={reminderDate===""} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
