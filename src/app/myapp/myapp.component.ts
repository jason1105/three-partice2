import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myapp',
  templateUrl: './myapp.component.html',
  styleUrls: ['./myapp.component.css']
})
export class MyappComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(12121212);
  }

}
