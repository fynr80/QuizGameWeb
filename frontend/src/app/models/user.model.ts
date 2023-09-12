export class UserModel {
  gamesWon?: number;
  history?: any[];
  id?: number;
  role?: string;
  username: string;
  email: string;
  status: string = 'offline';

  constructor(
    gamesWon: number,
    history: any[],
    role: string,
    username: string,
    email: string,
    id: number
  ) {
    this.gamesWon = gamesWon;
    this.history = history;
    this.id = id;
    this.role = role;
    this.username = username;
    this.email = email;
  }
}
