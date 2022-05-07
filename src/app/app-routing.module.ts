import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {QuizComponent} from "./quiz/quiz.component";
import {ResultsComponent} from "./results/results.component";
import {QuizResultComponent} from "./quiz-result/quiz-result.component";
import {AuthGuard} from "./auth/guard/auth.guard";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "quiz", component: QuizComponent, canActivate: [AuthGuard], data:{roles:["PATIENT"]}},
  {path: "results", component: ResultsComponent, canActivate: [AuthGuard], data:{roles:["DOCTOR"]}},
  {path: "result/:id", component: QuizResultComponent, canActivate: [AuthGuard], data:{roles:["DOCTOR"]}},
  {path: "admin-panel", component: AdminPanelComponent, canActivate: [AuthGuard], data:{roles:["ADMIN"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
