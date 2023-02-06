class Constant {
  static readonly NAME_PATTERN = /^['A-Z][A-Za-z'\-()& ]{1,20}$/;
  static readonly UPPERCASE_CHARACTER_PATTERN = /.*[A-Z]/;
  static readonly LOWERCASE_CHARACTER_PATTERN = /.*[a-z]/;
  static readonly SPECIAL_CHARACTER_PATTERN = /.*[-_!@#$%^&*.,?]/;
  static readonly NUMBER_PATTERN = /.*\d/;

  static readonly NAME_MIN_LENGTH = 2;
  static readonly NAME_MAX_LENGTH = 40;
  static readonly PASSWORD_MIN_LENGTH = 6;
  static readonly PASSWORD_MAX_LENGTH = 16;
}

export default Constant;
