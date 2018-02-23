import { REHYDRATE } from 'redux-persist/constants';
import { RIDER_LOGIN_SUCCESS, LOGOUT_USER } from '../../actions/common/signin';
import { RIDER_REGISTER_SUCCESS, OTP_VERIFICATION } from '../../actions/common/register';
import {
  SET_USER_LOCATION,
  NEARBY_DRIVERS_LIST,
  SET_DEVICE_ID_AND_PUSH_TOKEN,
  SET_INITIAL_USER_LOCATION,
  SET_CURRENT_ADDRESS,
} from '../../actions/rider/home';
import {
  PROFILE_UPDATED,
  SET_HOME_ADDRESS,
  SET_WORK_ADDRESS,
  PROFILE_PROGRESS,
} from '../../actions/rider/settings';
import {
  ADD_PASSENGER_SUCCESS,
  UPDATE_PASSENGER_SUCCESS,
  REMOVE_PASSENGER_SUCCESS,
} from '../../actions/rider/passenger';

const initialState = {
  _id: undefined,
  email: undefined,
  password: undefined,
  userType: undefined,
  fname: undefined,
  lname: undefined,
  dob: undefined,
  deviceId: undefined,
  pushToken: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  emergencyDetails: {
    phone: undefined,
    name: undefined,
    imgUrl: undefined,
  },
  recoveryEmail: undefined,
  latitudeDelta: 0.022,
  longitudeDelta: undefined,
  gpsLoc: [12.9106393, 77.6018696],
  userRating: undefined,
  phoneNo: undefined,
  profileUrl: undefined,
  currTripId: undefined,
  currTripState: undefined,
  loginStatus: undefined,
  createdAt: undefined,
  homeAddress: undefined,
  profileUpdating: false,
  workAddress: undefined,
  verifying:undefined,
  driversList: [],
  passengerList: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case RIDER_LOGIN_SUCCESS:
      return action.payload.data.user;

    case RIDER_REGISTER_SUCCESS:
      {return action.payload.data.user;
      console.log('rider---------->',action.payload.data.user)}
      
      case OTP_VERIFICATION:
      return {...state, verifying: action.payload}

    case LOGOUT_USER:
      return initialState;

    case SET_CURRENT_ADDRESS:
      return { ...state, address: action.payload };

    case SET_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude],
      };

    case SET_INITIAL_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude],
      };

    case PROFILE_PROGRESS:
      return { ...state, profileUpdating: true };

    case NEARBY_DRIVERS_LIST:
      return { ...state, driversList: action.payload };

    case SET_DEVICE_ID_AND_PUSH_TOKEN:
      return {
        ...state,
        deviceId: action.deviceId,
        pushToken: action.pushToken,
      };

    case PROFILE_UPDATED:
      return {
        ...state,
        fname: action.payload.data.fname,
        lname: action.payload.data.lname,
        email: action.payload.data.email,
        phoneNo: action.payload.data.phoneNo,
        profileUrl: action.payload.data.profileUrl,
        workAddress: action.payload.data.workAddress,
        homeAddress: action.payload.data.homeAddress,
        emergencyDetails: action.payload.data.emergencyDetails,
        profileUpdating: false,
      };

    case SET_HOME_ADDRESS:
      return { ...state, homeAddress: action.payload };
    case SET_WORK_ADDRESS:
      return { ...state, workAddress: action.payload };

    case ADD_PASSENGER_SUCCESS:
    case UPDATE_PASSENGER_SUCCESS:
    case REMOVE_PASSENGER_SUCCESS:
      return { ...state, profileList: action.payload };

    case REHYDRATE:
      if (Object.keys(action.payload).length !== 0) {
        return action.payload.rider.user;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const getUserType = state => {
  const rider = state.rider.user.userType;
  return rider || null;
};
export const getNearbyDriversLocation = state => {
  const driversList = state.rider.user.driversList;
  if (!driversList) {
    return undefined;
  }
  const array = [];
  driversList.forEach(driver => {
    const location = driver.gpsLoc;
    const coordinates = {
      latitude: location[0],
      longitude: location[1],
    };
    array.push(coordinates);
  });
  return array;
};
export default user;
