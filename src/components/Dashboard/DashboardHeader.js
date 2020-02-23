import React from "react";
import { Header, Icon, Segment, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";

/**
 * @function DashboardHeader - Functional Component that renders the header of the Dashboard Table
 * @param {Object} props - inherited object of information needed for component to function
 */

function DashboardHeader({ user }) {
  return (
    <>
      {user && (
        <Segment secondary inverted style={{ background: "#245CA6" }}>
          <Label
            size="large"
            ribbon
            icon="privacy"
            style={{ textTransform: "capitalize", background: "#FAF0E3" }}
            content={user.role}
          />
          <Header inverted textAlign="center" as="h1" icon>
            <Icon name="user" />
            {user.firstName} {user.lastName}
            <Header.Subheader>{user.email}</Header.Subheader>
            <Header.Subheader>
              Joined {moment(user.created_at).format("MMMM Do YYYY")}
            </Header.Subheader>
          </Header>
        </Segment>
      )}
    </>
  );
}

const stateToProps = state => ({
  user: state.userReducer.loggedInUser
});

export default connect(stateToProps)(DashboardHeader);
