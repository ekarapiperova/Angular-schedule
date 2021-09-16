import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemesComponent } from './themes/themes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ThemesComponent
  }, {
    path: 'new',
    component: NewThemeComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/',
    }
  },
 
   {
    path: ':themeId',
    component: ThemeComponent
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
