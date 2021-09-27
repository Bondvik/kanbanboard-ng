import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title = new FormControl('', Validators.required);

  constructor( private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dataService.addTask(this.title.value);
    this.title.setValue('');
  }

}
