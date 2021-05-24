import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleListItemDirective } from './Directives/toggle-list-item.directive';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NumToArrayPipe } from './Pipes/num-to-array.pipe';
import { LimitCharPipe } from './Pipes/limit-char.pipe';
import { PaginationPipe } from './Pipes/pagination.pipe';
import { RecipeFilterPipe } from './Pipes/recipe-filter.pipe';
import { ThreeQuaterSpinnerComponent } from './spinner/three-quater-spinner/three-quater-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    declarations: [HeaderComponent, ToggleListItemDirective, SpinnerComponent, NumToArrayPipe, LimitCharPipe, PaginationPipe, RecipeFilterPipe, ThreeQuaterSpinnerComponent, AlertComponent],
    imports: [CommonModule, RouterModule],
    exports: [CommonModule, HeaderComponent, ToggleListItemDirective, SpinnerComponent, NumToArrayPipe, LimitCharPipe, PaginationPipe, RecipeFilterPipe, ThreeQuaterSpinnerComponent, AlertComponent],
})
export class SharedModule {}
