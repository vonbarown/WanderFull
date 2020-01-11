import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Axios from 'axios';
import '../../styles/Hamburger.css'



const ITEM_HEIGHT = 48;

const Hamburger = (props) => {
    console.log('hamburger props', props)
    const options = [
        <a href='/home'>Home</a>,
        <a href='/profile'>Profile</a>,
        <a href='/settings'>Settings</a>,
        <input type='text' onChange={props.handleInput} ></input>
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
        // if (event.key === 'Enter') {
            if (input[0] === '#') {
                let tagInput = input.substr(1)
                props.searchHashtag(tagInput)
            } 
            else {
                props.searchUser()
                console.log( 'input')
            }

        // }
    }


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
                    <MenuItem key={option} selected={option === 'Search'} onKeyPress={handleKeyPress}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}


export default Hamburger
