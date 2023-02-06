import Constant from '@constants/constant';

const en = {
  // Validate name
  name_general:
    'name must start with a capital letter and must not contain special characters',
  name_min_length: `name must contain at least ${Constant.NAME_MIN_LENGTH} characters`,
  name_max_length: `name must contain at most ${Constant.NAME_MAX_LENGTH} characters`,
  name_required: 'name is required',

  // Validate email address
  email_address_invalid: 'email address is invalid',
  email_address_required: 'email address is required',

  // Validate password
  password_require_uppercase_character:
    'password must contain at least an uppercase character',
  password_require_lowercase_character:
    'password must contain at least a lowercase character',
  password_require_number: 'must contain at least a number',
  password_require_special_character:
    'password must contain at least a special character',
  password_min_length: `password must contain at least ${Constant.PASSWORD_MIN_LENGTH} characters`,
  password_max_length: `password must contain at most ${Constant.PASSWORD_MAX_LENGTH} characters`,
  password_required: 'password is required',
  confirm_password_required: 'confirm password is required',
  password_not_match: 'confirm password does not match with password',
  password_not_one_of:
    'new password must be different from the current password',
};

export default en;
