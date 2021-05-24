import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then((m) => m.RecipesModule) },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: 'signup', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule),
    },
    {
        path: 'assignments',
        loadChildren: () => import('./course-assignment/course-assignment.module').then((m) => m.CourseAssignmentModule),
    },

    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '**', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
