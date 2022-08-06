import { IncomingMessage, Server, ServerResponse } from "http";
const http = require("http");
const {getOrganisations, getOrganisation, createOrganisation, updateOrganisation, deleteOrganisation} = 
require("../lib/controllers/organisationController")


/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => { 
    if (req.url==='/data/details' && req.method === "GET") {
      getOrganisations(req,res)

       }else if(req.url?.match(/\/data\/details\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        
     getOrganisation(req, res, id)

     
        //post request
       }else if (req.url === "/data/details" && req.method === 'POST') {
         createOrganisation(req, res)
        //put request
        }else if(req.url?.match(/\/data\/details\/([0-9]+)/) && req.method === 'PUT'){
           const id = req.url.split("/")[3];
           updateOrganisation(req, res, id)

           //delete
            }else if(req.url?.match(/\/data\/details\/([0-9]+)/) && req.method === 'DELETE'){
           const id = req.url.split("/")[3];
           deleteOrganisation(req, res, id)


       } else {
         res.writeHead(404, { "Content-Type": "application/json" });
         res.end(JSON.stringify({ message: "Route Not Found" }));
      }
  }
);

const PORT = process.env.PORT || 3005;
server.listen(PORT);

