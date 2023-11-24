import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import loadingImage from '../../assets/animation/Infinity-1.8s-200px.svg';

import './LoadingMaster.scss';


function SimpleDialog(props) {
    const { open } = props;

    return (
        <Dialog open={open}>
            <img src={loadingImage} alt="loading..." style={{ opacity: 0.5, width: '60px', height: '60px' }} />
        </Dialog>
    );
}

export default function LoadingMaster(props) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.loadingMaster) {
            handleClickOpen();
        } else {
            handleClose();
        }
    }, [props.loadingMaster]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="loading">
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
