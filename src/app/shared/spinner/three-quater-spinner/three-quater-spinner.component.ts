import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-quater-spinner',
  template: `
    <div class="three-quarters-loader"></div>
  `,
  styleUrls: ['./three-quater-spinner.component.scss']
})
export class ThreeQuaterSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
