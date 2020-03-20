var express = require('express');
var router = express.Router();
const axios = require('axios');

var longitudeVille;
var latitudeVille;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Node App'});
});
/*Get Ville page*/
router.get('/ville', async function (req, res, next) {
    const nomVille = req.query.nom_ville;
    await axios.get('https://geocode.xyz/' + nomVille + '?json=1')
        .then(response => {
            longitudeVille = response.data.longt;
            latitudeVille = response.data.latt;
            console.log("ici: longtitudeVille: ", longitudeVille);
        })
        .catch(error => {
            longitudeVille = undefined;
            latitudeVille = undefined;
            console.log(error);
        });

    console.log("ici: longtitudeVille: ", longitudeVille);
    console.log("ici: latitudeVille: ", latitudeVille);
    if (longitudeVille !== undefined || latitudeVille !== undefined) {
        res.render('ville', {
            ville: req.query.nom_ville,
            longitude: longitudeVille,
            latitude: latitudeVille
        });
    } else {
        res.render('errorPage', {erreur: "Votre ville nous est inconnue.. T_T"})
    }
});


module.exports = router;
