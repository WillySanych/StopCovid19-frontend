import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizPayload} from "../payloads/quiz-payload";
import {Observable} from "rxjs";
import {PagingPayload} from '../payloads/paging-payload';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  addQuiz(quizPayload: QuizPayload) {
    return this.httpClient.post(this.url + "api/quizzes/", quizPayload);
  }

  getAllQuizzes(requestAllQuizzesPayload: PagingPayload): Observable<any> {
    return this.httpClient.get(this.url + `api/quizzes/all?page=${requestAllQuizzesPayload.page}&size=${requestAllQuizzesPayload.size}`);
  }

  getQuiz(permaLink: Number): Observable<QuizPayload> {
    return this.httpClient.get<QuizPayload>(this.url + "api/quizzes/get/" + permaLink);
  }
}
