import { Component } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';
import {ITheme } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  themes: ITheme[] | undefined;


  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    this.fetchThemes();
  
  }

  fetchThemes(): void {
    this.themes = undefined;
    this.contentService.loadThemes().subscribe(themes => this.themes = themes);
  }
  
   
}
