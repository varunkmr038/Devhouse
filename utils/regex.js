const regex = {
  name: /^[a-zA-Z]{3,20}(\s)?([a-zA-Z]){0,20}(\s+)?$/,
  // should only contain alphabets and one space between first and last name and length between 3 to 60

  email:
    /^([a-zA-Z0-9])([A-Za-z0-9]|(_(?!_))|(-(?!-))|(\.(?!\.))){2,58}[a-zA-Z0-9]@[a-zA-Z]([a-zA-Z0-9-]){2,19}[.]{1}([a-z]){1,6}[.]{0,1}[a-z]{1,5}$/, //1. Email Should start and end with alphanumeric character and contain only alphanumeric , dot , underscore, hyphen and length between 3 to 30
  // 2. Domain name should start with alphabet and can contain alphanumeric with hyphen and length between 4 to 60
  // 3. 2 special characters should not be consecutive
  // 4. can only use . atmost two times  after domain

  username: /^[a-z]([0-9a-z_]){4,19}$/, // Username should only contain small alphabets with numbers and _ symbol. It should starts with alphabet and length between 5 to 20

  dob: /^(0?[1-9]|[1-2]?[0-9]|3?[0-1])-(0?[1-9]|1?[0-2])-((1?[9][2-9][0-9])|(2?[0][0-2][0-9]))$/,
  // 1. Year are from 1920 to 2029

  phone: /^([7-9])([0-9]){9}$/, // should start with 7-9

  password:
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&^])([a-zA-Z0-9@$!%*?&^]{8,30})$/,
  // 1. Atleast 1 lower and upper case letter
  // 2. Atleast one digit
  // 3. Atleast one special charcter
  // 4. Length  8- 30
  postText: /^[a-zA-Z]([A-za-z0-9]|( (?! ))){3,100}(\s+)?$/, // should start with letter not contain special characters and length between 4 and 100 and spaces at the end are optional and should not contain 2 spaces in between
  postLocation: /^[a-zA-Z]([A-za-z0-9]|(,(?= ))|( (?! ))){3,39}[a-zA-Z](\s+)?$/,
  //  Should not contain 2 spaces in between and should only have space after comma
};

export default regex;
