var database = require("mongodb").MongoClient,
    assert = require("assert"),
    DB;

function getConnectionInfo() {
    return {
        host: "localhost",
        port: 27017,
        user: "Vovka",
        dbName:	"testreceipts",
        password: "blog",
        collection: "firstreceipt"
    };
}

var initdb = (function(){
    var dbinfo = getConnectionInfo();
    database.connect('mongodb://'+dbinfo.host+':'+dbinfo.port+'/'+dbinfo.dbName, function (err, _db) {
        assert.equal(null, err);
        console.log("Succesfull connected to Db server");

        DB = _db;
        _db.collection(getConnectionInfo().collection).find({}).toArray(function (err, items) {
            items.forEach(function (item) {
                //console.log(item.title);
            });
            //_db.close();
        });
        console.log("DB inited");
    })
}());

