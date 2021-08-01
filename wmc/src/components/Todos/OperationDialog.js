import { Button, Dialog, DialogActions, DialogContent, DialogTitle,TextField } from '@material-ui/core'
import { CancelOutlined, CancelSharp } from '@material-ui/icons'
import React, { useState, useContext, useEffect } from 'react'
import './todo.scss'
import {GlobalLoadingContext} from '../../Context/GlobalLoadingContext'
import { toast } from 'react-toastify'
import { addTodos, updateTodos } from '../../Services/TodoServices'


export default function OperationDialog(props) {
    const [todoDetails,setTodoDetails] = useState(props.todo || {
        task: "",
        description: ""
    })
    const {setGlobalLoading} = useContext(GlobalLoadingContext)

    useEffect(() => {
        setTodoDetails(props.todo || {
            task: "",
            description: ""
        })
    },[props.todo])
    console.log(props,todoDetails)
    let AddTodo = async () => {
        setGlobalLoading(true)
        try{
            let AddTodoResponse = await addTodos(todoDetails);
            setGlobalLoading(false)
            if(AddTodoResponse.status){
                toast.success(AddTodoResponse.message)
                await props.FetchTodos();
                setTodoDetails({
                    task: "",
                    description: ""
                })
                props.close();
            }else{
                toast.error(AddTodoResponse.message)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to add Todo")
        }
    }

    let UpdateTodo = async () => {
        setGlobalLoading(true)
        try{
            let UpdateTodoResponse = await updateTodos(todoDetails);
            setGlobalLoading(false)
            if(UpdateTodoResponse.status){
                toast.success(UpdateTodoResponse.message)
                await props.updateTodo(todoDetails);
                setTodoDetails({
                    task: "",
                    description: ""
                })
                props.close();
            }else{
                toast.error(UpdateTodoResponse.message)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Update Todo")
        }
    }

    return (
        <Dialog open={props.open} fullWidth className="operation-dialog">
            <DialogActions><CancelSharp onClick={() => {setTodoDetails({
                    task: "",
                    description: ""
                }); props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
            <DialogTitle className="dialog-title">{props.todo ? "Update Todo" : "Add Todo"}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField 
                        label="Task Name"
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={todoDetails.task}
                        onChange={(e) => setTodoDetails({...todoDetails,task: e.target.value})}
                        required
                    />
                    <TextField 
                        label="Description"
                        multiline
                        rows={4}
                        className="my-2 col-lg-7 col-md-8 col-11"
                        value={todoDetails.description}
                        onChange={(e) => setTodoDetails({...todoDetails,description: e.target.value})}
                        required
                    />
                </form>

                <DialogActions>
                    <Button variant="outlined" onClick={() => {setTodoDetails({
                    task: "",
                    description: ""
                });props.close()}}>Cancel</Button>
                    <Button variant="contained" onClick={props.todo ?  UpdateTodo : AddTodo} disabled={todoDetails.task==="" || todoDetails.description===""} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
