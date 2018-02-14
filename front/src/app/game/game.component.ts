import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Game } from '../../core/models/game/Game';
import { Player } from '../../core/models/player/Player';
import moment = require('moment');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  public player: Player;
  public game: Game;

  public format = 'mm:ss';
  public gameElapsedTime;

  public isGameStarted: boolean;

  private subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public playerRegistered(player: Player) {
    this.player = player;
    this.game = new Game();
    this.game.start();
    const sub = this.game.elapsedTime$.subscribe( (time) => {
      this.gameElapsedTime = moment.duration(time, 's');
    });
    this.subscriptions.push(sub);
    this.isGameStarted = true;
  }

  public pauseOrResume() {
    this.isGameStarted = !this.isGameStarted;
  }

}
