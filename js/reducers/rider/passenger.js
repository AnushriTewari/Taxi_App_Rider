import {
  ADD_PASSENGER_REQUEST,
  ADD_PASSENGER_SUCCESS,
  ADD_PASSENGER_FAILED,
  UPDATE_PASSENGER_REQUEST,
  UPDATE_PASSENGER_SUCCESS,
  UPDATE_PASSENGER_FAILED,
  REMOVE_PASSENGER_REQUEST,
  REMOVE_PASSENGER_SUCCESS,
  REMOVE_PASSENGER_FAILED,
  SET_PASSENGER_IMAGE_REQUEST,
  SET_PASSENGER_IMAGE_SUCCESS,
} from '../../actions/rider/passenger';

const initialState = {
  isLoading: false,
  error: {},
};
const passenger = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PASSENGER_REQUEST:
      return { ...state, isLoading: true , error: {}};
    case ADD_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
      };
    case ADD_PASSENGER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_PASSENGER_REQUEST:
      return { ...state, isLoading: true, error: {} };
    case UPDATE_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
      };
    case UPDATE_PASSENGER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REMOVE_PASSENGER_REQUEST:
      return { ...state, isLoading: true, error: {} };
    case REMOVE_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
      };
    case REMOVE_PASSENGER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_PASSENGER_IMAGE_REQUEST:
      return { ...state, isLoading: true, error: {} };
    case SET_PASSENGER_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
      };

    default:
      return state;
  }
};
export default passenger;
