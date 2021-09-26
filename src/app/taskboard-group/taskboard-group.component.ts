import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
@Component({
  selector: 'app-taskboard-group',
  templateUrl: './taskboard-group.component.html',
  styleUrls: ['./taskboard-group.component.css']
})
export class TaskboardGroupComponent implements OnInit, AfterViewInit {
  @Input() statusLabel: string = '';
  @Input() status: string = '';
  @Input() tasks: any[] = [];
  @Input() isBasket = false;
  @Input() message: string = '';

  constructor(
    protected el: ElementRef,
    protected render: Renderer2
  ) {
  }

  ngOnInit(): void {
    console.log(this.tasks)
  }
  ngAfterViewInit() {
    console.dir(this.el)
    const article = this.el.nativeElement.querySelector('.taskboard__group');
    this.render.setAttribute(article, 'data-status', this.status);
  }

}
