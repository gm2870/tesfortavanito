import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { Redirect } from "react-router-dom";

class Code extends React.Component {
    state = {
        code: null
    };
    codeInputHandler = event => {
        this.setState({ code: event.target.value });
    };
    submitHandler = event => {
        event.preventDefault();
        this.props.onPostCode(this.state.code);
    };
    render() {
        let authRedirect = null;
        if (this.props.authenticated) {
            authRedirect = <Redirect to="/dashboard" />;
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
                        لطفا کد ارسال شده به موبایل خود را وارد کنید
                    </Typography>
                    <form onSubmit={this.submitHandler} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="کد شش رقمی"
                            name="code"
                            autoComplete="code"
                            autoFocus
                            onChange={this.codeInputHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            ورود
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onPostCode: code => dispatch(actions.postCode(code))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Code);
