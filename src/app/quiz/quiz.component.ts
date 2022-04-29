import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {QuizPayload} from "./quiz-payload";
import {QuizService} from "../quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizPayload: QuizPayload

  questionList: any = []
  currentQuestion: number = 0
  answerList: string[] = []
  numbersOfCheckboxQuestions: number[] = [3, 11, 12, 14]
  numbersOfRadiobuttonQuestions: number[] = [1, 2, 4, 5, 6, 7, 8, 9, 10, 13]
  numbersOfInputFieldQuestions: number[] = [15]

  constructor(private questionService: QuestionService, private addQuizService: QuizService, private router: Router) {
    this.quizPayload = {
      id: "",
      username: "",
      createdOn: "",
      firstQuestion: "",
      secondQuestion: "",
      thirdQuestion: "",
      fourthQuestion: "",
      fifthQuestion: "",
      sixthQuestion: "",
      seventhQuestion: "",
      eighthQuestion: "",
      ninthQuestion: "",
      tenthQuestion: "",
      eleventhQuestion: "",
      twelfthQuestion: "",
      thirteenthQuestion: "",
      fourteenthQuestion: "",
      fifteenthQuestion: ""
    }
  }

  ngOnInit(): void {
    this.getAllQuestions()
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions
      })
  }

  collectingData() {
    // console.log(this.questionList[this.currentQuestion]?.options)
    this.answerList[this.currentQuestion] = this.questionList[this.currentQuestion]?.options.filter(
      (x: { isSelected: boolean; }) => x.isSelected).map((x: { text: any; }) => x.text).join(", ").toString()
    // console.log(this.answerList[this.currentQuestion])
    // console.log(this.answerList)
  }

  nextQuestion() {
    if (this.currentQuestion === 5 && this.answerList[5] === "Нет") {
      this.currentQuestion += 3
    } else if (this.currentQuestion === 8 && this.answerList[8] === "Нет") {
      this.currentQuestion += 2
    } else {
      this.currentQuestion++
    }
  }

  previousQuestion() {
    if (this.currentQuestion === 8 && this.answerList[5] === "Нет") {
      this.currentQuestion -= 3
    } else if (this.currentQuestion === 10 && this.answerList[8] === "Нет") {
      this.currentQuestion -= 2
    } else {
      this.currentQuestion--
    }
  }

  addQuiz() {
    this.quizPayload.firstQuestion = this.answerList[0]
    this.quizPayload.secondQuestion = this.answerList[1]
    this.quizPayload.thirdQuestion = this.answerList[2]
    this.quizPayload.fourthQuestion = this.answerList[3]
    this.quizPayload.fifthQuestion = this.answerList[4]
    this.quizPayload.sixthQuestion = this.answerList[5]
    this.quizPayload.seventhQuestion = this.answerList[6]
    this.quizPayload.eighthQuestion = this.answerList[7]
    this.quizPayload.ninthQuestion = this.answerList[8]
    this.quizPayload.tenthQuestion = this.answerList[9]
    this.quizPayload.eleventhQuestion = this.answerList[10]
    this.quizPayload.twelfthQuestion = this.answerList[11]
    this.quizPayload.thirteenthQuestion = this.answerList[12]
    this.quizPayload.fourteenthQuestion = this.answerList[13]
    this.quizPayload.fifteenthQuestion = this.answerList[14]

    this.addQuizService.addQuiz(this.quizPayload).subscribe(data => {
      this.router.navigateByUrl("/")
    }, error => {
      console.log("Failure response")
    })
  }

}
