/**
 * New script file
 */
/**
 * Track the sale of a Car from one trader to another
 * @param {org.zilker.tradecar.TradeCar} trade - the trade to be processed
 * @transaction
 */
async function tradeCar(trade) {

  let carTrade = await getAssetRegistry('org.zilker.tradecar.Car')
  let car = await carTrade.get(trade.id);
    var factory =  getFactory();   
    car.owner=factory.newRelationship(
                      "org.zilker.tradecar",
                      "Customer",
                      trade.newOwner.getIdentifier());
          return getParticipantRegistry('org.zilker.tradecar.Customer')
            .then(function (participantRegistry) {
              return participantRegistry.exists(trade.newOwner.id)
          })
            .then(function (flag) {
                  if (flag) {
                    console.log("changing");
                   carTrade.update(car)
                    return car;
                  } else {
                    console.log("participant does not exists");
                  }
})
  
    .catch (function (error) {
    console.log(error);
    return Promise.resolve(error);
});

}

/**Add new Asset(Car)
 * @param {org.zilker.tradecar.newCar} tx 
 * @transaction
 */
async function addNewAsset(tx) {

  var factory = getFactory();
  var carId = generateCarId();
  var concept = factory.newConcept('org.zilker.tradecar', 'Features');
  concept.color = tx.features.color;
  concept.type = tx.features.type;
  concept.manufacturer = tx.features.manufacturer;
  concept.manufactureYear = tx.features.manufactureYear;
  concept.speed = tx.features.speed;
  concept.speedUnit = tx.features.speedUnit;
  concept.mileage = tx.features.mileage;
  concept.mileageUnit = tx.features.mileageUnit;

  var asset = factory.newResource('org.zilker.tradecar', 'Car', carId);
  asset.carId = carId;
  asset.carName = tx.carName;
  asset.price = tx.price;
  asset.priceUnit = tx.priceUnit;
  asset.owner = tx.owner;
  asset.registrationDate = tx.registrationDate;
  asset.features = concept;

  return getParticipantRegistry('org.zilker.tradecar.Manufacturer')
    .then(function (participantRegistry) {
      return participantRegistry.exists(tx.owner.id)
        .then(function (value) {
          if (value) {
            return getAssetRegistry('org.zilker.tradecar.Car')
              .then(function (registry) {
                return registry.add(asset);
              });
          } else {
            console.log("participant does not exists");
          }
        })
    })

    .catch(function (error) {
      console.log("unknown error");
      return Promise.resolve(error);
    });

}

function generateCarId() {
  return 'car_' + Math.random().toString(36).substr(2, 5);
};

