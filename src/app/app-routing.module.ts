import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SeeAllComponent } from './see-all/see-all.component';
import { CarscardsComponent } from './carscards/carscards.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent , pathMatch: 'full' },
  {path: 'seeall', component: SeeAllComponent},
  {path: 'cardcars', component: CarscardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
