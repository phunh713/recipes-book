import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/Services/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingListEditComponent],
    imports: [CommonModule, FormsModule, SharedModule,RouterModule.forChild([{ path: '', component: ShoppingListComponent, canActivate: [AuthGuard] }])],
    exports: [RouterModule, ShoppingListComponent, ShoppingListEditComponent],
})
export class ShoppingListModule {}
