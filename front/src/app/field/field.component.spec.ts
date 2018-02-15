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
    const fieldWater = component.field.cistern.capacity;
    component.irrigateField(amount);
    expect(component.field.cistern.capacity).toEqual(fieldWater + amount);
  });

  it('should return false', () => {
    expect(component.field.isHarvestingPossible).toBeFalsy();
  });

  it('should reset harvest time and set isHarvestingPossible to false', () => {
    component.field.isHarvestingPossible = true;
    component.field.resetHarvest();
    expect(component.field.remainingTime).toEqual(moment.duration(20, 's'));
    expect(component.field.isHarvestingPossible).toBeFalsy();
  });

  it('should increase field consumption', () => {
    component.field.increaseConsumption();
    setTimeout(() => {
      expect(component.field.consumption).toEqual(2);
      }, 3000);
  });
  //
  // it('should return true', () => {
  //   expect(component.player.cistern.capacity <= 0).toBeTruthy();
  // });

});
