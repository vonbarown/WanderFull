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
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500
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
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={props.pic} aria-label="card" className={classes.avatar}></Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.username}
                subheader={props.time_post}
            />
            <CardMedia
                className={classes.media}
                image={props.postPic}
                title="post"
            />
            <CardContent>
                {props.caption}
                <br />
                {`#${props.hashtag} `}
            </CardContent>
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
