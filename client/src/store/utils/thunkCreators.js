import axios from 'axios';
import socket from '../../socket';
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
} from '../conversations';
import { gotUser, setFetchingStatus } from '../user';

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_ACCOUNT_NAME = process.env.REACT_APP_CLOUDINARY_ACCOUNT_NAME;

const axiosInternal = axios.create();
const axiosCloudinary = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_ACCOUNT_NAME}`,
});

axiosInternal.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async dispatch => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axiosInternal.get('/auth/user');
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit('go-online', data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = credentials => async dispatch => {
  try {
    const { data } = await axiosInternal.post('/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = credentials => async dispatch => {
  try {
    const { data } = await axiosInternal.post('/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = id => async dispatch => {
  try {
    await axiosInternal.delete('/auth/logout');
    await localStorage.removeItem('messenger-token');
    dispatch(gotUser({}));
    socket.emit('logout', id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async dispatch => {
  try {
    const { data } = await axiosInternal.get('/api/conversations');
    data.forEach(conversation =>
      conversation.messages.sort(
        (message1, message2) =>
          new Date(message1.createdAt) - new Date(message2.createdAt)
      )
    );
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async body => {
  const { data } = await axiosInternal.post('/api/messages', body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit('new-message', {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = body => async dispatch => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = searchTerm => async dispatch => {
  try {
    const { data } = await axiosInternal.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const postImagesToCloudinary = body => dispatch => {
  try {
    let imageUploadPromises = [];
    for (let i = 0; i < body.attachments.length; i++) {
      const formData = new FormData();
      formData.append('file', body.attachments[i]);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', body.conversationId);
      imageUploadPromises.push(axiosCloudinary.post('/image/upload', formData));
    }
    Promise.all(imageUploadPromises).then(responses => {
      let attachments = [];
      responses.forEach(response => {
        const { data } = response;
        attachments.push({ id: data.asset_id, image: data.secure_url });
      });
      dispatch(postMessage({ ...body, attachments }));
    });
  } catch (error) {
    console.error(error);
  }
};
