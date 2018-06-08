import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientService} from "../../services/ingredient.service";
import {Subscription} from "rxjs/Subscription";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {
  @ViewChild('f') userCreateForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ingredients: Ingredient[];

  id: number;
  user: User;
  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private ingredientService: IngredientService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      company: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    if (this.id) { //edit form
      this.userService.findById(this.id).subscribe(
        user => {
          this.id = user.id;
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            company: user.company,
            address: user.address
          });
        },error => {
          console.log(error);
        }
      );
    }

    this.subscription = this.ingredientService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.ingredientService.getIngredient(index);
          this.userCreateForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );

    this.ingredients = this.ingredientService.getIngredients();
    this.subscription = this.ingredientService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.id) {
        let user: User = new User(this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['company'].value,
          this.userForm.controls['address'].value);
          this.userService.updateUser(user).subscribe();
          this.router.navigate(['/user']);
      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['company'].value,
          this.userForm.controls['address'].value);
          this.userService.saveUser(user).subscribe();
          this.router.navigate(['/user']);
      }
      this.userForm.reset();
      this.router.navigate(['/user']);
    }
  }
  onSubmitValidate(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.ingredientService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.ingredientService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }
  onClear() {
    this.userCreateForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.ingredientService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onEditItem(index: number) {
    this.ingredientService.startedEditing.next(index);
  }

  redirectUserPage() {
    this.router.navigate(['/user']);
  }

}
