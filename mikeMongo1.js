//
// mongodb.github.io/node-mongodb-native/
//

console.log("(mikeMongo1 v 0.001) ...begins ");

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

console.log("(mikeMongo1) port:" + port);

// default to a 'localhost' configuration:
 var connection_string = '127.0.0.1:27017/movies';
// if OPENSHIFT env variables are present, use the available connection info:

// mike
//
// needed to manually grant authorization to user 'admin' for 'movies'
// using RockMongo (php MongoDb frontend)
//

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  'movies';
//  process.env.OPENSHIFT_APP_NAME;
//console.log("(mikeMongo1) connection_string: " + connection_string );
}

// test dummy mongodb
var MongoClient = require('mongodb').MongoClient;
console.log("(mikeMongo1)  MongoClient: " + MongoClient);

// the client db connection scope is wrapped in a callback:

//console.log("(before connect)db: " + db);
MongoClient.connect('mongodb://' + connection_string, function(err, db) {
  if(err) {
   console.log("(mikeMongo1) MongoClient.connect  err:" + err);
    throw err;
  }

 console.log("---- collections ------");
  db.collectionNames(function(err, collections){
      console.log(collections);
  });

 console.log("========================-");


//console.log("db: " + db);
console.log("db.databaseName: " + db.databaseName);
console.log("db:collectionsInfo(): " + db.collectionsInfo());
//refl(db.collectionsInfo());
//console.log("db:collectionNames(): " + db.collectionNames());
//console.log("db:collection(): " + db.collection());
//console.log("db:collections(): " + db.collections());

//refl(db);
//  var collection = db.collection('movies').find().limit(10).toArray(function(err, docs) {

  var collection = db.collection('movies').find().toArray(function(err, docs) {
      console.dir(docs);
       console.log("docs:" + docs);

     docs.forEach( function(movie) {
      // console.log("movie: " + movie);
      refl(movie);
     // MikeGetCollection(movie);
    });
    db.close();
  });

});  // MongoClient.connect



/*
exports.coll = function (r) {
  console.log('col1) r:' + r);
  return [1,2,3,4];
};
*/

//exports.MikeGetCollection = function(collection){
  exports.MikeGetCollection = function(){
  console.log("(MikeGetCollection) collection:" + collection );
  return collection;
}

function refl(ob){
 var ct = 1;
 for (var m in ob) {
   console.log(ct +" : - " + m + "- ");
   ct++;
   //console.log(m + "[]:"+ ob[m]);}
    console.log(ob[m]);
  //console.log("===========");
 }
 // console.log("*********************");
}
