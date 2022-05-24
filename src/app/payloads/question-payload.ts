export class QuestionPayload {
  id: number;
  questionText: string;
  questionAnswers: QuestionAnswers[];
  typeOfQuestion: string;
}

class QuestionAnswers {
  text: string;
  isSelected: boolean;
}
