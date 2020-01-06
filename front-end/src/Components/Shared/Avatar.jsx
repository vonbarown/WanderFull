import React from 'react'
import { Avatar } from '@material-ui/core';

const UserAvatar = (props) => {
    return (<div className='userAvatar'>
        <Avatar alt='user' src={props.userAvatar} className={props.class_name} />
        <p>{props.userName}</p>
    </div>)
}
export default UserAvatar