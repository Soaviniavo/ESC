const connection = require('../util/database');
const { parse } = require("csv-parse");
const fs = require("fs");

const TableauAgregation = [];
const TableauTransaction = [];
const TableauApprovisionnement = [];

// pour verifier le nom des fichiers
function checkFileAgreg(filename) {
    var re = /TableauAggregation_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/;
    return re.test(filename);
  }
  function checkFileTrans(filename) {
    var re = /TableauTransaction_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/;
    return re.test(filename);
  }
  function checkFileAppro(filename) {
    var re = /TableauApprovisionnement_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/;
    return re.test(filename);
  }

exports.Extract = (res,req,next) => {
    console.log('ok');
}