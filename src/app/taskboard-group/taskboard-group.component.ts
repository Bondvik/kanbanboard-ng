import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {Status} from "../shared/enums/status";
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
  localTask: any = null;

  constructor(
    protected el: ElementRef,
    protected render: Renderer2,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const article = this.el.nativeElement.querySelector('.taskboard__group');
    this.render.setAttribute(article, 'data-status', this.status);
  }

  onEditClick(task: any) {
    this.localTask = Object.assign({}, task);
    this.dataService.updateTask(task);
  }

  onEscKeyDown(task: any, event: any) {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.dataService.updateTask(this.localTask, true);
    }
    if (['Enter'].includes(event.key)) {
      this.dataService.updateTask(task);
    }
  }

  onDeleteClick() {
    const ids = this.tasks.map(({id}) => id);
    this.dataService.deleteTask(ids);
  }
}
