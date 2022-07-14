const Itp = require("../models/Itp.ts");
const routerI = require("express").Router();

routerI.post("/create", async (req, res) => {
  console.log("we creating", req.body);

  const newItp = new Itp(req.body);
  try {
    const saveItp = await newItp.save();

    res.status(200).json(saveItp);
  } catch (err) {
    res.status(500).json(err);
  }
});

routerI.get("/:itp", async (req, res) => {
  try {
    const { itp } = req.params;
    console.log("backend patrams", req.params);

    const itps = await Itp.find({ ItpName: { $regex: itp, $options: "i" } });
    console.log("backend  found", itps);

    res.status(200).json(itps);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routerI;
