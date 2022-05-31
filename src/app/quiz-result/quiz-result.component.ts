import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../service/quiz.service";
import {QuizPayload} from "../payloads/quiz-payload";
import {QuestionService} from "../service/question.service";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  quiz: QuizPayload
  permaLink: Number
  questionsText: string[]

  constructor(private router: ActivatedRoute, private quizService: QuizService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params["id"]
    });
    this.questionService.getQuestionsText().subscribe( (data: string[]) => {
      this.questionsText = data
    }, (err:any) => {
      console.log("Failure response")
    });
    this.quizService.getQuiz(this.permaLink).subscribe((data: QuizPayload) => {
        this.quiz = data
      }, (err: any) => {
        console.log("Failure response")
      }
    )
  }


}
