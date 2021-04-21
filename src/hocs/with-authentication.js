import React from "react";
import { checkSession } from "../services/session";

export default function withAuthentication(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false,
        isAuthenticating: true,
      };
    }

    async componentDidMount() {
      const { history } = this.props;

      const isAuthenticated = await checkSession();

      if (!isAuthenticated) {
        history.replace('/login');
      }

      this.setState({
        isAuthenticated: isAuthenticated,
        isAuthenticating: false,
      });
    }

    render() {
      const {
        isAuthenticating
      } = this.state;

      if (isAuthenticating) {
        return <div>Authenticating...</div>
      }

      return <Component {...this.props} />;
    }
  }
}