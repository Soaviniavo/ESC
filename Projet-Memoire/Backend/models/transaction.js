const db = require('../util/database');

module.exports = class user {
    constructor(date_trans,numero,telephone,produit,montant_AR,commission,TVA,montant_TTC,statut,code_agence,libelle,solde_avant,solde_apres,date_val,validateur){
        this.date_trans = date_trans ; 
        this.numero = numero;
        this.telephone =telephone ; 
        this.produit = produit ; 
        this.montant_AR= montant_AR ; 
        this.commission= commission ; 
        this.TVA = TVA ;
        this.montant_TTC = montant_TTC ; 
        this.statut= statut ; 
        this.code_agence= code_agence ; 
        this.libelle = libelle; 
        this.solde_avant = solde_avant ; 
        this.solde_apres= solde_apres ; 
        this.code_agence= code_agence ; 
        this.date_val = date_val ;
        this.validateur = validateur ; 
        //16
    };
}