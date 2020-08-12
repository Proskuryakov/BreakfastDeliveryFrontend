export class DataService {
  private userId = 1;
  private username = 'login1';
  private role = 'user';
  private personalInfo = {
    firstName: 'Alex',
    lastName: 'Jones',
    email: 'dea@gmail.com',
    phone: '79507718178'
  };

  getUserId(): number {
    return this.userId;
  }

  setUserId(value: number): void {
    this.userId = value;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  getRole(): string {
    return this.role;
  }

  setRole(value: string): void {
    this.role = value;
  }

  getPersonalInfo(): { firstName: string; lastName: string; phone: string; email: string } {
    return this.personalInfo;
  }

  setPersonalInfo(value: { firstName: string; lastName: string; phone: string; email: string }): void {
    this.personalInfo = value;
  }
}
