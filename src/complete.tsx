import { useSearchParams, useNavigate } from "react-router-dom";
import React from "react";
import Button from "./Button";
import { useAuth } from "./useAuth";

const STATUS = {
  INPROGRESS: "ip",
  COMPLETE: "cp",
};
const getToken = async (params: { code: string; state: string }) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/complete`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: {
    loginType: string;
    userID: string;
    token: string;
    loginToken: string;
    linkComplete?: boolean;
    linkedAccount?: string;
  } = await res.json();
  return data;
};

const Complete = () => {
  const { auth } = useAuth();
  const [progressText, setProgressText] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = React.useState(STATUS.INPROGRESS);
  const navigate = useNavigate();

  React.useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      setProgressText("Getting token");
      getToken({ code, state })
        .then(function (params) {
          setProgressText("Arcana: Logging In");
          if (params.linkComplete == true) {
            auth.init().then(() => {
              setProgressText(
                `You just linked your account to ${params.linkedAccount}`
              );
              console.log("Link complete!");
              setStatus(STATUS.COMPLETE);
            });
            return;
          }
          localStorage.setItem("token", params.loginToken);
          auth.init().then(async () => {
            auth.provider.once("connect", () => {
              setProgressText("Login complete");
              setStatus(STATUS.COMPLETE);
            });
            await auth.loginWithCustomProvider({
              token: params.token,
              userID: params.userID,
              provider: "csp-aAPozkerUragPuza",
            });
          });
        })
        .finally(() => {
          setSearchParams({});
        });
    }

    return;
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <p>REDIRECT</p>
        </div>
        <div className="content">
          <p>{progressText}</p>
          {status == STATUS.COMPLETE ? (
            <Button onClick={() => navigate("/profile")}>Go to profile</Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Complete;
