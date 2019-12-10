import React from "react";
// import { connect } from "react-redux";
// import * as actions from "../store/actions/index";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

class UserInfo extends React.Component {
    state = {
        formElements: [
            {
                type: "text",
                name: "first_name",
                placeholder: "نام",
                value: ""
            },
            {
                type: "text",
                name: "last_name",
                placeholder: "نام خانوادگی",
                value: ""
            }
        ]
    };
    userInputHandler = el => event => {
        const elementIndex = this.state.formElements.findIndex(
            elemen => elemen.type === el.type
        );
        const newFormEls = [...this.state.formElements];
        newFormEls[elementIndex] = {
            ...this.state.formElements[elementIndex],
            value: event.target.value
        };
        this.setState({
            formElements: newFormEls
        });
    };
    submitHandler = event => {
        event.preventDefault();
        // submit handler to be coded.
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
            />
        ));
        return (
            <Container component="main" maxWidth="xs">
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
            </Container>
        );
    }
}

export default UserInfo;
