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
import axios from 'axios'
import UpdateForm from '../TestComponents/UpdateForm';

const useStyles = makeStyles(theme => ({
    card: {
        width: 800,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: blueGrey[500],
    },
}));

export default function ImageCard(props) {
    // code for menu on individual card
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const deleteCard = async (event) => {
        let button = event.target
        console.log('in function')
        //let postId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id
        let postId = event.target.id
        if (button.value === 'Delete') {
            try {
                let deletePost = `http://localhost:8080/posts/delete/${postId}`
                const { data: { payload } } = await axios.delete(deletePost)
                console.log('deleted')
                props.getAllPhotos()
            } catch (error) {
                console.log(error)
            }
        } 
    }



    const options = [
        <div>
            <UpdateForm postId = {props.postId} getAllPhotos={props.getAllPhotos}/>
            <p id={props.postId} onClick={deleteCard} value='Delete'>Delete</p>
        </div>
        // <p id={props.postId} onClick={handleCardMenu} value='Update'>Update</p>,
    ]

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
                    {props.caption}
                    <br />
                    {/* //sparates each hashtag in arr */}
                    {`#${props.hashtag}`.split(',').join(' #')} 
                </CardContent>
            </form>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card >
    );
}
