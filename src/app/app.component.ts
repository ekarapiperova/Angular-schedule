import { Component } from '@angular/core';
import { ContentService } from './core/services/content.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  toggleTemplate = false;

  get isAuthenticating(): boolean {
    return this.userService.user === undefined;
  }

  constructor(
    private userService: UserService
  ) {
    this.userService.getProfileInfo().subscribe({
      error: (error) => {
        this.userService.user = null;
        throw error;
      }
    })
  }
}
