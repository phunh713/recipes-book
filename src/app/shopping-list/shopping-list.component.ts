import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ingredient } from '../core/model/ingredient.model';
import { IngredientsService } from '../core/Services/ingredients.service';
import { ShoppingListService } from '../core/Services/shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredientList: Ingredient[] = [];
    editItemIndex!: number;
    private ingrListChangedSub!: Subscription;
    private editIngrIndexSub!: Subscription;

    constructor(private slService: ShoppingListService, private ingredientService: IngredientsService) {}

    ngOnInit(): void {
        this.ingredientList = this.slService.getIngredientList();

        this.ingrListChangedSub = this.slService.ingredientListChanged.subscribe((ingredients) => {
            this.ingredientList = ingredients;
        });

        this.editIngrIndexSub = this.slService.afterIngredientEditedIndex.subscribe((index: number) => {
            this.editItemIndex = index;
        });
    }

    onEdit(index: number) {
        this.slService.ingredientEditedIndex.next(index);
    }

    onDelete(index: number) {
        this.slService.deleteIngredient(index);
    }

    onSaveList() {
        this.slService.saveIngredients(this.ingredientList);
    }

    onClickName(name: string) {
        console.log(name)
        this.ingredientService.getIngredientId(name).pipe(
            switchMap(id => {
                return this.ingredientService.getIngredientInfo(id)
            })
        ).subscribe(data => console.log(data))
    }

    ngOnDestroy() {
        this.editIngrIndexSub.unsubscribe();
        this.ingrListChangedSub.unsubscribe();
    }
}
