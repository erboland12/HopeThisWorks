import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './models/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'subtract', loadChildren: './subtract/subtract.module#SubtractPageModule' },
  { path: 'results', loadChildren: './results/results.module#ResultsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'user', loadChildren: './models/user-profile/user-profile.module#UserProfilePageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'rewards', loadChildren: './rewards/rewards.module#RewardsPageModule' },
  { path: 'addition', loadChildren: './addition/addition.module#AdditionPageModule', runGuardsAndResolvers: 'always'},
  { path: 'multiplication', loadChildren: './multiplication/multiplication.module#MultiplicationPageModule' },
  { path: 'division', loadChildren: './division/division.module#DivisionPageModule' },
  { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardPageModule' },  { path: 'password-reset', loadChildren: './password-reset/password-reset.module#PasswordResetPageModule' },
  { path: 'new-password', loadChildren: './new-password/new-password.module#NewPasswordPageModule' },
  { path: 'visual-settings', loadChildren: './visual-settings/visual-settings.module#VisualSettingsPageModule' },
  { path: 'how-to-play', loadChildren: './how-to-play/how-to-play.module#HowToPlayPageModule' }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
