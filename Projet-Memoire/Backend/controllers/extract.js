const connection = require("../util/database");
const { parse } = require("csv-parse");
const fs = require("fs");

const TableauAgregation = [];
const TableauTransaction = [];
const TableauApprovisionnement = [];
var ErrorFileName = [];
var AllFileName = [];

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

exports.uploads = (req, res, next) => {
  const files = req.files;
  files.forEach((file) => {
    if (
      checkFileAgreg(file.originalname) ||
      checkFileAppro(file.originalname) ||
      checkFileTrans(file.originalname)
    ) {
      const query = "SELECT * FROM files WHERE FILE_NAME = ? ";
      console.log(`ok => ${file.originalname}`);
    } else {
      ErrorFileName.push(
        `Nom de Fichier Incorrect!! : [${file.originalname}] => Rectifiez l'erreur puis recommencer!! `
      );
    }
  });
  next();
};

exports.verify = (req, res, next) => {
  if (ErrorFileName.length > 0) {
    let directory_name = "uploads";
    let filenames = fs.readdirSync(directory_name);
    filenames.forEach((file) => {
      try {
        fs.unlinkSync(`uploads/${file}`);
        //file removed
      } catch (err) {
        console.error(err);
      }
    });
    res.status(401).json({
      message: ErrorFileName,
      nbrError: ErrorFileName.length,
    });
  } else {
    const files = req.files;
    let nbrFileTrans = 0;
    let nbrFileAgreg = 0;
    let nbrFileAppro = 0;

    files.forEach((file) => {
      //Compter le nombre de chaque Type de Fichier
      if (checkFileAgreg(file.originalname)) {
        nbrFileAgreg++;
      } else if (checkFileAppro(file.originalname)) {
        nbrFileAppro++;
      } else if (checkFileTrans(file.originalname)) {
        nbrFileTrans++;
      }
      AllFileName.push(`${file.originalname}`);
    });
    res.status(200).json({
      message: AllFileName,
      nbrTrans: nbrFileTrans,
      nbrAgreg: nbrFileAgreg,
      nbrAppro: nbrFileAppro,
    });
  }
  AllFileName.length = 0;
  ErrorFileName.length = 0;
};

exports.Extract = (req, res, next) => {
  console.log("\nFilenames in directory:" + filenames);
  if (filenames.length <= 0) {
    res.status(500).json({ message: "Aucun fichier Ajouter !" });
  } else {
    filenames.forEach((file) => {
      if (checkFileAgreg(file)) {
        if (checkNoData(file)) {
          console.log("Aucune données dans le fichier");
        } else {
          fs.createReadStream(`uploads/${file}`)
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
        ErrorFileName.push(`erreur concernant nom du fchier ${file}`);
      }
    });

    res.json({ error: ErrorFileName });
  }
 
};



exports.Annuler = (req, res, next) => {
  let directory_name = "uploads";
  let filenames = fs.readdirSync(directory_name);
  filenames.forEach((file) => {
    try {
      fs.unlinkSync(`uploads/${file}`)
      //file removed
      } catch(err) {
        console.error(err)
      }
 });
 console.log("okkk");
 res.status(200).json({ message: "Action annuler!"});
}


// verifier s' il y a des données ou pas
function checkNoData(filename) {
  try {
    const data = fs.readFileSync(`uploads/${filename}`, "utf8");
    // console.log(data);
    if (data.search(/Aucune données/) > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
}

