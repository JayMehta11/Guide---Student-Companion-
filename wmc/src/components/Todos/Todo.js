import { Button, Fab, TextField } from '@material-ui/core';
import { AccessAlarmOutlined, AddOutlined, AssignmentTurnedInOutlined, DeleteOutlined, EditOutlined, ExpandLessOutlined, NavigateNextOutlined, SentimentDissatisfiedOutlined } from '@material-ui/icons';
import * as moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext';
import { currentUser } from '../../Services/AuthServices';
import { deleteTodos, getTodos, updateTodos } from '../../Services/TodoServices';
import ConfirmDialog from '../ConfirmDialog';
import OperationDialog from './OperationDialog';
import ReminderDilaog from './ReminderDialog';
import './todo.scss';

export default function Todo() {

    const [todos,setTodos] = useState("loading");
    const [user,setUser] = useState(currentUser.value)
    const [loading,setLoading] = useState(false);
    const [filter,setFilter] = useState("All");
    const [openOperationDialog,setOpenOperationDialog] = useState(false);
    const [openReminderDialog,setOpenReminderDialog] = useState({
        open: false,
        task: false,
        emailId: user.emailId || ""
    });
    const [todoDescriptionOpen,setTodoDescriptionOpen] = useState(-1);
    const [todoUpdateDetails,setTodoUpdateDetails] = useState(false);
    const {setGlobalLoading} = useContext(GlobalLoadingContext)
    const [ConfirmDeleteDialog,setConfirmDeleteDialog] = useState({
        open: false,
        idx: false
    });

    useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))
    
        return () => {
          AuthObservalble.unsubscribe();
        }
      },[])

    let CloseDialog = () => {
        setOpenOperationDialog(false);
        setTodoUpdateDetails(false);
    }
    let CloseReminderDialog = () => {
        setOpenReminderDialog({
            open: false,
            task: false,
            emailId: user.emailId || ""
        })
    }
    let CloseConfirmDeleteDialog = () => {
        setConfirmDeleteDialog({
            open: false,
            idx: false
        })
    }

    let getTableScaling = () => {
        let todo = document.querySelectorAll(".todo-details");
        let todosContainer = document.querySelector(".todos-container");
        let mainContainer = document.querySelector("#main-container")
        if(todo !== undefined && todosContainer!==undefined && todo.length > 0){
            if(mainContainer.offsetWidth < todo[0].offsetWidth){
                for(let i=0;i<todo.length;i++){
                    todo[i].style.transform = `scale(${(mainContainer.offsetWidth / todo[i].offsetWidth) - 0.03})`
                    todo[i].style.transformOrigin = "center center";
                    todosContainer.style.rowGap = "0rem 0rem"
                }
            }
            else{
                for(let i=0;i<todo.length;i++){
                    todo[i].style.transform = `scale(1)`
                    todo[i].style.transformOrigin = "0% 0%"
                    todosContainer.style.rowGap = "0rem 0.8rem"
                }
            }
            
        }
        
    }

    let FetchTodos = async () => {
        setLoading(true);
        try{
            
            let TodosResponse = await getTodos(filter);
            setLoading(false);
            if(TodosResponse.status){
                setTodos(TodosResponse.todos)
            }else{
                setTodos([])
                toast.error("Unable to get Todos") 
            }
        }catch(err){
            setLoading(false);
            toast.error("Unable to get Todos")
        }
        
        
    }

    

    let UpdateTodoItem = (todo) => {
        let updatedList = todos.map(item => 
            {
              if (item._id == todo._id){
                return todo; 
              }
              return item; 
            }); 
            
        setTodos(updatedList);    
    }

    let MarkComplete = async (todo) => {
        setGlobalLoading(true)
        todo = {...todo,done: !todo.done};
        try{
            let UpdateTodoResponse = await updateTodos(todo);
            
            if(UpdateTodoResponse.status){
                toast.success(UpdateTodoResponse.message)
                await UpdateTodoItem(todo);
                setGlobalLoading(false)
            }else{
                toast.error(UpdateTodoResponse.message)
                setGlobalLoading(false)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Update Todo")
        }
    }

    let DeleteTodo =async (idx) => {
        CloseConfirmDeleteDialog()
        setGlobalLoading(true);

        try{
            let DeleteTodoResponse = await deleteTodos(idx);
            
            if(DeleteTodoResponse.status){
                toast.success(DeleteTodoResponse.message)
                await FetchTodos()
                setGlobalLoading(false)
                setTodoDescriptionOpen(-1)
            }else{
                toast.error(DeleteTodoResponse.message)
                setGlobalLoading(false)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Delete Todo")
        }

    }

    useEffect(() => {
        FetchTodos(filter);
    },[filter])

    useEffect(() => {
        getTableScaling();

        window.addEventListener('resize',getTableScaling)

        return () => {
            window.removeEventListener('resize',getTableScaling)
        }
    },[todos])

    let getDate = (seconds) => {
        return moment(new Date(seconds * 1000)).format('DD-MM-YYYY')
    }
    return (
        <>
            <div className="w-100 mt-4 px-lg-5 px-md-4 px-1 d-flex justify-content-between align-items-center">
                <Button variant="contained" onClick={() => setOpenOperationDialog(true)} startIcon={<AddOutlined />} color="primary">Add Todo</Button>
                <TextField 
                    select 
                    SelectProps={{
                        native: true
                    }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value={true}>Completed</option>
                    <option value={false}>Pending</option>
                </TextField>
            </div>
            {todos==="loading" || loading ? <div className="w-100 mt-4 text-center"><PulseLoader size={15} margin={2} color="#36D7B7" /></div> : 
            <>
            {todos.length===0 ? <h4 className={`text-center mt-5 no-data-found`}>No Data Found <SentimentDissatisfiedOutlined /></h4> :
            
            <div className="w-100 mt-4 d-flex flex-column justify-content-between align-items-center todos-container px-lg-5 px-md-4 px-1 mx-auto">
               {todos.map((todo,i) => 
                    <span key={todo._id} className="w-100 todo-details">
                        <div className="w-100 d-flex justify-content-between align-items-center todo py-0">
                            <span><Fab className={"col-1 fab-button " + (todo.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(todo.done ? "completed" :"not_completed")} /></Fab></span>
                            <span className="col-4">{todo.task}</span>
                            <span className="cl-3">{getDate(todo.created_at)}</span>
                            <span className="col-3" className={todo.done ? "completed" :"not_completed"} style={{backgroundColor: "white"}}><li>{todo.done ? "Completed": "Pending"}</li></span>
                            <span className="col-1">{todoDescriptionOpen!==i ? <NavigateNextOutlined onClick={() => setTodoDescriptionOpen(i)} style={{color: "lightgrey",cursor: 'pointer'}} /> : <ExpandLessOutlined onClick={() => setTodoDescriptionOpen(-1)} style={{color: "lightgrey",cursor: 'pointer'}} />}</span>
                        </div>
                        {todoDescriptionOpen===i && <div className="w-100 mt-4 ps-3 todo-description">
                            <h5>Description</h5>
                            <p className="ps-2">{todo.description}</p>
                            <div className="mt-3 mb-3 d-flex align-items-center flex-wrap">
                                <Button variant="contained" onClick={() => MarkComplete(todo)} startIcon={<AssignmentTurnedInOutlined />} className="mark-completed-btn">{todo.done ? "Mark Pending" : "Mark Complted"}</Button>
                                <Button variant="contained" onClick={() => setOpenReminderDialog({
                                    open: true,
                                    task: todo.task,
                                    emailId: user.emailId
                                })} startIcon={<AccessAlarmOutlined />} color="primary">Set Reminder</Button>
                                <Button variant="outlined" onClick={async () => {
                                    await setTodoUpdateDetails(todo);
                                    setOpenOperationDialog(true);
                                }} startIcon={<EditOutlined />}>Edit</Button>
                                <Button variant="contained" onClick={() => {setConfirmDeleteDialog({
                                    open: true,
                                    idx: todo._id
                                })}} startIcon={<DeleteOutlined />} className="delete-btn">Delete</Button>
                            </div>
                        </div>}
                    </span>
               )} 
            </div>
            }</> 
            }
            {openReminderDialog.open && <ReminderDilaog open={openReminderDialog.open} task={openReminderDialog.task} emailId={openReminderDialog.emailId} close={CloseReminderDialog} />}
            <OperationDialog close={CloseDialog} open={openOperationDialog} todo={todoUpdateDetails} updateTodo={UpdateTodoItem} FetchTodos={FetchTodos} />
            <ConfirmDialog open={ConfirmDeleteDialog.open} item={"Course"} close={CloseConfirmDeleteDialog} action={() => DeleteTodo(ConfirmDeleteDialog.idx)} />
        </>
    )
}
