import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    username: Yup.string()
        .min(2, 'Username is too short')
        .max(15, 'Username is too long')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password is too short')
        .max(16, 'Password is too long')
        .required('Password is required')
  });



  