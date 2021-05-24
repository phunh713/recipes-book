import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/Services/auth.guard';
import { RecipeDetailNotFoundGuard } from '../core/Services/recipe-detail-not-found.guard';
import { RecipesResolverService } from '../core/Services/recipes-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeNotFoundComponent } from './recipe-not-found/recipe-not-found.component';
import { RecipesComponent } from './recipes.component';

const childRoutes: Routes = [
    { path: 'new', component: RecipeEditComponent },
    { path: 'not-found', component: RecipeNotFoundComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
];

const routes: Routes = [
    {
        //Path on Desktop
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [{ path: '', component: RecipeEmptyComponent }, ...childRoutes],
    },

    //Path on Mobile
    // { path: '', component: RecipeListComponent },
    // ...childRoutes,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
