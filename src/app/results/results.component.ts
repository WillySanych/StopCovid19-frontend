import {Component, OnInit} from '@angular/core';
import {QuizService} from "../service/quiz.service";
import {QuizPayload} from "../payloads/quiz-payload";
import {PageEvent} from "@angular/material/paginator";
import {PagingPayload} from "../payloads/paging-payload";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  requestAllQuizzesPayload: PagingPayload;
  quizzes: Array<QuizPayload>;
  totalElements: number = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.requestAllQuizzesPayload = {
      page: 0,
      size: 5
    }
    this.getAllQuizzes(this.requestAllQuizzesPayload)
  }

  nextPage(event: PageEvent) {
    this.requestAllQuizzesPayload.page = event.pageIndex;
    this.requestAllQuizzesPayload.size = event.pageSize;
    this.getAllQuizzes(this.requestAllQuizzesPayload);
  }

  getAllQuizzes(requestAllQuizzesPayload: PagingPayload) {
    this.quizService.getAllQuizzes(requestAllQuizzesPayload).subscribe(res => {
      this.quizzes = res.content;
      this.totalElements = res.totalElements;
    }, error => {
      console.log("Error while getting results");
    })

  }

}
