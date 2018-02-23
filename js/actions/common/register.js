import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import config from '../../../config.js';

export const RIDER_REGISTER_SUCCESS = 'RIDER_REGISTER_SUCCESS';
export const DRIVER_REGISTER_SUCCESS = 'DRIVER_REGISTER_SUCCESS';
export const RIDER_REGISTER_ERROR = 'RIDER_REGISTER_ERROR';
export const DRIVER_REGISTER_ERROR = 'DRIVER_REGISTER_ERROR';
export const REQUEST_REGISTERATION = 'REQUEST_REGISTERATION';
export const REGISTRATION_RESPONSE_RECEIVED = 'REGISTRATION_RESPONSE_RECEIVED';
export const OTP_VERIFICATION = 'OTP_VERIFICATION';

export function riderRegisterSuccess(data) {
  return {
    type: RIDER_REGISTER_SUCCESS,
    payload: data,
  };
}
export function driverRegisterSuccess(data) {
  return {
    type: DRIVER_REGISTER_SUCCESS,
    payload: data,
  };
}
export function riderRegisterError(error) {
  return {
    type: RIDER_REGISTER_ERROR,
    payload: error,
  };
}
export function driverRegisterError(error) {
  return {
    type: DRIVER_REGISTER_ERROR,
    payload: error,
  };
}

export function registerAsync(obj) {
  const userCredentials = obj;
  userCredentials.userType = 'rider';
  userCredentials.phoneNo = `+${userCredentials.callingCode}${
    userCredentials.phoneNo
  }`;
  console.log("input to register api :----->",JSON.stringify(userCredentials))
  return dispatch => {
    dispatch({ type: REQUEST_REGISTERATION });
    fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        console.log("registerdata=-=====>",data)
        console.log("dtaaaa=====+++",data.user._id)
        if (data.success === true && userCredentials.userType === 'rider') {
          if (data.data.user.isApproved) {
            // dispatch(riderRegisterSuccess(data));
            dispatch(Actions.otpverification());
          } else {
            Alert.alert(
              'Registration Approval',
              'Your account will be updated in next 24Hrs.',
            );
            dispatch(Actions.login({ type: ActionConst.RESET }));
          }
        }
        if (data.success === true && userCredentials.userType === 'driver') {
          Toast.show({
            text: 'Already Registered as Driver',
            position: 'bottom',
            duration: 1500,
          });
        }
        if (data.success === false && userCredentials.userType === 'rider') {
          dispatch(riderRegisterError(data));
        }
        // if (data.success === false && userCredentials.userType === "driver") {
        //   dispatch(driverRegisterError(data));
        // }
      })
      .catch(e => {
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      });
  };
}

//
// Registration using fb
//
export function registerAsyncFb(obj) {
  const userCredentialsFb = obj;
  userCredentialsFb.phoneNo = `+${userCredentialsFb.callingCode}${
    userCredentialsFb.phoneNo
  }`;
  return (dispatch, getState) => {
    const state = getState();
    userCredentialsFb.password = state.entrypage.socialLogin.id;
    userCredentialsFb.profileUrl = state.entrypage.socialLogin.profileUrl;
    if (!userCredentialsFb.message) {
      dispatch({ type: REQUEST_REGISTERATION });
      fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentialsFb),
      })
        .then(resp => {
          resp.json().then(data => {
            dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
            if (
              data.success === true &&
              userCredentialsFb.userType === 'rider'
            ) {
              if (data.data.user.isApproved) {
                dispatch(riderRegisterSuccess(data));
                dispatch(Actions.riderStartupService());
              } else {
                Alert.alert(
                  'Registration Approval',
                  'Your account will be updated in next 24Hrs.',
                );
                dispatch(Actions.login({ type: ActionConst.RESET }));
              }
            }
            if (
              data.success === false &&
              userCredentialsFb.userType === 'rider'
            ) {
              if (data.message === 'user already exist') {
                dispatch(riderRegisterSuccess(data));
                dispatch(Actions.riderStartupService());
              } else {
                dispatch(riderRegisterError(data));
              }
            }
          });
        })
        .catch(e => {
          dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        });
    } else {
      dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      if (obj.success === true && obj.data.user.userType === 'rider') {
        dispatch(riderRegisterSuccess(obj));
        dispatch(Actions.riderStartupService());
      }
      if (obj.success === true && obj.data.user.userType === 'driver') {
        Toast.show({
          text: 'Already Registered as Driver',
          position: 'bottom',
          duration: 1500,
        });
      }
    }
  };
}


//otp verification

export function verify(data){
  // console.log('otp verify-')
  console.log("input to vderify api--->",JSON.stringify(data))
  return dispatch => {
    console.log('enter')
    const url = `http://52.34.207.5:3041/api/verify/mobile`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(responseJson => {
        dispatch({
          type: OTP_VERIFICATION,
          payload:responseJson
        });
        console.log("verify",responseJson)
      })
      .catch(error => {
        console.error(error);
      });
  };

 console.log('otp verify----------->',responseJson )
}

