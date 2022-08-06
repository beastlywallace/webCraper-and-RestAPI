const Organisation = require("../models/organisationModel");
import { IncomingMessage, ServerResponse } from "http";
const { getPostOrganisation } = require("../utils");

//GET all data
async function getOrganisations(req:IncomingMessage, res:ServerResponse) {
  try {
    const organisations = await Organisation.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(organisations));
  } catch (error) {
    console.log(error);
  }
}

//get a single organisation
async function getOrganisation(req:IncomingMessage, res:ServerResponse, id:number) {
  try {
    const organisation = await Organisation.findById(id); 
    if (!organisation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(organisation));
    }
  } catch (error) {
    console.log(error);
  }
}

//create a data
// geting a POST request controller

async function createOrganisation(req:IncomingMessage, res:ServerResponse) {
  try {


    let body = "";
    req.on("data", (chunk) => {

      body += chunk.toString();
    });
    req.on("end", async () => {
      const { organization, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees } =
        JSON.parse(body);
      const organisation = {
        organization,
        createdAt,
        updatedAt,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees
      };
      
      const newOragnisation = await Organisation.create(organisation);
      res.writeHead(201, { "content-Type": "application/json" });
      return res.end(JSON.stringify(newOragnisation));
    });
  } catch (error) {
    console.log(error);
  }
}


//UPDATE
//PUT REQUEST
async function updateOrganisation(req:IncomingMessage, res:ServerResponse, id:number) {
  try {
    const organisation = await Organisation.findById(id) 
    if(!organisation){
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    }else{

      const body = await getPostOrganisation(req)

      
      const { organization, createdAt, updatedAt, products, marketValue } =
        JSON.parse(body);
      const organisationData = {
        organization:  organization || organisation.title,
        createdAt: createdAt || organisation.createdAt,
        updatedAt: updatedAt || organisation.updatedAt,
        products: products || organisation.products,
        marketValue: marketValue || organisation.marketValue
      };

      // console.log("here");
      const updOragnisation = await Organisation.update(id, organisationData);
   
      res.writeHead(200, { "content-Type": "application/json" });
      res.end(JSON.stringify(updOragnisation));

    }
    
  
  } catch (error) {
    console.log(error);
  }
}


//delete request
async function deleteOrganisation(req:IncomingMessage, res:ServerResponse, id:number) {
  try {
    const organisation = await Organisation.findById(id); 
    if (!organisation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Organisation.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message: `Organisation ${id} removed`}));
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation

};
