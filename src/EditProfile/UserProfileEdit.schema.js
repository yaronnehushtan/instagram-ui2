import * as Yup from 'yup';

export const UserProfileEditSchema = Yup.object({
    avatar: Yup.mixed(),
    bio: Yup.string()
        .max(200, 'Bio is too long'),
    }



  );



