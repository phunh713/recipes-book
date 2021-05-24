import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/Services/auth.guard';
import { CourseAssignmentComponent } from './course-assignment.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { FormTdComponent } from './form-td/form-td.component';
import { PipeComponent } from './pipe/pipe.component';

const routes: Routes = [
    {
        path: '',
        component: CourseAssignmentComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'form-td', component: FormTdComponent },
            { path: 'form-reactive', component: FormReactiveComponent },
            { path: 'pipe', component: PipeComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseAssignmentRoutingModule {}
