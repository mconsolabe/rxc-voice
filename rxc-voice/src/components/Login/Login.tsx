import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ActionContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import { WebService } from "../../services";
import { useAlert } from 'react-alert'
import { Link } from "react-router-dom";
import { Domain } from "../../utils";
import logo from "../../assets/icons/rxc-voice-beta-logo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Login.scss";
import styled from "styled-components";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Button } from "@material-ui/core";
import {
    createTheme,
    createStyles,
    withStyles,
    makeStyles,
    Theme,
  } from '@material-ui/core/styles';


function Login() {
  const location = useLocation();
  const linkUid = new URLSearchParams(location.search).get('uidb64');
  const linkToken = new URLSearchParams(location.search).get('token');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unverifiedLogin, setUnverifiedLogin] = useState(false);
  const { setColor, setUserData } = useContext(ActionContext);



  const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#000f',
      borderColor: '#000f',
      fontFamily: [
        'Segoe UI',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#000f',
        borderColor: '#000f',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ffeb3b',
        borderColor: '#ffeb3b',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,.5)',
      },
    },
  })(Button);

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);
  
  const classes = useStyles();

  const alert = useAlert()

  useEffect(() => {
    setColor(BgColor.Yellow)

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (e: any) => {
    e.preventDefault()
    if (email && password) {
      WebService.loginUser({
        user: {
          username: email,
          password: password,
        },
        creds: {
          uidb64: linkUid,
          token: linkToken,
        },
      }).subscribe(async (data) => {
        if (data.ok) {
          const userData = await data.json();
          setUserData(userData);
          if (!userData.is_verified) {
            setUnverifiedLogin(true);
          } else {
            window.location.href = Domain.WEB;
          }
        } else {
          const error = await data.json();
          console.log(error);
          alert.error(error.non_field_errors[0]);
        }
      });
    }
  };

  if (unverifiedLogin) {
    return (
      <div className="main-container">
      <div className="login-unverified">
        <h2>Unverified account</h2>
        <p>Sorry, but you can't access the site until you verify your account.</p>
        <p>You are probably here because you selected "Video application" as your verification method when you created your account. If this is the case, you will not be able to log into the site until are verified by a site administrator.</p>
        <p>If you decide that you would rather verify your account by logging into a Github or Twitter account that you own, you can always click the link in your invitation email and choose either of those options instead.</p>
        <p>If you would like to be verified by video application, you must set up a 5 min video call with a member of the RadicalxChange team. Your camera must be on and your face must be visible so that we can visually identify you.</p>
        <p><strong>On the video call, you will attest that:</strong></p>
        <ul className="list">
          <li>
            <p>You are the sole owner of this RxC Voice account and the email address associated with it.</p>
          </li>
          <li>
            <p>You agree that you will not attempt to create or control, either directly or by proxy, any other account on RxC Voice.</p>
          </li>
        </ul>
        <p>Please note that RadicalxChange Foundation will not allow users to hold multiple accounts on RxC Voice.</p>
      </div>
      </div>
    );
  }
  return (
    <div className="main-container">
    <MainContainer>
    <form className="login" onSubmit={login}>
      <img src={logo} className="App-logo" alt="logo"style={{
              
              marginBottom: -30,
              marginLeft: 45, 
              
            }}            />
      <InputContainer>
      <input
        
        type="text"
        placeholder="Username"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
        
          marginTop: 25 ,
          
          
          
        }}           
      />
</InputContainer>
<HorizontalRule />
<ButtonContainer>
     
           <Button   type="submit" startIcon={<VpnKeyIcon />} color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              marginTop: 25 ,
              height: 40,
              
              
            }}           
            >
              Sign In
            </Button>
      

  
      </ButtonContainer>
      <Link
        to={`/forgot-password`}
        className="forgot-password"
      >
        <Button  type="submit" color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              marginTop: 1 ,
              marginRight:60,
              height: 40,
              
            }}           
            >
              Forgot Password?
            </Button>
      </Link>
    </form>
    </MainContainer>
    </div>
  );
}


const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
 
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 70vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 100%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #FFBF00 0%, #000 79%);
  background-color: #000;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;


export default Login;
