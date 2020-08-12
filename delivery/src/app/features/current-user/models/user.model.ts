export interface RegisterUserInputModel {
  username: string;
  password: string;
  userRole: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}
