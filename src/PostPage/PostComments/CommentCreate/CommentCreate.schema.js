import * as Yup from 'yup';

export const CommentCreateSchema = Yup.object({
    content: Yup.string()
        .min(1, 'comment cant be empty')
        .max(140, 'comment is too long')
        .required('comment is required')
  });



