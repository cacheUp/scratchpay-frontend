import React, { useEffect, useState } from "react";
import "./Login.css";
//prettier-ignore
import { Button, Form, Message, Segment, Container, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginUser, setErr } from "../../actions";
import { useHistory } from "react-router-dom";

//initial object for input state
const INITIAL_USER = {
  email: "",
  password: ""
};

/**
 * @function Login - Functional Component that renders a form for Logging in
 * @param {Object} props - inherited object of information needed for component to function
 */

function Login(props) {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // react hook to access history object
  const history = useHistory();

  /**
   * @function useEffect - lifecylce method used to disable button if any empty input fields
   */
  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  /**
   * @function useEffect - lifecylce method used to mount errors
   */
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  /**
   * @function useEffect - used to push user to dashboard on inital render
   */

  useEffect(() => {
    console.log(props.user);
    if (props.user) {
      history.push("/dashboard");
    }
  }, [props.user]);

  /**
   * @function handleChange
   * @param {Object} event - used for controlled form
   */
  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  /**
   * @function handleSubmit - used to login user
   * @param {Object} event - used to prevent default functionality
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    props.setErr("");
    const userLogin = { ...user };
    props.loginUser(userLogin);
    setLoading(false);
  }

  return (
    <>
      <Container text style={{ padding: "1em", marginTop: "100px" }}>
        <Message
          attached
          icon={
            <Image
              src="https://storage.googleapis.com/scratchpay-com-assets/challenges/paw_symbol.png"
              style={{ height: "100px", width: "100px", marginRight: "30px" }}
            />
          }
          header="Welcome Back!"
          content="Login with email and password"
          style={{ background: "#F56E57", color: "white" }}
        ></Message>

        <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
          <Message error header="Oops!" content={error} />
          <Segment>
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={user.email}
              data-testid="email-input"
            />
            <Form.Input
              fluid
              icon="lock"
              data-testid="password-input"
              iconPosition="left"
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
            <Button
              disabled={disabled || loading}
              data-testid="input-test"
              icon="sign in"
              type="submit"
              style={{ background: "#245CA6", color: "white" }}
              content="Login"
              type="submit"
            />
          </Segment>
        </Form>
      </Container>
    </>
  );
}

const stateToProps = state => ({
  error: state.userReducer.error,
  user: state.userReducer.loggedInUser
});

export default connect(stateToProps, { loginUser, setErr })(Login);
