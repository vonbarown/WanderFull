import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}));

export default function UserAvatars(props) {
    const classes = useStyles();

    return (
        <div className={`${classes.root}, userAvatar`}>
            <Avatar alt="user" src={props.pic} className={classes.large} />
            <p>{props.userName}</p>
        </div>
    );
}



