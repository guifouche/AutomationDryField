import * as moment from 'moment';
import { Config } from '../../../config/config';
import { Cistern } from '../cistern/Cistern';


/**
 * Entity which represents a Field.
 *
 * @author Vincent Léné (vincent.lene.dl@gmail.com)
 */
export class Field {

  /**
   * The remaining time before harvest.
   */
  public remainingTime: moment.Duration;

  /**
   * The associated cistern for this field.
   */
  public cistern: Cistern;

  /**
   * Boolean to figure out if the field is mature to be harvested.
   */
  public isHarvestingPossible = false;

  /**
   * Number to specify the quantity of water consumed by the field each second
   */
  public consumption: number;
  
  public interval;

  constructor() {
    this.remainingTime = Config.timeForAfieldToBeMature;
    this.isHarvestingPossible = false;
    this.consumption = Config.initialConsumption;
    this.cistern = new Cistern();
    this.start();
  }

  public grow() {

    //this.isGameOver();

    this.remainingTime.subtract(1, 's');
    this.checkHarvestingPossible();

    if (!this.isHarvestingPossible) {
      if (this.checkFieldIsDry()) {
        this.remainingTime = moment.duration(20, 's');
      } else {
        this.cistern.capacity -= this.consumption;
      }
    }
    this.increaseConsumption();
  }

  public checkHarvestingPossible() {
    if (this.remainingTime <= moment.duration(0)) {
      this.isHarvestingPossible = true;
    }
  }

  public checkFieldIsDry() {
    return this.cistern.capacity <= 0;
  }

  public irrigate(amount: number) {
    this.cistern.capacity += amount;
  }

  public start() {
    this.interval = setInterval(this.grow.bind(this), Config.initialInterval);
  }

  public resetHarvest() {
    this.remainingTime = moment.duration(20, 's');
    this.isHarvestingPossible = false;
  }

  public increaseConsumption() {
    if (this.consumption < 2) {
      this.consumption += 0.05;
    }
  }

  public isGameOver() {
    //if () {
      this.stop();
    //}
  }

  public stop() {
    clearInterval(this.interval);
  }

}
