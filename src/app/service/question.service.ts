import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getQuestionJson(): Observable<any> {
    return this.httpClient.get<any>(this.url + "questions/all");
  }

  getQuestionsText(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + "questions/all-texts");
  }
}
