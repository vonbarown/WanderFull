import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blueGrey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import axios from 'axios'
import UpdateForm from '../TestComponents/UpdateForm';
import NumOfLikes from './NumofLikes'

const useStyles = makeStyles(theme => ({
    card: {
        width: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: blueGrey[500],
    },
    // favoriteIcon: {
    //     color: 'red',
    // }
}));


export default function ImageCard(props) {
    // code for menu on individual card
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const deleteCard = async (event) => {
        let button = event.target
        console.log('in function')

        try {
            let deletePost = `http://localhost:8080/posts/delete/${props.postId}`
            const { data: { payload } } = await axios.delete(deletePost)
            console.log('deleted')

            props.feed ? props.getAllPhotos() : props.getUserAlbum()

        } catch (error) {
            console.log(error)
        }

    }

    let pusher = <p id={props.postId} onClick={deleteCard} value='Delete'>Delete</p>
    const options = [
        <UpdateForm postId={props.postId} getAllPhotos={props.getAllPhotos} />
    ]

    options.push(pusher)

    const handleClick = event => {
        let userCardName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id

        //console.log('postId', userCardName);
        if (userCardName === sessionStorage.getItem('user')) {
            setAnchorEl(event.currentTarget)

        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddingLike = async (event) => {
        let userId = sessionStorage.getItem('user_id')
        let postId = event.target.id
        console.log('userid', userId, 'postId', postId)

        try {
            const { data: { payload } } = await axios.post(`http://localhost:8080/likes/add/${Number(postId)}/${userId}`)
            console.log('payload', payload)
            window.location.reload(true);

        } catch (error) {
            console.log(error)
        }
    }

    const classes = useStyles();
    return (

        <Card className={classes.card} id={props.postId}>
            <CardHeader
                avatar={
                    <Avatar src={props.pic} aria-label="card" className={classes.avatar}></Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label="settings"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            keepMounted
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    height: 150
                                },
                            }}
                        >
                            {options.map(option => (
                                <MenuItem key={option} >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>

                }
                title={props.username}
                subheader={props.time_post}
            />
            <CardMedia
                className={classes.media}
                image={props.postPic}
                title="post"
            />
            <form>
                <CardContent>
                    <Typography variant="h6" color="inherit">
                        {props.caption}
                    </Typography>
                    <br />
                    <Typography variant="body1" color="primary">
                        {/* //sparates each hashtag in arr */}
                        {`#${props.hashtag}`.split(',').join(' #')}
                    </Typography>
                </CardContent>
            </form>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites" onClick={handleLike} color="secondary" id={props.postId}>
                        <FavoriteIcon id={props.postId}/>
                    <Typography variant="subtitle1" id={props.postId}>
                    {} likes
                    </Typography>
                </IconButton> */}
                <div className='likeButton'>
                    <button id={props.postId} onClick={handleAddingLike}><img className='heart' id={props.postId} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" /></button>
                    <NumOfLikes
                        postId={props.postId}
                    />
                </div>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card >
    );
}
