import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
// import { uuid } from "uuidv4";
import { ActionContext } from "../../hooks";
import { User } from "../../models/User";
// import { VerificationMethod } from "../../models/VerificationMethod";
import { WebService } from "../../services";
import { getUserData, validateEmail } from "../../utils";
import { Avatar, Button, Drawer, makeStyles } from "@material-ui/core";
import "./Account.scss";
import { DeleteOutline, Public } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#f4fc00",
    marginTop: 20,
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#080808",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
    marginBottom: 250
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4fc00",
    boxShadow: "0 0 3px black",
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';
function Account() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });




  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  // const github_client_id = 'f9be73dc7af4857809e0';
  const { logoutUser, setUserData } = useContext(ActionContext);
  const user: User | undefined = getUserData();
  const [editMode, setEditMode] = useState(false);

  const [email, setEmail] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  // const [verificationMethod, setVerificationMethod] = useState<VerificationMethod | undefined>(undefined);

  const alert = useAlert()

  const modify = (e: any, user: User) => {
    e.preventDefault()
    if (formIsComplete()) {
      if (validateEmail(email)) {
        // if (verificationMethod) {
          const updatedUser = {
            username: email,
            email: email,
            first_name: firstName,
            last_name: lastName,
          }
          WebService.modifyUser(updatedUser, user.user_id)
            .subscribe(async (data) => {
              if (data.ok) {
                setEditMode(false);
                user.username = updatedUser.username;
                user.email = updatedUser.email;
                user.first_name = updatedUser.first_name;
                user.last_name = updatedUser.last_name;
                setUserData(user);
                // WebService.modifyDelegate({
                //   oauth_provider: verificationMethod,
                // }, getDelegateId(user))
                //   .subscribe(async (data) => {
                //     if (data.ok) {
                      // redirect to 3rd party oauth app
                      // if (verificationMethod === VerificationMethod.Github) {
                      //   const stateUUID = uuid();
                      //   sessionStorage.setItem("oauthState", stateUUID);
                      //   window.location.href =
                      //     'https://github.com/login/oauth/authorize?client_id='
                      //     + github_client_id
                      //     + '&redirect_uri=https://voice.radicalxchange.org/oauth2/callback&state='
                      //     + stateUUID;
                      // } else if (verificationMethod === VerificationMethod.Twitter) {
                      //   WebService.getTwitterRequestToken()
                      //     .subscribe(async (data) => {
                      //         sessionStorage.setItem("oauthState", data.oauth_token);
                      //         sessionStorage.setItem("twitterOauthSecret", data.oauth_secret);
                      //         window.location.href =
                      //           'https://api.twitter.com/oauth/authenticate?oauth_token='
                      //           + data.oauth_token;
                      //       }
                      //     );
                      // }
                //   } else {
                //     console.error("Error", await data.json());
                //   }
                // });
            } else {
              console.error("Error", await data.json());
            }
          });
        // } else {
        //   alert.error("Please select a verification method")
        // }
      } else {
        alert.error("Please enter a valid email address")
      }
    } else {
      alert.error("Please fill all the fields")
    }
  };

  const formIsComplete = () => {
    if (firstName && lastName && email) {
      return true;
    }
    return false;
  };

  const cancelEdit = () => {
    setEmail(user ? user.email : "");
    setFirstName(user ? user.first_name : "");
    setLastName(user ? user.last_name : "");
    setEditMode(false);
  };

  return (
    
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#080808",
              color: "#f4fc00",
            }}
           
          />
          <Drawer
          
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar style={{
             
              cursor: "pointer",
              backgroundColor: "#080808",
           
            }}
                  className={classes.picture}
                  
                  alt={firstName|| lastName}
               
                />   
              </div>
              <span
                  style={{
                    fontFamily: "Bungee",
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                    marginBottom: 10,
                  }}
                >
                  {firstName +" "+ lastName}
                </span>

                <div className={classes.watchlist}>
                  <span
                    style={{
                      fontFamily: "Bungee",
                      fontSize: 15,
                      textShadow: "0 0 10px #FFFF00",
                    }}
                  >
                    Groups:
                  </span>

                    </div>
              {user ? (
        <div className="delegate-card" key={user.id}>
         
          {editMode ? (
              
              <form  className="edit-account" onSubmit={(e) => modify(e, user)}>
              <input
                type="text"
                placeholder="First Name"
                className="login-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="login-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="buttons">
                <button
                  type="button"
                  className="account-button"
                  onClick={() => cancelEdit()}
                  >
                  cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                  >
                  save changes
                </button>
              </div>

            </form>
                 ) : (
                  <div  className="info">
               
                </div>
              )}
              </div>
            ) : (
              <h2>User not logged in.</h2>
            )}
            <div className="option-buttons">
              <button
                type="button"
                className="account-button"
                onClick={() => logoutUser()}
                >
                log out
              </button>
              {editMode ? (
                <>
                </>
              ) : (
                <button
                  type="button"
                  className="account-button"
                  onClick={() => setEditMode(true)}
                  >
                  edit account
                </button>
              )}
            </div>
          </div>
        
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Account;
