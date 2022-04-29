import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../quiz.service";
import {QuizPayload} from "../quiz/quiz-payload";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  quiz: QuizPayload
  permaLink: Number

  constructor(private router: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      this.permaLink = params["id"]
    })
    this.quizService.getQuiz(this.permaLink).subscribe( (data: QuizPayload) => {
      this.quiz = data
    }, (err: any) => {
      console.log("FailureResponse")
      }
    )
  }


}
