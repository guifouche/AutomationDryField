import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '../../game/game.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'game', component: GameComponent },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
