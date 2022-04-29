import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ContentService } from '../../core/services/content.service';
import {ITheme, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  inUpdateMode = false;

  isLoading = true;

  get user() {
    return this.userService.user;
  }
  get username(): string {
    return this.userService.user?.username || '';
  }
  themes: ITheme[] | undefined; 
  
  constructor(
    private userService: UserService,
    private contentService: ContentService, 
     private activatedRoute: ActivatedRoute
  ) { 
    this.fetchMyThemes();
    this.userService.getProfileInfo().subscribe(() => {
      this.isLoading = false;
    });
  
    
  }

  updateProfile(form: NgForm): void {
    if (form.invalid) { return; }
    this.userService.updateProfile(form.value).subscribe({
      next: () => {
       
        this.inUpdateMode = false;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
   fetchMyThemes(): void {
    this.contentService.getMyThemes(this.username).subscribe(themes => this.themes = themes);
  }
  fetchTheme(): void {
    this.themes = undefined;
    const id = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params);
    this.contentService.getMyThemes(id).subscribe(themes => this.themes = themes);
  }

}
