import { Component, OnInit } from '@angular/core';
import { getUserListFromStorage } from '../../utilities/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BootCampApp';

  ngOnInit() {
    if (getUserListFromStorage()) {
      localStorage.clear();
    }
  }
}
