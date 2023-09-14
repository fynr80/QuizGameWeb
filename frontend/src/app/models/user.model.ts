export class UserModel {
  gamesWon?: number;
  gamesLost?: number;
  gamesDraw?: number;
  history?: any[];
  id?: number;
  role?: string;
  username: string;
  email: string;
  status: string = 'offline';

  constructor(
    gamesWon: number,
    gamesLost: number,
    gamesDraw: number,
    history: any[],
    role: string,
    username: string,
    email: string,
    id: number
  ) {
    this.gamesWon = gamesWon;
    this.gamesLost = gamesLost;
    this.gamesDraw = gamesDraw;
    this.history = history;
    this.id = id;
    this.role = role;
    this.username = username;
    this.email = email;
  }
}
