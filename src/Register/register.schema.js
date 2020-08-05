import * as Yup from 'yup';
import config from "../config";

async function validateUsername(value) {
        console.log(value);
        const res = await fetch(config.apiUrl + '/users/username-validation', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: value})
        });
        console.log(res.status)
        console.log(res.ok);
        if (res.ok){
            console.log('Yes');


        } else if (!res.ok) { //send error massage
            console.log('No');
            return false

        } else {
            console.log('unknown error');
            return false

        }

    return true

    };


export const RegisterSchema = Yup.object({
    username: Yup.string()
        .min(2, 'Username is too short')
        .max(15, 'Username is too long')
        .required('Username is required')
        .test(validateUsername),
    email: Yup.string()
        .email('email is invalid')
        .required('Password is required'),
    password: Yup.string()
        .min(6, 'Password is too short')
        .max(16, 'Password is too long')
        .required('Password is required'),
    agreeToTerms: Yup.boolean()
        .oneOf([true],'You must agree to terms')
    }



  );



