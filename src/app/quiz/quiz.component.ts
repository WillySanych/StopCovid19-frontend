import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {QuizPayload} from "./quiz-payload";
import {AddQuizService} from "../add-quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizPayload: QuizPayload

  questionList: any = []
  currentQuestion: number = 0
  answerStringList: string[] = []
  radioAnswerList: string[] = []
  numbersOfCheckboxQuestions: number[] = [3, 11, 12, 14]
  numbersOfRadiobuttonQuestions: number[] = [1, 2, 4, 5, 6, 7, 8, 9, 10, 13]
  numbersOfInputFieldQuestions: number[] = [15]
  fifteenthQuestionAnswer: string

  constructor(private questionService: QuestionService, private addQuizService: AddQuizService) {
    this.quizPayload = {
      id: '',
      username: '',
      firstQuestion: '',
      secondQuestion: '',
      thirdQuestion: '',
      fourthQuestion: '',
      fifthQuestion: '',
      sixthQuestion: '',
      seventhQuestion: '',
      eightQuestion: '',
      ninthQuestion: '',
      tenthQuestion: '',
      eleventhQuestion: '',
      twelfthQuestion: '',
      thirteenthQuestion: '',
      fourteenthQuestion: '',
      fifteenthQuestion: ''
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
    this.answerStringList[this.currentQuestion] = this.questionList[this.currentQuestion]?.options.filter(
      (x: { isSelected: boolean; }) => x.isSelected).map((x: { text: any; }) => x.text).join(" ").toString()
    // console.log(this.answerStringList[this.currentQuestion])
  }

  nextQuestion() {
    if(this.currentQuestion === 5 && this.radioAnswerList[5] === "Нет") {
      this.currentQuestion += 3
    } else if (this.currentQuestion === 8 && this.radioAnswerList[8] === "Нет") {
      this.currentQuestion += 2
    }
    else {
      this.currentQuestion++
    }
  }

  previousQuestion() {
    if (this.currentQuestion === 8 && this.radioAnswerList[5] === "Нет") {
      this.currentQuestion -= 3
    } else if (this.currentQuestion === 10 && this.radioAnswerList[8] === "Нет") {
      this.currentQuestion -= 2
    }
    else {
      this.currentQuestion--
    }
  }

  addQuiz() {
    this.quizPayload.firstQuestion = this.radioAnswerList[0]
    this.quizPayload.secondQuestion = this.radioAnswerList[1]
    this.quizPayload.thirdQuestion = this.answerStringList[2]
    this.quizPayload.fourthQuestion = this.
  }

}
