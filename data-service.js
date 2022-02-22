
const Sequelize = require('sequelize');
var sequelize = new Sequelize('dev4n8kjapc8va', 'pgvoedjnfycmrk', '66ff02484c1836aaf40ed4c057d945648c9638c667f71484fd1e70706c71c0e2', {
    host: 'ec2-34-249-49-9.eu-west-1.compute.amazonaws.com', 
    dialect: 'postgres', 
    port: 5432, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
          }
    }
});
 
var People = sequelize.define('People', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING
});

var Car = sequelize.define('Car', {
    vin: {type: Sequelize.STRING, primaryKey:true, unique:true},
    make: Sequelize.STRING,
    model: Sequelize.STRING,
    year: Sequelize.STRING,
});

var Store = sequelize.define('Store', {
    retailer: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
});

Car.hasMany(People, {foreignKey:'vin'});

module.exports.initalize = function(){
    return new Promise(function (resolve, reject){ 
        sequelize.sync()
        .then((People) => {
            resolve();
        })
        .then((Car) => {
            resolve();
        })
        .then((Store) => {
            resolve();
        })
        .catch((err) => {
            reject("unable to sync the database" + err);
            return;
        });
    });
};

module.exports.getAllPeople = function(){
    return new Promise(function (resolve, reject){ 
        People.findAll()
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.getCars = function(){
    return new Promise(function (resolve, reject){ 
        Car.findAll()
        .then((data)=>resolve(data))
        .catch((err)=>{
            reject("no results returned");
        });
    });
};
//ddd
module.exports.getStores = function(){
    return new Promise(function (resolve, reject){ 
        Store.findAll()
        .then((data)=>resolve(data))
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.addPeople = function(peopleData){
    for (x in peopleData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
       People.create(peopleData)
       .then(()=>{
           resolve();
       })
       .catch(()=>{
           reject("unable to create a person");
       });
    });
};

module.exports.addCar = function(carData){
    for (x in carData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
      Car.create(carData)
      .then(()=>{
          resolve();
        } )
      .catch(()=> {
          reject("unable to create car");
        });
    });
};

module.exports.addStore = function(storeData){
    for (x in storeData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
      Store.create(storeData)
      .then(()=>{
          resolve();
        } )
      .catch(()=> {
          reject("unable to create store");
        });
    });
};

module.exports.updateStore = function(storeData){
    for (x in storeData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
      Store.update(storeData, {
          where: {id: storeData.id}
      })
      .then(()=>{
          resolve();
        } )
      .catch(()=> {
          reject("unable to update store");
        });
    });
};




module.exports.updateCar = function(carData){
    for (x in carData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
      Car.update(carData, {
          where:{vin: carData.vin}
      })
      .then(()=>
          resolve()
      )
      .catch(()=>{
          reject("unable to create car")
      })
    });
};


module.exports.getPeopleByVin = function(Vin){
    return new Promise(function (resolve, reject){ 
        People.findAll({
            where: {vin: Vin}
        })
        .then((data)=>{
            resolve(data[0]);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.getCarsByVin = function(Vin){
    return new Promise(function (resolve, reject){ 
        Car.findAll({
            where: {vin: Vin}
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};





module.exports.getCarsByMake = function(make){
    return new Promise(function (resolve, reject){ 
        Car.findAll({
            where: {make: make}
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.getCarsByYear = function(year){
    return new Promise(function (resolve, reject){ 
        Car.findAll({
            where: {year: year}
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.getPeopleById = function(id){
    return new Promise(function (resolve, reject){ 
        People.findAll({
            where: {id: id}
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.getStoreById = function(ident){
 
    return new Promise(function (resolve, reject){ 
      Store.findAll({
          where: {id: ident}
      })
      .then((data)=>{
          resolve(data);
        } )
      .catch(()=> {
          reject("no results returned");
        });
    });
};

module.exports.deleteStoreById = function(ident){
 
    return new Promise(function (resolve, reject){ 
      Store.destroy({
          where: {id: ident}
      })
      .then((data)=>{
          resolve(data);
        } )
      .catch(()=> {
          reject("unable to delete store");
        });
    });
};

module.exports.deleteCarByVin = function(Vin){
    return new Promise(function (resolve, reject){ 
        Car.destroy({
            where: {vin: Vin}
        })
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject("can not delete Car");
        });

    });
};

module.exports.deletePeopleById = function(ident){
 
    return new Promise(function (resolve, reject){ 
      People.destroy({
          where: {id: ident}
      })
      .then((data)=>{
          resolve(data);
        } )
      .catch(()=> {
          reject("unable to delete store");
        });
    });
};

module.exports.getStoresByRetailer = function(retailer){
    return new Promise(function (resolve, reject){ 
        Store.findAll({
            where: {retailer: retailer}
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject("no results returned");
        });
    });
};

module.exports.updatePerson = function(personData){
    
    for (x in personData){
        if (x=="") x=null;
    }

    return new Promise(function (resolve, reject){ 
       People.update(personData, {
           where: {id: personData.id}
       })
       .then(()=>{
           resolve();
       })
       .catch(()=>{
            reject("unable to update person")
       });
    });
};


