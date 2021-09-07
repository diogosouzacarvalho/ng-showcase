import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.scss']
})
export class AsyncButtonComponent implements OnInit {
  @Input() text = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  constructor() { }

  ngOnInit(): void {
  }
}
