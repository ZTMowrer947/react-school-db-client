// Imports
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import withImmutablePropsToJS from "with-immutable-props-to-js";
import Course from "../components/Course";
import LoadingIndicator from "../components/LoadingIndicator";
import AuthContext from "../context/AuthContext";
import { courseFetchStart } from "../store/actions/course";

// Components
class CourseDetail extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            course: null,
            isLoading: true,
            error: null,
        };
    }

    // Run after component has been mounted to the DOM
    componentDidMount() {
        // Get ID from route params
        const id = this.props.match.params.id;

        // Get course data
        this.props.fetchCourseById(id);
    }

    // Render to DOM
    render() {
        // If an error occurred,
        if (this.props.error) {
            // Get error from props
            const { error } = this.props;

            // Declare variable for redirection data
            let redirectProps;

            // If a response is included,
            if (error.response) {

                // Consider the response status
                switch (error.response.status) {
                    // Not Found
                    case 404:
                        // Set not found redirect data
                        redirectProps = { pathname: "/notfound" };
                        break;

                    // Any other error
                    default:
                        // Set error redirect data
                        redirectProps = { pathname: "/error" };
                        break;
                }
            } else {
                // Set error redirect data
                redirectProps = { pathname: "/error" };
            }

            // Redirect using redirect data
            return <Redirect to={redirectProps} />
        }

        // If the loading process has finished,
        if (!this.props.isFetching && this.props.course !== null) {
            // Otherwise, render course data
            return (
                <Course {...this.props.course} authUser={this.context.user} />
            );
        }

        // Otherwise, render loading indicator
        return <LoadingIndicator size={40} />;
    }
}

// Context
CourseDetail.contextType = AuthContext;

// Redux mapping to React props
const mapStateToProps = state => {
    const courseState = state.get("course");

    return {
        course: courseState.get("data"),
        error: courseState.get("error"),
        isFetching: courseState.get("isFetching"),
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCourseById: id => {
        dispatch(courseFetchStart(id));
    },
})

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withImmutablePropsToJS(CourseDetail));