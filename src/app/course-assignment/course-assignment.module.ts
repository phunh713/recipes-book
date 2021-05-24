import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseAssignmentRoutingModule } from './course-assignment-routing.module';
import { CourseAssignmentComponent } from './course-assignment.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { FormTdComponent } from './form-td/form-td.component';
import { PipeComponent } from './pipe/pipe.component';
import { ReverseStringPipe } from '../shared/Pipes/reverse-string.pipe';

@NgModule({
    declarations: [CourseAssignmentComponent, FormTdComponent, FormReactiveComponent, PipeComponent, ReverseStringPipe],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CourseAssignmentRoutingModule],
})
export class CourseAssignmentModule {}
