import { Component, OnDestroy } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators ,NgSelectOption} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  killSubscription = new Subject();

  form: FormGroup;
  type= [
    { key: 'Admin', value: 'Admin', isSelected: false },
    { key: 'Wroker', value: 'Worker', isSelected: false }
  ];
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, emailValidator]],
      type: [''],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, sameValueAsFactory(
        () => this.form?.get('password'), this.killSubscription
      )]]
    });
  }

  register(): void {
    if (this.form.invalid) { return; }
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

}
