export class QuizModel {
  userId1?: string;
  userId2?: string;
  winnerUserName?: string;

  constructor(userId1: string, userId2: string, winnerUserName: string) {
    this.userId1 = userId1;
    this.userId2 = userId2;
    this.winnerUserName = winnerUserName;
  }
}
