import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Config } from '../../config/config';
import { Field } from '../../core/models/field/Field';
import { Player } from '../../core/models/player/Player';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  public field: Field;
  public config = Config;
  public player: Player;

  @Output() public fieldIrrigated = new EventEmitter<number>();
  @Output() public fieldHarvested = new EventEmitter<number>();

  constructor() {
    this.field = new Field();
  }

  ngOnInit() {
  }

  public irrigateField(amount: number) {
    this.field.irrigate(amount);
    this.fieldIrrigated.emit(amount);
  }

  public checkHarvesting() {
    return this.field.isHarvestingPossible;
  }

  public harvestField(money: number) {
    this.field.resetHarvest();
    this.fieldHarvested.emit(money);
  }

  public checkEmptyMainCistern() {
    return (this.player.cistern.capacity <= 0);
  }

}
