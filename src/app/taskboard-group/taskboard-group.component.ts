import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {Task} from "../shared/intefaces/task";

@Component({
  selector: 'app-taskboard-group',
  templateUrl: './taskboard-group.component.html',
  styleUrls: ['./taskboard-group.component.css']
})
export class TaskboardGroupComponent implements OnInit, AfterViewInit {
  @Input() statusLabel: string = '';
  @Input() status: string = '';
  @Input() tasks: Task[] = [];
  @Input() isBasket = false;
  @Input() message: string = '';
  localTask: Task = {} as Task;
  article: HTMLElement | null = null;

  constructor(
    protected el: ElementRef,
    protected render: Renderer2,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.initTasksObserver();
  }

  ngAfterViewInit() {
    this.article = this.el.nativeElement.querySelector('.taskboard__group');
    this.render.setAttribute(this.article, 'data-status', this.status);
  }

  initTasksObserver() {
    this.dataService.observerTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      }
    )
  }

  onEditClick(task: Task) {
    this.localTask = Object.assign({}, task);
    this.dataService.updateTask(task, false);
  }

  onEscKeyDown(task: Task, event: KeyboardEvent) {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.dataService.updateTask(this.localTask, true);
    }
    if (['Enter'].includes(event.key)) {
      this.dataService.updateTask(task);
    }
  }

  onDeleteClick() {
    this.dataService.deleteTask();
  }

  onTaskBoardGroupDragover(event: DragEvent) {
    event.preventDefault();
    //перетаскиваемый элемент
    const draggedElement = this.dataService.getDraggedElement();

    //тот элемент на который падает draggedElement (перетаскиваемый элемент)
    const droppedItem: HTMLDivElement = event.target as HTMLDivElement;

    //если событие произошло на том элементе, который мы перемещаем
    if (droppedItem === draggedElement) {
      return;
    }

    //находим referenceElement - элемент, ПЕРЕД которым будет вставлен
    //перемещаемый элемент draggedElement
    const referenceElement = (droppedItem === draggedElement.nextElementSibling) ?
      droppedItem.nextElementSibling : droppedItem;

    if (droppedItem.classList.contains('task')) {
      this.render.insertBefore(this.article?.querySelector('.taskboard__list'), draggedElement, referenceElement);
    }
  }

  onTaskDragstart(event: DragEvent) {
    (event.target as HTMLDivElement).classList.add('task--dragged');
    this.dataService.setDraggedElement(event.target);
  }

  onTaskDragend(event: DragEvent, task: Task) {
    const draggedElement = this.dataService.getDraggedElement();
    //для обновления позиции в массиве задач
    const prevTaskId = (event.target as HTMLDivElement).previousElementSibling ?
      (event.target as any).previousElementSibling?.dataset?.id : undefined;

    //для обновления статуса
    const newTaskStatus = this.getParentElement(draggedElement, 'taskboard__group');
    if (newTaskStatus) {
      this.dataService.updateTaskStatus(task, newTaskStatus)
    }
    this.dataService.updatePosition(task, prevTaskId);

    this.dataService.setDraggedElement(null);
    (event.target as HTMLDivElement).classList.remove('task--dragged');
    delete task.prevTaskId;
  }

  protected getParentElement(element: HTMLElement, classElement: string): string | undefined {
    let parent: string | undefined;
    if ((element as HTMLElement).parentElement?.classList?.contains(classElement)) {
      parent = element?.parentElement?.dataset?.status;
    } else {
      parent = this.getParentElement((element?.parentElement as HTMLElement), classElement);
    }
    return parent;
  }
}
