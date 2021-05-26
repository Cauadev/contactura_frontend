import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)'
  }

  ngOnDestroy(): void{
    document.querySelector('html').style.background = 'none'
  }

}
