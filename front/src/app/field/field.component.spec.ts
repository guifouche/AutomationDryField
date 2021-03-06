import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should irrigate field', () => {
    const amount = 1;
    const fieldWater = this.field.cistern.capacity;
    this.irrigateField(amount);
    expect(this.field.cistern.capacity).toEqual(fieldWater - amount);
  });

  it('should return false', () => {
    expect(this.field.isHarvestingPossible).toBeFalsy();
  });

  it('should reset harvest time and set isHarvestingPossible to false', () => {
    this.field.isHarvestingPossible = true;
    this.field.resetHarvest();
    expect(this.field.remainingTime).toEqual(moment.duration(20, 's'));
    expect(this.field.isHarvestingPossible).toBeFalsy();
  });

  it('should increase field consumption', () => {
    this.field.increaseConsumption();
    setTimeout(() => {
      expect(this.field.consumption).toEqual(2);
      }, 3000);
  });

  it('should return true', () => {
    expect(this.player.cistern.capacity <= 0).toBeTruthy();
  });

});
