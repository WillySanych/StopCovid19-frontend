import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizPayload} from "./quiz/quiz-payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  addQuiz(quizPayload: QuizPayload) {
    return this.httpClient.post(this.url + "api/quizzes/", quizPayload);
  }

  getAllQuizzes(): Observable<Array<QuizPayload>> {
    return this.httpClient.get<Array<QuizPayload>>(this.url + "api/quizzes/all");
  }

  getQuiz (permaLink: Number):Observable<QuizPayload> {
     return this.httpClient.get<QuizPayload>(this.url + "api/quizzes/get/" + permaLink);
  }
}
