import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizPayload} from "./quiz/quiz-payload";

@Injectable({
  providedIn: 'root'
})
export class AddQuizService {

  constructor(private httpClient: HttpClient) {
  }

  addQuiz(quizPayload: QuizPayload) {
    this.httpClient.post('http://localhost:8080/api/api/quizzes', quizPayload)
  }
}
