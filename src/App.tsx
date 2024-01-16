import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { 
  BrowserRouter as Router, 
  Navigate, Route, 
  Routes,
  Link,
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import config from './amplifyconfiguration.json';

import { fetchAuthSession } from 'aws-amplify/auth';
import  { useEffect } from 'react';



// import CustomHeader from './components/CustomHeader';
import CreateMint from './components/CreateMint';
import MintListComponent from './components/MinList';
import MintDetail from './components/MintDetail';

Amplify.configure(config);






export function App({ signOut, user }: WithAuthenticatorProps) {

  useEffect(() => {
    const fetchData = async () => {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      if (idToken) {
        localStorage.setItem('accessToken', idToken.toString());
        console.log('idToken:', idToken.toString());
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
        <Box style={headerStyle}>
            <Grid container>
                <Grid item xs={6} md={8} style={logoContainerStyle}>
                    <span style={logoStyle}>
                        <Link to="/create" style={{ ...headerMenuStyle }} >
                            Hello {user?.username || ""}
                        </Link>
                    </span>
                </Grid>
                <Grid item xs={6} md={4} style={headerMenuContainerStyle}>
                    <Link to="/create" style={{ ...headerMenuStyle }}>
                        Mint Item
                    </Link> 
                    {" "}
                    <Link to="/" style={{ ...headerMenuStyle }}>
                        List Items
                    </Link>
                    {" "}
                    <Button variant="text" onClick={signOut}>
                        <LogoutIcon style={logoutIconStyle}/>
                    </Button>
                </Grid>
            </Grid>

        </Box>
        {/* <CustomHeader username={user?.username || 'user'}/> */}
        
        <Box style={mainBoxStyle}>
          <Routes>
            
            <Route path="/create"   element={<CreateMint />}  />
            <Route path="/"     element={<MintListComponent/>} />
            <Route path="/detail" element={<MintDetail id={''} />} />

          </Routes>
        </Box>
    </Router>
  );
}

export default withAuthenticator(App);


const mainBoxStyle = {
  padding: "20px 10px",
  backgroundColor: "#e8e8e8",
  height: "100vh"
}

const headerStyle = {
  backgroundColor: '#e6bb47',
  height: "50px",
  display: "flex",
  alignItems: "center",
  color: "purple"
}

const logoContainerStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'flex-start',
  fontWeight: 'bold',
}

const logoStyle = {
  fontSize: "28px",
  padding: "25px 10px"
}

const headerMenuContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const headerMenuStyle = { 
  textDecoration: "none", 
  margin: "15px 10px 15px 0px" 
}

const selectedStyle = {
  fontWeight: 'bold', // style for the selected menu item
};

const logoutIconStyle = {
  color: 'purple'
}