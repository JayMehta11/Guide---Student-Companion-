import { Star, StarOutlineOutlined } from '@material-ui/icons'
import React from 'react'

export default function Rating(props) {
    return (
        <span className="d-flex align-items-center">
            <span className="me-1"  onMouseOver={() => {
                if(props.readonly){
                    return;
                }else{
                    props.setRating(parseInt(1));
                }
            }}>{(parseInt(props.value) >= 1) ? <Star style={{color: "#ffff00"}} /> : <StarOutlineOutlined style={{color: "#ffff00"}} />}</span>
            <span className="me-1"  onMouseOver={() => {
                if(props.readonly){
                    return;
                }else{
                    props.setRating(parseInt(2));
                }
            }}>{(parseInt(props.value) >= 2) ? <Star style={{color: "#ffff00"}} /> : <StarOutlineOutlined style={{color: "#ffff00"}} />}</span>
            <span className="me-1"  onMouseOver={() => {
                if(props.readonly){
                    return;
                }else{
                    props.setRating(3);
                }
            }}>{(parseInt(props.value) >= 3) ? <Star style={{color: "#ffff00"}} /> : <StarOutlineOutlined style={{color: "#ffff00"}} />}</span>
            <span className="me-1"  onMouseOver={() => {
                if(props.readonly){
                    return;
                }else{
                    props.setRating(4);
                }
            }}>{(parseInt(props.value) >= 4) ? <Star style={{color: "#ffff00"}} /> : <StarOutlineOutlined style={{color: "#ffff00"}} />}</span>
            <span className="me-1"  onMouseOver={() => {
                if(props.readonly){
                    return;
                }else{
                    props.setRating(5);
                }
            }}>{(parseInt(props.value) >= 5) ? <Star style={{color: "#ffff00"}} /> : <StarOutlineOutlined style={{color: "#ffff00"}} />}</span>
        </span>
    )
}
