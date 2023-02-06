import Constant from '@constants/constant';
import en from '@locales/en';
import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .matches(Constant.NAME_PATTERN, en.name_general)
  .min(Constant.NAME_MIN_LENGTH, en.name_min_length)
  .max(Constant.NAME_MAX_LENGTH, en.name_max_length)
  .required(en.name_required);

export const emailSchema = yup
  .string()
  .email(en.email_address_invalid)
  .required(en.email_address_required);

export const passwordSchema = yup
  .string()
  .matches(
    Constant.UPPERCASE_CHARACTER_PATTERN,
    en.password_require_uppercase_character
  )
  .matches(
    Constant.LOWERCASE_CHARACTER_PATTERN,
    en.password_require_lowercase_character
  )
  .matches(Constant.NUMBER_PATTERN, en.password_require_number)
  .matches(
    Constant.SPECIAL_CHARACTER_PATTERN,
    en.password_require_special_character
  )
  .min(6, en.password_min_length)
  .max(20, en.password_max_length)
  .required(en.password_required);

export const signInFormSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpFormSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

export const userFormSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});
