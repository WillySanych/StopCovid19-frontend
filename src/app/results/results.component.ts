import {Component, OnInit} from '@angular/core';
import {QuizService} from "../quiz.service";
import {Observable} from "rxjs";
import {QuizPayload} from "../quiz/quiz-payload";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  quizzes: Observable<Array<QuizPayload>>

  constructor (private quizService: QuizService ) { }

  ngOnInit(): void {
    this.quizzes = this.quizService.getAllQuizzes()
  }

}
