import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {QuizPayload} from "../payloads/quiz-payload";
import {QuizService} from "../service/quiz.service";
import {Router} from "@angular/router";
import {QuestionPayload} from "../payloads/question-payload";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizPayload: QuizPayload
  questionList: QuestionPayload[] = []
  currentQuestion: number = 0
  answerList: string[] = []
  radiobutton = "radiobutton"
  checkbox = "checkbox"
  text = "text"

  constructor(private questionService: QuestionService, private addQuizService: QuizService, private router: Router) {
    this.quizPayload = {
      id: "",
      username: "",
      createdOn: 0,
      answers: []
    }
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
          for (let i = 0; i < res.length; i++) {
            this.questionList[i] = {
              id: res[i].id,
              questionText: res[i].questionText,
              questionAnswers: [],
              typeOfQuestion: res[i].typeOfQuestion
            }
            for(let j = 0; j < res[i].questionAnswers.length; j++){
              this.questionList[i].questionAnswers[j] = {
                text: res[i].questionAnswers[j],
                isSelected: false,
              }
            }
          }
          console.log(res)
          console.log(this.questionList)
        }
      )
  }

  collectingData() {
    this.answerList[this.currentQuestion] = this.questionList[this.currentQuestion]?.questionAnswers.filter(
      (x: { isSelected: boolean; }) => x.isSelected).map((x: { text: any; }) => x.text).join(", ").toString();
    console.log(this.answerList.toString())
  }

  nextQuestion() {
    if (this.currentQuestion === 5 && this.answerList[5] === "Нет") {
      this.currentQuestion += 3;
    } else if (this.currentQuestion === 8 && this.answerList[8] === "Нет") {
      this.currentQuestion += 2;
    } else {
      this.currentQuestion++;
    }
  }

  previousQuestion() {
    if (this.currentQuestion === 8 && this.answerList[5] === "Нет") {
      this.currentQuestion -= 3;
    } else if (this.currentQuestion === 10 && this.answerList[8] === "Нет") {
      this.currentQuestion -= 2;
    } else {
      this.currentQuestion--;
    }
  }

  addQuiz() {
    this.quizPayload.answers = this.answerList;

    this.addQuizService.addQuiz(this.quizPayload).subscribe(data => {
      this.router.navigateByUrl("/");
    }, error => {
      console.log("Failure response");
    })
  }

}
