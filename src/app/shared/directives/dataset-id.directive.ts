import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDatasetId]'
})
export class DatasetIdDirective implements OnInit {
  @Input() id: string = ''

  constructor(
    protected element: ElementRef,
    protected render: Renderer2
  ) { }

  ngOnInit() {
    this.render.setAttribute(this.element.nativeElement, 'data-id', this.id);
  }
}
