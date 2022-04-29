import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';
import { ITheme } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {

  theme: ITheme | undefined;
  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.fetchTheme();
  }
  get type(): string {
    return this.userService.user?.type || '';
  } 

  
  deleteTheme():void{
    const id = this.activatedRoute.snapshot.params.themeId;
    this.contentService.deleteTheme(id).subscribe({
      next: () => {
        this.router.navigate(['/theme']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  
  fetchTheme(): void {
    this.theme = undefined;
    const id = this.activatedRoute.snapshot.params.themeId;
    console.log(this.activatedRoute.snapshot.params);
    this.contentService.loadTheme(id).subscribe(theme => this.theme = theme);
  }
}
