import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import {DatePipe} from "@angular/common";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faLinkedIn = faLinkedin;
  faGithub = faGithub;
  faCopyright = faCopyright;
  today = new Date();
  protected readonly faUser = faUser;
}
