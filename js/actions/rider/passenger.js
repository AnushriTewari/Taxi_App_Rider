import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import config from '../../../config.js';

export const ADD_PASSENGER_REQUEST = 'ADD_PASSENGER_REQUEST';
export const ADD_PASSENGER_SUCCESS = 'ADD_PASSENGER_SUCCESS';
export const ADD_PASSENGER_FAILED = 'ADD_PASSENGER_FAILED';
export const UPDATE_PASSENGER_REQUEST = 'UPDATE_PASSENGER_REQUEST';
export const UPDATE_PASSENGER_SUCCESS = 'UPDATE_PASSENGER_SUCCESS';
export const UPDATE_PASSENGER_FAILED = 'UPDATE_PASSENGER_FAILED';
export const REMOVE_PASSENGER_REQUEST = 'REMOVE_PASSENGER_REQUEST';
export const REMOVE_PASSENGER_SUCCESS = 'REMOVE_PASSENGER_SUCCESS';
export const REMOVE_PASSENGER_FAILED = 'REMOVE_PASSENGER_FAILED';
export const SET_PASSENGER_IMAGE_REQUEST = 'SET_PASSENGER_IMAGE_REQUEST';
export const SET_PASSENGER_IMAGE_SUCCESS = 'SET_PASSENGER_IMAGE_SUCCESS';

export function addPassengerRequested() {
  return {
    type: ADD_PASSENGER_REQUEST,
  };
}
export function addPassengerSuccess(data) {
  return {
    type: ADD_PASSENGER_SUCCESS,
    payload: data,
  };
}
export function addPassengerFailed(error) {
  return {
    type: ADD_PASSENGER_FAILED,
    payload: error,
  };
}
export function updatePassengerRequested() {
  return {
    type: UPDATE_PASSENGER_REQUEST,
  };
}
export function updatePassengerSuccess(data) {
  return {
    type: UPDATE_PASSENGER_SUCCESS,
    payload: data,
  };
}
export function updatePassengerFailed() {
  return {
    type: UPDATE_PASSENGER_FAILED,
  };
}
export function removePassengerRequested() {
  return {
    type: REMOVE_PASSENGER_REQUEST,
  };
}
export function removePassengerSuccess(data) {
  return {
    type: REMOVE_PASSENGER_SUCCESS,
    payload: data,
  };
}
export function removePassengerFailed(error) {
  return {
    type: REMOVE_PASSENGER_FAILED,
    payload: error,
  };
}
export function setPassengerImageRequested() {
  return {
    type: SET_PASSENGER_IMAGE_REQUEST,
  };
}
export function setPassengerImageSuccess(data) {
  return {
    type: SET_PASSENGER_IMAGE_SUCCESS,
    payload: data,
  };
}

export function addPassenger(passenger, additionalData) {
  return (dispatch, getState) => {
    dispatch(addPassengerRequested());
    fetch(`${config.serverSideUrl}:${config.port}/api/passenger/addPassenger`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getState().rider.appState.jwtAccessToken,
      },
      body: JSON.stringify(passenger),
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(addPassengerSuccess(data));
        Actions.pop();
      })
      .catch(e => {
        dispatch(addPassengerFailed(e));
      });
  };
}
export function updatePassengerDetails(passenger) {
  return (dispatch, getState) => {
    dispatch(updatePassengerRequested());
    fetch(
      `${config.serverSideUrl}:${config.port}/api/passenger/updatePassenger`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getState().rider.appState.jwtAccessToken,
        },
        body: JSON.stringify(passenger),
      },
    )
      .then(resp => resp.json())
      .then(respObj => {
        dispatch(updatePassengerSuccess(respObj));
        Actions.pop();
      })
      .catch(e => {
        dispatch(updatePassengerFailed(e));
      });
  };
}
export function removePassenger(passenger) {
  return (dispatch, getState) => {
    dispatch(removePassengerRequested());
    fetch(
      `${config.serverSideUrl}:${config.port}/api/passenger/removePassenger`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getState().rider.appState.jwtAccessToken,
        },
        body: JSON.stringify(passenger),
      },
    )
      .then(resp => resp.json())
      .then(respObj => {
        dispatch(removePassengerSuccess(respObj));
        Actions.pop();
      })
      .catch(e => {
        dispatch(removePassengerFailed(e));
      });
  };
}

export function updateUserProfilePicAsync(userDetails, type) {
  return (dispatch, getState) => {
    dispatch(setPassengerImageRequested());
    userDetails.jwtAccessToken = getState().rider.appState.jwtAccessToken;
    const imageData = new FormData();
    imageData.append('image', {
      uri: userDetails.localUrl,
      name: `${userDetails.fname}.jpg`,
      type: 'image/jpg',
    });
    imageData.append(userDetails);
    imageData.append('updateType', type);
    fetch(`${config.serverSideUrl}:${config.port}/api/users/upload`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: userDetails.jwtAccessToken,
        updateType: type,
      },
      body: imageData,
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          dispatch(setPassengerImageSuccess(data));
        } else {
          Toast.show({
            text: 'Image upload failed',
            position: 'bottom',
            duration: 1500,
          });
        }
      })
      .catch(e => {
        console.log(e);
        Toast.show({
          text: 'Image upload failed',
          position: 'bottom',
          duration: 1500,
        });
      });
  };
}
