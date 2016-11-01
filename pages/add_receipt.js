var database = require('./db.js');

var collection = database.collection('firstreceipt');

var getTitleReceiptValue = function () {
    return $("#receipttitle").val();
};

var getIngredientsValue = function () {
  return $('#ingredients').val();
};

var getDescriptionValue = function () {
    return $('#description').val();
};

var getOriginallinkValue = function () {
    return $('#originallink').val();
};

var insertDoctoBase = (function () {
    var document=({"title": getTitleReceiptValue(), "ingredients": getIngredientsValue(), description: getDescriptionValue(), link: getOriginallinkValue()});
    collection.insert(document);
    if (err) {
        throw err;
        console.log("Error in console : "+err);
    }
    console.log("New document inserted");
}());