export interface RegisterUserInputModel {
  username: string;
  password: string;
  userRole: string;
  personalInfo: {
    firstName: string;
    lastname: string;
    phone: string;
    email: string;
  };
}
