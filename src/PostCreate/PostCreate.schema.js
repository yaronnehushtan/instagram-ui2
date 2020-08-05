import * as Yup from 'yup';
import config from "../config";


//
// const buildFormData = (values) =>{
//     const data = new FormData();  //loop on all "values" object and append each of the values to Formdata. append need to get key and value
//     for (const key in values) {
//         data.append(key, values[key]);
//     }
//     return data;
// }
//
// const uploadImage = async (values) => {
//     // console.log(values)
//     console.log('sucsess!!')
//     const data = buildFormData(values);
//
//     const res = await fetch(config.apiUrl+ '/posts', {
//         method: 'PUT',
//         credentials:'include',
//         body: data
//     });
//     if (res.status === 201 ){
//         console.log('sucsess!!')
//         const temp = await res.json();
//         // console.log(temp.image)
//         // history.push('/')
//     } else if (res.status === 400) { //send error massage
//         console.log('No');
//     } else {
//         console.log('unknown error');
//
//     }
//     // setUploadPost(res);
//     return true
//
// }


export const PostCreateSchema = Yup.object({
    // mixed is all types
    image: Yup.mixed()
        .required('image is required'),
    description: Yup.string()
        .max(2000, 'Description is too long'),
  });



