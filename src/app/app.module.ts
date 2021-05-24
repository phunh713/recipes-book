import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        AppRoutingModule, //must be last for wild card ('**') routing to work correctly
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
