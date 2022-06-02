
const { parse } = require('csv-parse');
const fs = require('fs');

const TableauAgregation = [];
const TableauTransaction = [];
const TableauApprovisionnement = [];


// pour verifier le nom des fichiers
function checkFileAgreg(filename) {
    var re = /TableauAggregation_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/
    return re.test(filename);
}
function checkFileTrans(filename) {
    var re = /TableauTransaction_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/
    return re.test(filename);
}
function checkFileAppro(filename) {
    var re = /TableauApprovisionnement_([0-9]{1,2})-[0-9]{1,2}-[0-9]{4}.csv/
    return re.test(filename);
}

// verifier s' il y a des données ou pas 
function checkNoData(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8')
        console.log(data);
        if (data.search(/Aucune données/) > 0) {
            return true ; 
        } else {
            return false ; 
        }
    } catch (err) {
        console.error(err);
    }
}



// tabnine prettier polacode turbo console log 

console.log(checkFileAgreg("TableauAggregation_22-08-2021.csv"));
console.log(checkFileTrans("TableauTransaction_24-08-2021.csv"));
console.log(checkFileAppro("TableauApprovisionnement_24-08-2021.csv"));

let directory_name = "../../../TestFichier/Fichier";

let filenames = fs.readdirSync(directory_name);

console.log("\nFilenames in directory:");
if (filenames.length <= 0) {
    console.log("Le repertoire est vide!");
} else {
    filenames.forEach((file) => {
        if (checkFileAgreg(file)) {
            fs.createReadStream(`../../../TestFichier/Fichier/${file}`)
                .pipe(parse({
                    columns: true,
                }))
                .on('data', (data) => {
                    TableauAgregation.push(data);
                }).on('error', (error) => {
                    console.log(error);
                }).on('end', () => {
                    console.log("//////////////////////////////////11111111111111111111//////////////////////////////////////");
                    console.log(TableauAgregation.length);
                    console.log(TableauAgregation[0]);

                });
        } else if (checkFileAppro(file)) {
            console.log('ok Appro!');
        } else if (checkFileTrans(file)) {
            console.log('ok Trans!');
        } else {
            console.log("Il y a un probléme concernant le nom du fichier!");
        }
    });
}


// Open the directory
/*let openedDir = fs.opendirSync(directory_name);

// Print the pathname of the directory
console.log("\nPath of the directory:", openedDir.path);

// Get the files present in the directory
console.log("Files Present in directory:");

let filesLeft = true;
while (filesLeft) {
  // Read a file as fs.Dirent object
  let fileDirent = openedDir.readSync();

  // If readSync() does not return null
  // print its filename
  if (fileDirent != null){
    console.log("Name:", fileDirent.name);
    if( fileDirent.name !== "TableauAggregation_27-08-2021.csv" || fileDirent.name === "TableauAggregation_27-08-2021.csv"){
      /*  fs.createReadStream(`../Fichier/${fileDirent.name}`)
        .pipe(parse({
            comment:'#',
            columns: true,
        }))
        .on('data', (data) =>{
           // console.log(data);
            result.push(data);
        }).on('error', (error) => {
            console.log(error);
        }).on('end', () => {
            console.log('done');

            for(let i = 0 ; i < result.length ; i++){
                console.log(result[i]);
           }
        });
         csvtojson()
        .fromFile(`../Fichier/${fileDirent.name}`)
        .then((json) => {
            console.log(json[0]);
        });
    }else{
        console.log("ok");
    }
  } else filesLeft = false;


}*/



/*fs.createReadStream('../TableauTransaction_24-08-2021.csv')
.pipe(parse({
    comment:'#',
    columns: true,
}))
.on('data', (data) =>{
    console.log(data);
    result.push(data);
}).on('error', (error) => {
    console.log(error);
}).on('end', () => {
    console.log('done');
    console.log(result[0]["Montant (Ar)"]);
});
*/
//const csvtojson = require('csvtojson');
/*const csvfilepath = "../TableauTransaction_24-08-2021.csv";
csvtojson()
.fromFile(csvfilepath)
.then((json) => {
    console.log(json);
});*/
