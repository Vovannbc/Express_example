/**
 * Created by zr210290ovo on 21.10.16.
 */
var db = require("mongodb").MongoClient,
    assert = require("assert");


function getConnectionInfo() {
    return {
        host: "localhost",
        port: 27017,
        user: "Vovka",
        dbName:	"blog",
        password: "blog",
        collection: "posts"
    };
}

function initdb() {
    var dbinfo = getConnectionInfo();
    db.connect('mongodb://'+dbinfo.host+':'+dbinfo.port+'/'+dbinfo.dbName, function (err, _db) {
        assert.equal(null, err);
        console.log("Succesfull connected to Db server");

        _db.collection('posts').find({}).toArray(function (err, items) {
            items.forEach(function (item) {
                console.log(item.title);
            });
            _db.close();
        });
        console.log("Called finds");
    })
}
