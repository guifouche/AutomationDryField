import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public numberOfDryFields: number;

  @Output() public fieldIrrigated = new EventEmitter<number>();
  @Output() public fieldHarvested = new EventEmitter<number>();

  constructor() {
    this.field = new Field();
    this.numberOfDryFields = 0;
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

  public checkIfFieldIsDry(field: Field) {
    if (this.checkIfFieldIsDry) {
      this.numberOfDryFields++;
    }
  }

}
