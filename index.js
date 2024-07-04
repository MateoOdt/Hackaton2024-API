//const http = require("http");
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtJsDecode = require('jwt-js-decode');

const localhost = "127.0.0.1";
const PORT = 8000;

const app = express();

const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBlc3RpYW0uY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3Mjc3NDA3OTksInJvbGUiOiJlbXBsb3llZSJ9.CzHm8hlLNQOnakPREMVwXIorMM0eUW15yxJCFICtXc";

app.listen(PORT, () => console.log(`Serveur en écoute sur le PORT: ${PORT} ~ http://localhost:${PORT}`));

app.get('/getTokenPayload/:token', (req, res) => {
  const {token} = req.params;
  if(!token){res.status(418).send({message:'Il vous faut un JWT'});}
  decodedToken = jwtJsDecode.decode(token);
  res.status(200).send({tokenPayload:decodedToken.payload});
})

app.post('/sendToken/:token', (req, res) => {
  const {token} = req.params;
  let tokenDecodedData = {}; // Données utilisateur contenu dans le token et à envoyer dans la base de données ou à comparer avec les information en notre possesion (Authentification)

  if(!token){res.status(418).send({message:'Il vous faut un JWT'});}

  decodedToken = jwtJsDecode.decode(token);
  tokenDecodedData = decodedToken;
  /*********************************
  tokenDecodedData au des données de ce genre :
  **********************************/
  // {
  //   name: "John Doe",
  //   email: "john.doe@estiam.com",
  //   iat: "1516239022 (January, 18, 2018, 01:30:22 UTC)",
  //   exp: "1727740799 (September, 30, 2024, 23:59:59 UTC)",
  //   role: "employee"
  // }

  //DONC tokenDecodedData.email par exemple = "john.doe@estiam.com"

  console.log(decodedToken) // Les données du token

  /*Implémentation de la partie base de données ######################
  ###################################################################*/
  res.send({token:decodedToken});
})
