import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/core/model/ingredient.model';
import { IngredientsService } from 'src/app/core/Services/ingredients.service';
import { ShoppingListService } from 'src/app/core/Services/shopping-list.service';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.scss'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
    //get access to form element
    @ViewChild('form', { static: false }) shoppingEditForm!: NgForm;
    isEdit: boolean = false;
    editIngredient!: Ingredient;
    editIngredientIndex!: number;
    isSuggestNameShow: boolean = false;
    options: string[] = ['Input Name to get Unit'];
    suggestNames: string[] = [];
    initialName: string = '';
    isSearching: boolean = false;

    private ingredientEditedSubscription!: Subscription;

    constructor(private shoppingListService: ShoppingListService, private ingredientService: IngredientsService) {}

    ngOnInit(): void {
        this.ingredientEditedSubscription = this.shoppingListService.ingredientEditedIndex.subscribe((index: number) => {
            //user is editing an ingredient
            this.isEdit = true;

            this.editIngredientIndex = index;
            this.editIngredient = this.shoppingListService.getIngredientItem(index)

            //set value of edit ingredient into form
            this.shoppingEditForm.setValue({
                'ingredientName': this.editIngredient.name,
                'ingredientAmount': this.editIngredient.amount,
                'ingredientUnit': this.editIngredient.unit
            })

        });
    }

    onFocusName(nameInput: HTMLInputElement) {
        this.saveInitialNameOnFocus(nameInput.value)
    }

    saveInitialNameOnFocus(name: string) {
        this.initialName = name;
        console.log(this.initialName)
    }

    onBlurName(nameInput: HTMLInputElement) {
        setTimeout(() => {
            if (!nameInput.value) {
                this.options = ['Input Name to get Unit'];
                return
            } else if (nameInput.value == this.initialName || this.isSearching) {
                return
            }
    
            this.onSuggestUnit(nameInput.value)

        },100)
    }

    onSearchName(searchStr: string) {
        this.isSearching = true;
        this.isSuggestNameShow = true;
        this.suggestNames = [];
        this.ingredientService.getIngredientByName(searchStr).subscribe(data => {
            
            for (let item of data.results) {
                this.suggestNames.push(item.name)
            }

            this.isSearching = false;
        })
        
        
    }

    onSelectName(name: string) {
        this.isSuggestNameShow = false;
        this.shoppingEditForm.form.patchValue({
            'ingredientName': name
        })
        this.onSuggestUnit(name)
    }

    onSuggestUnit(ingredientName: string) {
        this.ingredientService.getIngredientId(ingredientName).pipe(
            switchMap(id => {
                return this.ingredientService.getIngredientInfo(id)
            })
        ).subscribe(data => {
            this.options = [];
            this.options = [...data.unit]
        })
    }

    onUpdateIngredients() {
        //check if all input filled
        if (this.shoppingEditForm.invalid) return

        //check if user is editing or adding
        if (this.isEdit) {
            this.shoppingListService.updateEditIngredientItem(this.editIngredientIndex, this.getIngredientData())
            this.isEdit = false;
        } else {
            this.shoppingListService.onAddIngredients([this.getIngredientData()]);
        }

        this.onClear();
    }

    onClear() {
        this.shoppingEditForm.reset()
        this.isEdit = false;
    }

    getIngredientData(): Ingredient {
        let obj: Ingredient = {
            name: this.shoppingEditForm.controls['ingredientName'].value,
            amount: this.shoppingEditForm.controls['ingredientAmount'].value,
            unit: this.shoppingEditForm.controls['ingredientUnit'].value,
        }
        return obj
    }

    onSubmit(): void {
        this.onUpdateIngredients()
    }

    ngOnDestroy() {
        this.ingredientEditedSubscription.unsubscribe();
    }
}
