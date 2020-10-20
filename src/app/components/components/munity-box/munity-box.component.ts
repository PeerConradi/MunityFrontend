import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-munity-box',
  templateUrl: './munity-box.component.html',
  styleUrls: ['./munity-box.component.css']
})
export class MunityBoxComponent implements OnInit {

  @Input() showcontent: boolean = true;

  @Input() title: string;

  @Input() toolbox: boolean = false;

  @Input() minimizable: boolean = true;

  @Input() closeable: boolean = false;

  @Input() outlined: boolean = false;

  colorscheme: string = "";

  @Input('color')
  public set color(v: string) {
    this.colorscheme = v;
  }


  closed = false;

  constructor() {

  }

  ngOnInit() {
  }

  toggleContent() {
    this.showcontent = !this.showcontent;
  }

  closeBox() {
    this.closed = true;
  }

}
