import Button from "./Button";
import React from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, auth } = useAuth();
  React.useEffect(() => {
    if (!loading) {
      auth.isLoggedIn().then((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          navigate("/");
        }
      });
    }
  }, [loading]);

  return loading ? <Loading title="profile" /> : <ProfileView />;
};

const ProfileView = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = React.useState(true);
  const [linkedAccounts, setLinkedAccounts] = React.useState<string[]>([]);
  const [linkedIDS, setLinkedlinkedIDS] = React.useState<string[]>([]);
  React.useEffect(() => {
    getConnectedAccounts(token!).then(function (accounts) {
      const acc = [];
      const ids = [];
      for (const account of accounts) {
        acc.push(account.provider);
        ids.push(account.id);
      }
      setLinkedAccounts(acc);
      setLinkedlinkedIDS(ids);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <p>Profile</p>
        </div>
        <div className="content">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <div>
                Account linked to: <br />
                {linkedAccounts.map(function (l, i) {
                  return (
                    <p key={i}>
                      {l}({linkedIDS[i]})
                    </p>
                  );
                })}
              </div>
              <LinkAccount token={token!} linkedAccounts={linkedAccounts} />
              {/* <Button onClick={() => auth.logout()}>Logout</Button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LinkAccount = ({
  token,
  linkedAccounts,
}: {
  linkedAccounts: string[];
  token: string;
}) => {
  if (!token) {
    return;
  }

  return (
    <div className="login-container">
      {["epic", "google", "twitch"].map((l) => {
        if (linkedAccounts.includes(l)) {
          return "";
        }
        return (
          <div key={l}>
            <Button
              onClick={() => {
                redirectToLink(l, token);
              }}
            >
              {`Link with ${l}`}
            </Button>
            <br />
          </div>
        );
      })}
    </div>
  );
};

const Loading = ({ title }: { title: string }) => {
  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <p>{title}</p>
        </div>
        <div className="content">
          <h3>Loading...</h3>
        </div>
      </div>
    </div>
  );
};

const redirectToLink = (loginType: string, token: string) => {
  window.location.href = `${
    import.meta.env.VITE_SERVER_URL
  }/link/${loginType}?token=${token}`;
};

const getConnectedAccounts = async (token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/connected-accounts`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await res.json();
  return json.accounts;
};
export default Profile;
