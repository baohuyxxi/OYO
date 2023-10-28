import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import VerificationCode from "../VerificationCode/VerificationCode";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import { t } from "i18next";

export default function SimpleDialog(props) {
  const { onClose, open, title, value } = props;

  const handleClose = () => {
    onClose();
  };
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // Thêm trạng thái mới
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  let dialogContent;
  switch (value) {
    case 1:
      dialogContent = <SignIn handleClose={handleClose} />;
      break;
    case 2:
      dialogContent = <Register email={props.email} handleClose />;
      break;
    default:
      dialogContent = <SignIn props />;
  }
  return (
    <>
      <Paper>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle className="form-dialog">
            {title}
            <Button
              className="closeDialog"
              style={{ position: "absolute", right: "8px", top: "8px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
            {dialogContent}
          </DialogTitle>
        </Dialog>
      </Paper>
    </>
  );
}
