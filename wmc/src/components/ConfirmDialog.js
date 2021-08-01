import { Dialog, DialogTitle,Fab, DialogContent, DialogActions, Button } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

export default function ConfirmDialog(props){
    return (
        <Dialog open={props.open || false} onClose={props.close} fullWidth className="confirm-dialog">
            <DialogTitle>
                <div className="d-flex align-items-center confirm-dialog-title">
                    <Fab className="confirm-dialog-title-icon">
                        <DeleteOutlined />
                    </Fab>
                    {`Delete the ${props.item} ?`}
                </div>
            </DialogTitle>

            <DialogContent className="confirm-content">
                {`If you delete, the ${props.item} will be gone forever . Are you sure want to proceed?`}
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={() => props.close()}>Cancel</Button>
                <Button variant="contained" color="secondary" onClick={props.action}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}