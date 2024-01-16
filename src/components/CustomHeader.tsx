import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

// import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    username: string,
}


const CustomHeader = ({ username }: HeaderProps) => {
    const location = useLocation();

    const handleLogout = () => { console.log('handleLogout') }

    return (
        <Box style={headerStyle}>
            <Grid container>
                <Grid item xs={6} md={8} style={logoContainerStyle}>
                    <span style={logoStyle}>
                        <Link to="/create" style={{ ...headerMenuStyle }} >
                            Hello {username}
                        </Link>
                    </span>
                </Grid>
                <Grid item xs={6} md={4} style={headerMenuContainerStyle}>
                    <Link to="/create" style={{ ...headerMenuStyle, ...(location.pathname === '/create' && selectedStyle) }}>
                        Mint Item
                    </Link> 
                    {" "}
                    <Link to="/list" style={{ ...headerMenuStyle, ...(location.pathname === '/list' && selectedStyle) }}>
                        List Items
                    </Link>
                    {" "}
                    <Button variant="text" onClick={handleLogout}>
                        <LogoutIcon style={logoutIconStyle}/>
                    </Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default CustomHeader;
// export default withAuthenticator(CustomHeader);

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