import { Component } from '@angular/core';
import { NgForm,  } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.scss']
})
export class NewThemeComponent {

  users: IUser[] | undefined;

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private router: Router
  ) {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.users = undefined;
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  
  createTheme(form: NgForm): void {
    if (form.invalid) { return; }
    this.contentService.saveTheme(form.value).subscribe({
      next: () => {
        this.router.navigate(['/theme']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
