// Imports
import auth from "./auth";
import course from "./course";
import courses from "./courses";
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux-immutable";

// Root reducer creator
const createRootReducer = history => combineReducers({
    auth,
    course,
    courses,
    router: connectRouter(history),
});

// Export
export default createRootReducer;
