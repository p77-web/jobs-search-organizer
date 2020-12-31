import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
	firebase: firebaseReducer,
});

export default RootReducer;
