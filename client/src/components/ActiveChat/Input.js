import React, { useRef, useState } from 'react';
import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
  Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  postMessage,
  postImagesToCloudinary,
} from '../../store/utils/thunkCreators';
import { FileCopyTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  messageInput: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
  fileInput: {
    display: 'none',
  },
}));

const Input = props => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const imageInputFile = useRef(null);

  const {
    postMessage,
    postImagesToCloudinary,
    otherUser,
    conversationId,
    user,
  } = props;

  const handleChange = event => {
    setText(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: images,
    };
    images.length > 0
      ? await postImagesToCloudinary(reqBody)
      : await postMessage(reqBody);
    setText('');
    setImages([]);
  };

  const handleImagesSelected = event => {
    const files = event.target.files;
    if (images.length + files.length > 5) {
      alert('You can only upload 5 images at a time');
      return;
    }
    setImages([...images, ...files]);
    inputRef.current.click();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <input
        type="file"
        className={classes.fileInput}
        accept="image/*"
        ref={imageInputFile}
        multiple
        onChange={handleImagesSelected}
      />
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.messageInput }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          ref={inputRef}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => imageInputFile.current.click()}
                edge="end">
                {images.length > 0 ? (
                  <Badge badgeContent={images.length} color="primary">
                    <FileCopyTwoTone color="primary" />
                  </Badge>
                ) : (
                  <FileCopyTwoTone color="primary" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => {
      dispatch(postMessage(message));
    },
    postImagesToCloudinary: message => {
      dispatch(postImagesToCloudinary(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
