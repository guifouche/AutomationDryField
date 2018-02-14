import { Component, Input, OnInit } from '@angular/core';
import { Config } from '../../config/config';
import { Field } from '../../core/models/field/Field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  public field: Field;
  public config = Config;

  @Input() public playerWater;

  constructor() {
    this.field = new Field();
  }

  ngOnInit() {
    this.playerWater = this.playerWater--;
  }

  public irrigateField(amount: number) {
    this.field.irrigate(amount);
  }

  public checkHarvesting() {
    return this.field.isHarvestingPossible;
  }

  public harvestField() {
    this.field.resetHarvest();
  }


}
