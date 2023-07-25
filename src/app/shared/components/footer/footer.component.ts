import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentYear: number;
  appVersion: string;

  constructor() {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.appVersion = environment.version;
  }
}
