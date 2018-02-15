import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Game } from '../../core/models/game/Game';
import { Player } from '../../core/models/player/Player';
import moment = require('moment');
import { EventEmitter } from 'events';
import { Config } from '../../config/config';

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

  public subscriptions: Subscription[] = [];

  public score;


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

  public playerIrrigatedField(amount: number) {
    if (this.player.cistern.capacity > 0) {
      this.player.cistern.capacity -= amount;
    }
  }

  public buyWater() {
    if (this.player.money > 0) {
      this.player.cistern.capacity += this.player.money / Config.waterBuyingPrice;
      this.player.money = 0;
    }
  }

  public addMoney(amount: number) {
    this.player.money += amount;
  }

  public gameOver() {
    this.score = this.gameElapsedTime;
  }

}
