let organisations = require("../../organisations");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");


function findAll() {
  return new Promise((resolve, reject) => {
    resolve(organisations);
  });
}

function findById(id:number) {
  return new Promise((resolve, reject) => {
    const organisation = organisations.find((p:Record<string, string[]|number|string>) => p.id == id);
    resolve(organisation);
  });
}

function create(organisation:Record<string, string[]|number|string>) {
  return new Promise((resolve, reject) => {
    if (organisations.length === 0) {
      let id = 1;
      let newOragnisation = { ...organisation, id };
      organisations.push(newOragnisation);
      writeDataToFile("./organisations.json", organisations);
      resolve(newOragnisation);
    } else {
      let id = organisations[organisations.length - 1].id + 1;
      let newOragnisation = { ...organisation, id: id };
      organisations.push(newOragnisation);
      writeDataToFile("./organisations.json", organisations);
      resolve(newOragnisation);
    }
  });
}

//update

function update(id:number, organisation: Record<string, string[] | number | string>) {
  return new Promise((resolve, reject) => {
    const index = organisations.findIndex((p:Record<string, string[]|number|string>) => p.id == id);
    console.log(index);
    
    organisations[index] = { id, ...organisation };
    writeDataToFile("./organisations.json", organisations);
    resolve(organisations[index]);
  });
}

//delete

function remove(
  id: number,
  organisation:  string
) {
  return new Promise((resolve, reject) => {
   
    organisations = organisations.filter(
      (p: Record<string, string[] | number | string>) => p.id !== id
    );
    writeDataToFile("./organisations.json", organisations);
    resolve(1);
  });
}



module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
