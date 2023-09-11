export class questionModal {
  id?: number;
  description?: string;
  answers?: string[];
  correctAnswers?: string[];
  constructor(
    id: number,
    description: string,
    answers: string[],
    correctAnswers: string[]
  ) {
    this.id = id;
    this.answers = answers;
    this.description = description;
    this.correctAnswers = correctAnswers;
  }
}
