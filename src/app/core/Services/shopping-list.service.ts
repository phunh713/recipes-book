import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    ingredientListChanged = new Subject<Ingredient[]>();

    ingredientEdited = new Subject<Ingredient>();
    ingredientEditedIndex = new Subject<number>();
    afterIngredientEditedIndex = new Subject<number>();

    isAdd!: Boolean;

    ingredientList: Ingredient[] = localStorage.getItem('ingredientList') ? (JSON.parse(localStorage.getItem('ingredientList') || '')) : [];

    constructor() {}

    getIngredientList() {
        return this.ingredientList.slice();
    }

    getIngredientItem(index: number) {
        return this.ingredientList.slice()[index];
    }

    addIngredientsFromRecipe(Ingredients: Ingredient[]) {
        this.onAddIngredients(Ingredients);
    }

    onAddIngredients(addedIngredients: Ingredient[]) {
        let duplicateIngredientIndex!: number;

        //check if added ingredient is duplicate ?
        addedIngredients.map((addedItem) => {
            duplicateIngredientIndex = this.ingredientList.findIndex((element) => {
                let addedIngredientName = addedItem.name.toLowerCase();
                let ingredientName = element.name.toLowerCase();
                return addedIngredientName === ingredientName;
            });

            if (duplicateIngredientIndex !== -1) {
                this.ingredientList[duplicateIngredientIndex].amount = Number(this.ingredientList[duplicateIngredientIndex].amount) + Number(addedItem.amount);
                this.afterIngredientEditedIndex.next(duplicateIngredientIndex)
            } else {
                this.ingredientList.push({ ...addedItem });
                this.afterIngredientEditedIndex.next(this.ingredientList.length - 1)
            }
        });

        //this.ingredientListChanged.emit(this.ingredientList.slice());
        this.ingredientListChanged.next(this.ingredientList.slice());
    }

    updateEditIngredientItem(index: number, ingredient: Ingredient) {
        this.ingredientList[index] = ingredient;
        this.ingredientListChanged.next(this.ingredientList.slice());
        this.afterIngredientEditedIndex.next(index)
    }

    deleteIngredient(index: number) {
        this.ingredientList.splice(index, 1);
        this.ingredientListChanged.next(this.ingredientList.slice());
    }

    //Save Ingredients to local storage
    saveIngredients(Ingredients: Ingredient[]) {
        localStorage.setItem('ingredientList', JSON.stringify(Ingredients));
    }
}
