export class DataService {
  private userId = 1;

  getUserId(): number {
    return this.userId;
  }

  setUserId(value: number): void {
    this.userId = value;
  }
}
