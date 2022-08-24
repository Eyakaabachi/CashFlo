import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { signinservice } from './signin/signinservice';
import { RouterModule,Routes } from '@angular/router';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { HomeComponent } from './home/home.component';
import { ExpenseUpdateComponent } from './expense-update/expense-update.component';
import { IncomeUpdateComponent } from './income-update/income-update.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserUpdateComponent } from './user-update/user-update.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
const appRoutes: Routes =[
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {path:'home',component: HomeComponent},
  {path:'signup',component: SignupComponent},
  {path:'signin',component: SigninComponent},
  {path:'user',component: UserComponent},
  {path:'expense', component: ExpenseComponent },
  {path:'income',component: IncomeComponent},
  {path:'expense/expense-update', component: ExpenseUpdateComponent},
  {path:'income/income-update', component: IncomeUpdateComponent},
  {path:'user/signin',component: SigninComponent},
  {path:'user/user-update',component: UserUpdateComponent},
  {path:'user/user-update/user',component:UserComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    SigninComponent,
    ExpenseComponent,
    IncomeComponent,
    HomeComponent,
    ExpenseUpdateComponent,
    IncomeUpdateComponent,
    NavbarComponent,
    UserUpdateComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [HttpClientModule, signinservice],
  bootstrap: [AppComponent]
})
export class AppModule { }

