import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.putEvents()
  }

  putEvents(){
    const menuDesktop = document.getElementById("desktop-menu")
    const menuMobile = document.getElementById("toggle-action")

    menuMobile.addEventListener('click', function(){
      menuDesktop.classList.toggle('active')
    })
  }

}
