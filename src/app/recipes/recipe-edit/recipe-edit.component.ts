import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/model/ingredient.model';
import { Recipe } from 'src/app/core/model/recipe.model';
import { AlertService } from 'src/app/core/Services/alert.service';
import { RecipeService } from 'src/app/core/Services/recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy, AfterViewInit {
    recipeForm!: FormGroup;
    editMode!: boolean;
    recipeIngredientsArray!: FormArray;
    editRecipeIndex!: number;
    routePamamsSub!: Subscription;
    isLoading!: boolean;
    recipeName: string = '';
    isImgShowed: boolean = false;
    imagePreviewUrl: string = '';

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private recipeService: RecipeService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.routePamamsSub = this.route.params.subscribe((params) => {
            params['id'] ? (this.editMode = true) : (this.editMode = false);
            this.editRecipeIndex = params?.['id'];
            this.initReactiveForm();
        });
    }

    ngAfterViewInit() {}

    initReactiveForm() {
        let name = '',
            description = '',
            imageUrl = '',
            hour,
            min,
            serving,
            calo,
            category,
            ingredients = this.fb.array([
                this.fb.group({
                    name: ['', [Validators.required]],
                    amount: ['', [Validators.required, Validators.min(1)]],
                    unit: ['', [Validators.required]],
                }),
            ]);

        if (this.editMode && this.editRecipeIndex) {
            let recipe: Recipe = this.recipeService.getRecipeItem(this.editRecipeIndex);
            name = recipe.name;
            description = recipe.description;
            imageUrl = recipe.imageUrl;
            hour = recipe.time.hour;
            min = recipe.time.min;
            serving = recipe.serving;
            calo = recipe.calo;
            category = recipe.category;
            ingredients = this.fb.array([]); //làm rỗng formarray của ingredients

            if (recipe.ingredients) {
                for (let item of recipe.ingredients) {
                    ingredients.push(
                        this.fb.group({
                            name: [item.name, [Validators.required]],
                            amount: [item.amount, [Validators.required, Validators.min(1)]],
                            unit: [item.unit, [Validators.required]],
                        })
                    );
                }
            }
        }

        //Initialize the Form
        this.recipeForm = this.fb.group({
            name: [name, [Validators.required]],
            description: [description, [Validators.required]],
            imageUrl: [imageUrl, [Validators.required]],
            serving: [serving, [Validators.required, Validators.min(1)]],
            calo: [calo, [Validators.required, Validators.min(1)]],
            category: [category, [Validators.required]],
            time: this.fb.group({
                hour: [hour, [Validators.required, Validators.min(0)]],
                min: [min, [Validators.required, Validators.min(1)]],
            }),
            ingredients,
        });

        //get Form Array of Ingredients
        this.recipeIngredientsArray = this.recipeForm.get('ingredients') as FormArray;

        this.isLoading = false;
    }

    onPreviewImg(url: string) {
        this.imagePreviewUrl = url;
        this.isImgShowed = !this.isImgShowed;
        this.isImgShowed ? this.recipeForm.controls['imageUrl'].disable() : this.recipeForm.controls['imageUrl'].enable();
    }

    addIngredient() {
        let newIngredient = this.fb.group({
            name: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            unit: ['', [Validators.required]],
        });
        this.recipeIngredientsArray.push(newIngredient);
    }

    onRemoveIngredient(index: number) {
        this.recipeIngredientsArray.removeAt(index);
    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }

    onSubmit() {
        if (this.editMode) {
            this.recipeService.updateRecipeItem(this.editRecipeIndex, this.recipeForm.value);
            this.alertService.newAlert.next({message: `${this.recipeForm.value.name} is Successfully Updated`, success: true})
        } else {
            this.recipeService.addNewRecipe(this.recipeForm.value);
            this.alertService.newAlert.next({message: `${this.recipeForm.value.name} is Successfully Created`, success: true})
        }

        this.onCancel();
    }

    ngOnDestroy() {
        this.routePamamsSub.unsubscribe();
        if (!this.editMode) {
        }
    }
}
