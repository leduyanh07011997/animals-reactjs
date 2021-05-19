import { Box, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { AccountCircle } from '@material-ui/icons';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickClose, clickOpen } from './loginSlice';
import './styles.css';
import { clear, clearCurrentUser } from './userSlice';


Header.propTypes = {
    
};

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
}

function Header(props) {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.currentUser)
    const isLogin = !!loggedInUser.email
    console.log(isLogin)
    const open = useSelector(state => state.login.openLoginForm)
    const [mode,setMode] = useState(MODE.LOGIN)

    const handleClickOpen = () => {
        const action = clickOpen()
        dispatch(action)
    };

    const handleClose = () => {
        const action = clickClose()
        dispatch(action)
    };

    const handleOpenOrCloseMenu = () => {
        const status = document.querySelector('.menu-account')
        if(status.style.display === 'none') {
            status.style.display = 'block';
        } else {
            status.style.display = 'none';
        }
    }

    const handleClickLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access-token');
        localStorage.removeItem('petsList');
        const action = clear()
        dispatch(action)
    }


    return (
        <>
            <div className="heading">
                <a href="/" className="heading__name-shop">animals</a>
                
                {!isLogin && (
                    <div className="heading__register" onClick={handleClickOpen}>
                        Login
                    </div>
                )}
                {isLogin && (
                    <div className="account-btn">
                        <IconButton color="inherit"  onClick={handleOpenOrCloseMenu}>
                            <AccountCircle />
                        </IconButton>
                        <div className="menu-account" onClick={handleClickLogout}>Logout</div>
                    </div>
                )}
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
                disableBackdropClick
            
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mode === MODE.REGISTER && (
                            <>
                                <Register switchForm={setMode} />
                                <Box textAlign="center">
                                    <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                        Already have an account. Login here
                                    </Button>
                                </Box>
                            </>
                        )}
                        {mode === MODE.LOGIN && (
                            <>
                                <Login closeDialog={handleClose}/>
                                <Box textAlign="center">
                                    <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                        Don't have an account. Register here 
                                    </Button>
                                </Box>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Header;