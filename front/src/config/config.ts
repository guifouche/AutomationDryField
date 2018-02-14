import moment = require('moment');

export const Config = {

  initialMoney: 50,
  initialAmountOfWater: 3,
  initialConsumption: 1,
  initialInterval: 1000,
  irrigateAmount: 1,
  timeForAfieldToBeMature: moment.duration(20, 's'),
  harvestSellingPrice: 40,
  waterBuyingPrice: 1,
  waterBuyingAmout: 1

};
