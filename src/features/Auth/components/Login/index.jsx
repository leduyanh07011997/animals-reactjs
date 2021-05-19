
import { updateAccessToken, updateCurrentUser, updatePetsList } from 'components/Header/userSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
   closeDialog: PropTypes.func, 
};

function Login({closeDialog}) {
    const dispatch = useDispatch()
    const handleTakeAccessToken = () => {
        const key = 'v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKuQ'
        const secret = '91BEGtP8Iv5UcmGpEljgKTzYCmNwUAvCwMSyFi1H'

        const org = 'RI77';
        const status = 'adoptable';
        fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (resp) {

            // Return the response as JSON
            return resp.json();

        }).then(function (data) {

            // Log the API data
            console.log('token', data);
            localStorage.setItem('access-token',JSON.stringify(data.access_token));
            const action = updateAccessToken(data.access_token)
            dispatch(action)

            // Return a second API call
            // This one uses the token we received for authentication
            return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
                headers: {
                    'Authorization': data.token_type + ' ' + data.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        }).then(function (resp) {

            // Return the API response as JSON
            return resp.json();

        }).then(function (data) {

            // Log the pet data
            console.log('pets', data);
            localStorage.setItem('petsList',JSON.stringify(data.animals));
            const action = updatePetsList(data.animals);
            dispatch(action);

        }).catch(function (err) {

            // Log any errors
            console.log('something went wrong', err);

        });
    }
    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const index = users.findIndex(user => user.email === values.email && user.password === values.password);
        if(index>=0) {
            localStorage.setItem('currentUser',JSON.stringify(values))
            const action = updateCurrentUser(values)
            dispatch(action);
            handleTakeAccessToken()
            if(closeDialog) {
                closeDialog();
            }
        } else {
            console.log('Email or password is wrong!')
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit}></LoginForm>
        </div>
    );
}

export default Login;