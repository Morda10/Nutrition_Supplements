import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  //   Box,
} from "@material-ui/core";
import MyTextField from "../UI/Forms/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setUser, setToken } from "../redux/actions/authActions";
import { setUser, setToken } from "../redux/reducers/UserReducer";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  password: Yup.string()
    .min(2, "Password must be 2 characters or longer")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    width: "30rem",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  form: {
    display: "center",
  },
}));

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ marginTop: "3em" }}
      >
        <Grid item>
          <Card raised className={classes.root}>
            <CardContent display="flex">
              <Typography align="center" variant="h3">
                Login
              </Typography>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const res = await axios.post("/authenticate", values);
                    const { jwt } = res.data;
                    const { data } = await axios.get(
                      `/getUserId/${values.username}`
                    );
                    // const { id } = data;
                    // console.log(data);
                    console.log(jwt);
                    const userDetails = { id: data, username: values.username };
                    dispatch(setUser({ user: jwt, userDetails: userDetails }));
                    dispatch(setToken({ token: jwt }));
                    // console.log(data);
                    history.push("/");
                  } catch (e) {
                    // console.log(e.name);
                    setErrors(e.message);
                    actions.resetForm();
                  }
                }}
              >
                {(values, isSubmitting) => (
                  <Form>
                    <MyTextField
                      name="username"
                      type="text"
                      label="Username"
                      fullWidth
                    />
                    <br />
                    <MyTextField
                      name="password"
                      type="password"
                      label="Password "
                      fullWidth
                    />
                    <br />
                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Typography variant="h6" color="error">
                {errors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
