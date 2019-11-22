'use strict';

/**
* Appel des paquets express, cors & mysql
**/

var express  = require('express');
var mysql = require('mysql');
var app = express();

/**
* Création de la connection à la BDD
**/

var connect = mysql.createConnection({
  host: 'localhost',
  user: 'chform',
  password: 'Videlio02',
  database: 'nagios'
});

/*
* Connection à la BDD
*/

connect.connect(function (err) {
  if(err){
    console.log('Un problème est survenue avec MySQL : ' + err);
  } else {
    console.log('La connexion à la BDD a été effectué');
  }
});

/**
* Requête SQL avec un résultat JSON lien au controller MainCtrl
**/

app.get('/', function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  connect.query('SELECT `hostgroup_id`,`hostgroup_object_id`,`alias` FROM `nagios_hostgroups`',function(err,rows){
    if(err) {
      console.log('Problem with MySQL'+err);
    } else {
      res.send(rows);
    }
  });
});

/**
 * Requête SQL avec un résultat JSON lier au controller BureauCtrl
 */

app.get('/idRoom', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  connect.query('SELECT nh.host_object_id, nh.alias, nhs.host_object_id, nhs.current_state, nhgm.host_object_id, nhgm.hostgroup_id FROM nagios_hosts nh, nagios_hostgroup_members nhgm, nagios_hoststatus nhs WHERE nh.host_object_id = nhgm.host_object_id AND nh.host_object_id = nhs.host_object_id', function (err, rows) {
    if(err){
      console.log('Problem with MySQL '+ err);
    } else {
      res.send(rows);
    }
  });
});

/**
 * Requête SQL avec un résultat JSON lier au controller MainCtrl
 */

app.get('/idRoom/host', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  connect.query('SELECT nhs.host_object_id, nhs.current_state AS status_host, nhgm.hostgroup_id, nhgm.host_object_id, nhg.alias FROM nagios_hostgroup_members nhgm, nagios_hoststatus nhs, nagios_hostgroups nhg, nagios_hosts nh WHERE nhgm.host_object_id = nhs.host_object_id AND nhgm.hostgroup_id = nhg.hostgroup_id AND nh.host_object_id = nhs.host_object_id GROUP BY nhg.hostgroup_id, nhs.current_state ORDER BY nhs.current_state DESC', function (err, rows) {
    if(err){
      console.log('Problem with MySQL '+err);
    } else {
      res.send(rows);
    }
  });
});

/**
 * Requête SQL avec un résultat JSON lier au controller MainCtrl
 */

app.get('/idMain/service', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, contenttype');
  res.setHeader('Access-Control-Allow-Credentials', true);

  connect.query('SELECT nhgm.hostgroup_id, nh.host_object_id, nh.alias, ns.host_object_id, ns.service_object_id, ns.display_name, nhs.service_object_id, nhs.current_state FROM nagios_hosts nh, nagios_services ns, nagios_servicestatus nhs, nagios_hostgroup_members nhgm WHERE ns.service_object_id = nhs.service_object_id AND nhgm.host_object_id = ns.host_object_id GROUP BY nhs.current_state, nhgm.hostgroup_id', function (err, rows) {
    if(err){
      console.log('Problem with MySQL '+ err);
    } else {
      res.send(rows);
    }
  });
});

/**
 * Requête SQL avec un résultat JSON lier au controller BureauCtrl
 */

app.get('/idRoom/service', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  connect.query('SELECT nhgm.hostgroup_id, nh.host_object_id, nh.alias, ns.host_object_id, ns.service_object_id, ns.display_name, nhs.service_object_id, nhs.current_state FROM nagios_hosts nh, nagios_services ns, nagios_servicestatus nhs, nagios_hostgroup_members nhgm WHERE nh.host_object_id = ns.host_object_id AND ns.service_object_id = nhs.service_object_id GROUP BY nhs.current_state, ns.host_object_id', function (err, rows) {
    if(err){
      console.log('Problem with MySQL '+ err);
    } else {
      res.send(rows);
    }
  });
});

/**
 * Requête SQL avec un résultat JSON lier au controller ServiceCtrl
 */
app.get('/service', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  connect.query('SELECT nh.host_object_id, ns.service_object_id, ns.display_name, ns.host_object_id, nss.service_object_id, nss.current_state FROM nagios_services ns, nagios_servicestatus nss, nagios_hosts nh WHERE nh.host_object_id = ns.host_object_id AND ns.service_object_id = nss.service_object_id', function (err, rows) {
    if(err){
      console.log('Problem with MySQL' + err);
    } else {
      res.send(rows);
    }
  });
});


/**
* Appel de app test (express) sur le port 3000
**/
app.listen(3000, function () {
  console.log('Cette app test est sur le port 3000 !');
});
