const express = require("express");

const db = require("./data/hubs-model.js"); //import database file

const server = express();
server.use(express.json()); //needed to parse JSON from the body

server.get("/", (req, res) => {
  res.send({ api: "Up and running..." }); //returns json obj
});

// list of hubs  implement endpoint
server.get("/hubs", (req, res) => {
  //get list from db
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log("error on GET /hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of hubs from database" });
    });
});

server.post("/hubs", (req, res) => {
  //get data client sent
  const hubData = req.body; //express doesn't know how to parse JSON
  //call the db and add the hub
  db.add(hubData)
    .then(hub => {
      res.status(201).json(hubData);
    })
    .catch(error => {
      console.log("error on POST /hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error creating list of hubs from database" });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "hubs removed successfully", removed });
      } else {
        res.send(404).json({ message: "hub not found" });
      }
    })
    .catch(error => {
      console.log("error on DELETE /hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error deleting list of hubs from database" });
    });
});

//update a hub, passing id and changes

const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);
