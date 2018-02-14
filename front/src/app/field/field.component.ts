import { Component, OnInit } from '@angular/core';
import { Field } from '../../core/models/field/Field';
import * as config  from '../../config/config';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

public field: Field;

  constructor() { 
    this.field = new Field();
  }

  ngOnInit() {
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
