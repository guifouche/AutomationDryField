import { Config } from '../../../config/config';
import { Field } from './Field';
import moment = require('moment');

describe('Field', () => {

  let field = null;
  beforeEach(function (done) {
    setTimeout(function () {
      field = new Field();
      done();
    }, 1);
  });

  const config = Config;

  it('should initialize the field properly', () => {
    expect(field.isHarvestingPossible).toBeFalsy();
    expect(field.remainingTime).toEqual(config.timeForAfieldToBeMature);
    expect(field.cistern).toBeDefined();
    expect(field.consumption).toEqual(config.initialConsumption);
  });

  it('should test checkHarvestingPossible return false', () => {
    field.remainingTime = moment.duration(10);
    field.checkHarvestingPossible();
    expect(field.isHarvestingPossible).toBeFalsy();
  });

  it('should test checkHarvestingPossible return true', () => {
    field.remainingTime = moment.duration(0);
    field.checkHarvestingPossible();
    expect(field.isHarvestingPossible).toBeTruthy();
  });

  it('should test checkFieldIsDry', () => {
    field.cistern.capacity = 1;
    expect(field.checkFieldIsDry()).toBeFalsy();
  });

  it('should test irrigate', () => {
    const amount = 1;
    field.irrigate(amount);
    expect(field.cistern.capacity).toEqual(config.initialAmountOfWater + amount);
  });

  it('should test resetHarvest', () => {
    field.resetHarvest();
    expect(field.remainingTime).toEqual(moment.duration(20, 's'));
    expect(field.isHarvestingPossible).toBeFalsy();
  });

});
