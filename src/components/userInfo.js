import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
class UserInfo extends React.Component {
    state = {
        formElements: [
            {
                type: "text",
                name: "first_name",
                placeholder: "نام",
                value: localStorage.getItem("first_name")
            },
            {
                type: "text",
                name: "last_name",
                placeholder: "نام خانوادگی",
                value: localStorage.getItem("last_name")
            }
        ],
        user: {}
    };
    userInputHandler = el => event => {
        const elementIndex = this.state.formElements.findIndex(
            elemen => elemen.name === el.name
        );
        const newFormEls = [...this.state.formElements];
        newFormEls[elementIndex] = {
            ...this.state.formElements[elementIndex],
            value: event.target.value
        };
        const newUserData = {
            ...this.state.user,
            [newFormEls[elementIndex].name]: newFormEls[elementIndex].value
        };
        this.setState({
            formElements: newFormEls,
            user: newUserData
        });
    };
    submitHandler = event => {
        event.preventDefault();

        this.props.onSaveUserData(this.state.user);
    };

    render() {
        const formElements = this.state.formElements.map((el, index) => (
            <TextField
                key={index}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={el.name}
                label={el.placeholder}
                name={el.name}
                autoComplete={el.name}
                autoFocus
                onChange={this.userInputHandler(el)}
                value={el.value}
            />
        ));
        let redirect = null;
        if (this.props.authRedirectPath) {
            redirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <Container component="main" maxWidth="xs">
                {redirect}
                <Typography
                    style={{ textAlign: "center" }}
                    component="h1"
                    variant="h5"
                >
                    اطلاعات کاربر توانیتو
                </Typography>
                <form onSubmit={this.submitHandler} noValidate>
                    {formElements}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        دخیره اطلاعات
                    </Button>
                </form>
                <Link to="/dashboard">بازگشت به داشبورد</Link>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        authRedirectPath: state.user.authRedirectPath,
        user: state.user.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSaveUserData: user => dispatch(actions.saveData(user))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
