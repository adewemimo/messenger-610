import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'end',
    width: '25rem',
  },
  image: {
    width: '8rem',
    height: '8rem',
    borderRadius: '1rem',
    backgroundSize: 'cover',
  },
}));

const MessageAttachments = ({ attachments, text }) => {
  const classes = useStyles();

  return (
    <ImageList className={classes.root} cols={3} rowHeight={132} gap={0}>
      {attachments.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={image}
            className={classes.image}
            alt={text}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MessageAttachments;
