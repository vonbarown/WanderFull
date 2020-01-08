import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Home } from '../../pages/Home'
import { Profile } from '../../pages/Profile'
import { Settings } from '../../pages/Settings'
// import '../../styles/Hamburger.css'


const options = [
    <a href = '/home'>Home</a>,
    <a href = '/profile'>Profile</a>,
    <a href = '/settings'>Settings</a>,
    <a href ='/search'>Search</a>
];

const ITEM_HEIGHT = 48;

const Hamburger = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget)

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
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
                    <MenuItem key={option} selected={option === 'Search'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}


export default Hamburger