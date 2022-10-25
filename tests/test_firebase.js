'use strict';

const dbAdmin = require('firebase-admin');
const config = require('../config/slack_cloudaz-dev.json');

console.log("Start firebase connection");

// Initialize Firebase
/*
let firebase = require("firebase");

let config = {
    apiKey: "AIzaSyApbCYcMofRoEQx18DmSruP9D2ZMCQKzv0",
    authDomain: "slack4cloudaz.firebaseapp.com",
    databaseURL: "https://slack4cloudaz.firebaseio.com",
    projectId: "slack4cloudaz",
    storageBucket: "slack4cloudaz.appspot.com",
    messagingSenderId: "342761009504"
  };
firebase.initializeApp(config);

let db = firebase.database();
let dbRef = db.ref("data");

//console.log(firebase.name);
*/

const serviceAccount = require("../config/slack4cloudaz-firebase-adminsdk.json");

const doubleDot = '..';

dbAdmin.initializeApp({
  credential: dbAdmin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE_DATABASE
});

// Get a database reference to our data
let db = dbAdmin.database();
let dbRef = db.ref("data");


console.log("End firebase connection");

