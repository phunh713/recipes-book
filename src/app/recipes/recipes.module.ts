import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LimitCharPipe } from '../shared/Pipes/limit-char.pipe';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipeNotFoundComponent } from './recipe-not-found/recipe-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeEmptyComponent,
        RecipeNotFoundComponent,
    ],
    exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeEmptyComponent,
    ],
    imports: [CommonModule, SharedModule, RouterModule, FormsModule, ReactiveFormsModule, RecipesRoutingModule, ShoppingListModule],
})
export class RecipesModule {}
