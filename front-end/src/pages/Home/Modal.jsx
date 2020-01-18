import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import UploadForm from '../../Components/TestComponents/UploadForm'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        position: 'fixed',
        right: '50px',
        top: '670px',
        height: '60px',
        width: '60px',
        textAlign: "center",
        borderRadius: '50%',
        backgroundColor: '#228B22'
    },
    plus: {
        fontSize: '40px',
        marginTop: '-1px',
    }
}));

export default function UploadModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='modal'>
            <button type="button" onClick={handleOpen} className={classes.button}>
                {
                    <p className={classes.plus}>+</p>
                }
            </button>
            <Modal
                aria-labelledby="Upload post"
                aria-describedby="Upload user post"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <UploadForm />
                </div>
            </Modal>
        </div>
    );
}
