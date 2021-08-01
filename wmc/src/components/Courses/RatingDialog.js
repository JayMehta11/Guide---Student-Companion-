import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { CancelSharp } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import Rating from '../Rating';
import './course.scss';


export default function RatingDialog(props) {
    const [rating,setRating] = useState(1);
    const commentRef = useRef("")

    const ChangeRating = (newRating) => {
        setRating(parseInt(newRating))
      };
    return (
        <Dialog open={true || props.open} fullWidth className="operation-dialog">
        <DialogActions><CancelSharp onClick={() => {props.close()}} style={{color: "lightgrey",cursor:"pointer"}}  /></DialogActions>
        <DialogTitle className="dialog-title">{"Add Rating"}</DialogTitle>
        <DialogContent>
            <form>
                <div className="d-flex justify-content-center align-items-center">
                <Rating 
                    value={rating}
                    setRating={(rate) => ChangeRating(rate)}
                />
                </div>
                <TextField 
                    label="comment"
                    className="my-2 col-lg-7 col-md-8 col-11"
                    inputRef={commentRef}
                />
            </form>


        <DialogActions>
                <Button variant="outlined" onClick={() => {props.close()}}>Cancel</Button>
                <Button variant="contained" color="primary">Save</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
    )
}
