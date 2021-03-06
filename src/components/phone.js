import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
    state = {
        phone: null
    };
    phoneInputHandler = event => {
        this.setState({ phone: event.target.value });
    };
    sendSMSHandler = event => {
        event.preventDefault();
        this.props.onSendSMS(this.state.phone);
    };
    render() {
        let authRedirect = null;
        if (this.props.smsStatus) {
            authRedirect = <Redirect to="/login/code" />;
        }
        return (
            <Container component="main" maxWidth="xs">
                {authRedirect}
                <CssBaseline />
                <div>
                    <Typography
                        style={{ textAlign: "center" }}
                        component="h1"
                        variant="h5"
                    >
                        عضویت و یا ورود به حساب
                    </Typography>
                    <form onSubmit={this.sendSMSHandler} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="شماره موبایل"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            onChange={this.phoneInputHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            ادامه
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        smsStatus: state.auth.smsSent
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSendSMS: phone => dispatch(actions.sendSMS(phone))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
