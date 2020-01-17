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

    const handleCardMenu = (option) => {
        if (option === 'Update') {
            // show the input
            console.log('will update')
        } else {
            // let postId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id
            console.log('will delete')
            //call localhost:8080/post/delete/"id"
        }
    }

    const handleClick = event => {
        let userCardName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id

        console.log('postId', event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);


        if (userCardName === sessionStorage.getItem('user')) {
            setAnchorEl(event.currentTarget)
            handleCardMenu('Update')
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        <a href='#'>Update</a>,
        <a href='#'>Delete</a>
    ]


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
                                    height: 100,
                                    width: 200,
                                },
                            }}
                        >
                            {options.map(option => (
                                <MenuItem key={option}>
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
                    {`#${props.hashtag} `}
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
