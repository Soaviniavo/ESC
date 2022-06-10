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

// verifier s' il y a des données ou pas
function checkNoData(filename) {
  try {
    const data = fs.readFileSync(
      `../../../TestFichier/Fichier/${filename}`,
      "utf8"
    );
    console.log(data);
    if (data.search(/Aucune données/) > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
}



let directory_name = "../../../TestFichier/Fichier";

let filenames = fs.readdirSync(directory_name);

console.log("\nFilenames in directory:");
if (filenames.length <= 0) {
  console.log("Le repertoire est vide!");
} else {
  filenames.forEach((file) => {
    if (checkFileAgreg(file)) {
      if (checkNoData(file)) {
        console.log("Aucune données dans le fichier");
      } else {
        fs.createReadStream(`../../../TestFichier/Fichier/${file}`)
          .pipe(
            parse({
              columns: true,
            })
          )
          .on("data", (data) => {
            TableauAgregation.push(data);
          })
          .on("error", (error) => {
            console.log(error);
          })
          .on("end", () => {
            console.log(
              "//////////////////////////////////11111111111111111111//////////////////////////////////////"
            );
            console.log(TableauAgregation.length);
            console.log(TableauAgregation[0]);
          });
      }
    } else if (checkFileAppro(file)) {
      checkNoData(file);
      console.log("ok Appro!");
    } else if (checkFileTrans(file)) {
      console.log("ok Trans!");
    } else {
      console.log("Il y a un probléme concernant le nom du fichier!");
    }
  });
}
