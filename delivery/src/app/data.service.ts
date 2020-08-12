export class DataService {
  private id = 0;
  private username = '';
  private userRole = '';
  private personalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  getUserId(): number {
    return this.id;
  }

  setUserId(value: number): void {
    this.id = value;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  getRole(): string {
    return this.userRole;
  }

  setUserRole(value: string): void {
    this.userRole = value;
  }

  getPersonalInfo(): { firstName: string; lastName: string; phone: string; email: string } {
    return this.personalInfo;
  }

  setPersonalInfo(value: { firstName: string; lastName: string; phone: string; email: string }): void {
    this.personalInfo = value;
  }
}
