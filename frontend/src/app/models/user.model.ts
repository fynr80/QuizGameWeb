export class UserModel {
  gamesWon?: number;
  history?: any[];
  id?: number;
  role?: string;
  username: string;
  email: string;

  constructor(
    gamesWon: number,
    history: any[],

    role: string,
    username: string,
    email: string
  ) {
    this.gamesWon = gamesWon;
    this.history = history;

    this.role = role;
    this.username = username;
    this.email = email;
  }
}
