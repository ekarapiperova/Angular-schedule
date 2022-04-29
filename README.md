# This is app for work schedule
This is an app where you can add your work shifts for ypur workers, you can add or delete the shift.
## Start New Application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Start REST Server
cd reactAPi npm start work on port:3000
## Create file themeServices.js - all fetch request from back-end
loadTheme(),loadThemes(),getMyThemes(),saveTheme(),deleteTheme()
## Create Theme func Component / view one theme info by id
## Create Themes func Component / view for all themes
 fetchThemes(): void {
    this.themes = undefined;
    this.contentService.loadThemes().subscribe(themes => this.themes = themes);
  }
## Create New theme func Component
### function for new theme save
 createTheme(form: NgForm): void {
    if (form.invalid) { return; }
    this.contentService.saveTheme(form.value).subscribe({
      next: () => {
        this.router.navigate(['/theme']);
      },
      error: (err) => {
        console.log(err);
      }
### form for new shift

## Add UserService 
login(), register(), logout
## Login and Register component

## Create user profile
In this page ypu can edit user's email, you can see list of one user's shifts


