import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
class Dashboard extends React.Component {
    componentDidMount() {
        this.props.onGetUser();
    }
    render() {
        return (
            <React.Fragment>
                <Container component="main" maxWidth="md">
                    <h1>داشبورد</h1>
                    <div>
                        <ul>
                            <li>{this.props.user.first_name}</li>
                            <li>{this.props.user.last_name}</li>
                        </ul>
                    </div>
                    <Link to="/userinfo">ویرایش اطلاعات</Link>
                </Container>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actions.getUser())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
