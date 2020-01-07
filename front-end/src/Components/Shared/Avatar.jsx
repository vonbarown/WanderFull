import React from 'react'

const UserAvatar = (props) => (
    <div className='userAvatar'>
        <img className='userPic' src={props.pic} alt="ubu" />
        <p>{props.userName}</p>
    </div>
)

export default UserAvatar
