import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskboardGroupComponent } from './taskboard-group/taskboard-group.component';
import { DatasetIdDirective } from './shared/directives/dataset-id.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    TaskBoardComponent,
    TaskboardGroupComponent,
    DatasetIdDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
