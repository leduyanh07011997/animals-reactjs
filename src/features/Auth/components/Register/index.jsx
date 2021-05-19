
import PropTypes from 'prop-types';
import React from 'react';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
   switchForm: PropTypes.func, 
};

function Register({switchForm}) {
    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem('users'))
        console.log(values)
        if(users) {
            const isExist = users.filter(user => user.email !== values.email)
            if (isExist) {
                users.push(values)
                localStorage.setItem('users', JSON.stringify(users))
                if(switchForm){
                    switchForm('login')
                }
            } else {
                console.log('Your email is exist')
            }
        } else {
            const users = [values];
            localStorage.setItem('users', JSON.stringify(users))
            if(switchForm){
                switchForm('login')
            }
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}></RegisterForm>
        </div>
    );
}

export default Register;