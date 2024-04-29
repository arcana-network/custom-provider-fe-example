import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./useAuth";
import React from "react";
const redirectToLogin = (loginType: string) => {
  window.location.href = `${
    import.meta.env.VITE_SERVER_URL
  }/start?loginType=${loginType}`;
};

const Start = () => {
  const navigate = useNavigate();
  const { loading, loggedIn } = useAuth();

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/profile");
    }
  }, [loggedIn]);
  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <p>Login</p>
        </div>
        <div className="content">
          {loading ? (
            "loading..."
          ) : (
            <div className="login-container">
              <div>
                <Button
                  onClick={() => {
                    redirectToLogin("google");
                  }}
                >
                  Login with google
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    redirectToLogin("epic");
                  }}
                >
                  Login with epic
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    redirectToLogin("twitch");
                  }}
                >
                  Login with twitch
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
