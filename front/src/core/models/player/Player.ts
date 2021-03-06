import { EventEmitter } from '@angular/core';
import { Config } from '../../../config/config';
import * as Rx from 'rxjs/Rx';
/**
 * Entity which represents a Player.
 *
 * @author Vincent Léné (vincent.lene.dl@gmail.com)
 */
import { Cistern } from '../cistern/Cistern';
import { Field } from '../field/Field';
import { Observable } from 'rxjs/Observable';

export class Player {

  /**
   * The global cistern available to the player.
   */
  public cistern: Cistern = new Cistern();

  /**
   * The number of harvests of the player.
   */
  public harvestCount: number;

  /**
   * The amount of money of the player.
   */
  public money: number;

  /**
   * The username of the player.
   */
  public username: string;

  public harvestMoney$ = new Observable<number>();

  constructor(username: string) {
    this.cistern.capacity = Config.initialAmountOfWater;
    this.money = Config.initialMoney;
    this.username = username;
  }

  public buyWater() {
    if (this.money >= Config.waterBuyingPrice) {
      this.money -= Config.waterBuyingPrice;
      this.cistern.capacity += Config.waterBuyingAmout;
    }
  }

  public irrigateField(field: Field, amount: number) {
    // field.irrigate(amount);
  }

  public harvestField(field: Field) {
      this.harvestCount++;
      this.money += Config.harvestSellingPrice;
      field.isHarvestingPossible = false;
  }

  public start() {
    this.harvestMoney$ = Rx.Observable.timer(0, 1000);
  }
}
