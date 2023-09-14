export class QuizModel {
  username1?: string;
  username2?: string;
  //  user1Id?: number;
  //  user2Id?: number;

  winnerUsername?: string;

  constructor(
    username1: string,
    username2: string,
    user1Id: number,
    user2Id: number,
    winnerUsername: string
  ) {
    this.username1 = username1;
    this.username2 = username2;
    // this.user1Id = user1Id;
    // this.user2Id = user2Id;
    this.winnerUsername = winnerUsername;
  }
}
