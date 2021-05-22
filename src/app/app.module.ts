import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { ContactCreateEditComponent } from './contact-create-edit/contact-create-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCreateEditComponent,
    ContactCreateEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
