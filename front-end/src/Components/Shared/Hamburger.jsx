import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
// import Axios from 'axios';
import '../../styles/Hamburger.css'

const ITEM_HEIGHT = 48;

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    iconBtn: {
        color: 'white',
        marginTop: 15,
        size: 300
    }
});

const Hamburger = (props) => {
    const classes = useStyles()

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = '/'
        // this.props.history.push('/asdf')
    }

    let options = [
        <a href='/home'>Home</a>,
        <a href='/feed'>Feed</a>,
        <a href='/profile'>Profile</a>,
        <a href='/settings'>Settings</a>,
    ];

    props.home
        ? options = [...options]
        : options = [
            ...options,
            <input type='text' onChange={props.handleInput} placeholder="Search #'s" ></input>,
            <button onClick={handleLogout}>Logout</button>
        ];


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleKeyPress = (event) => {
        const { input } = props
        if (event.key === 'Enter') {
            if (input[0] === '#') {
                let tagInput = input.substr(1)
                props.searchHashtag(tagInput)
            }
            else {
                props.searchUser()
            }

        }
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="primary"
                className={classes.iconBtn}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option} selected={option === 'Search'} onKeyPress={handleKeyPress}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}


export default Hamburger
