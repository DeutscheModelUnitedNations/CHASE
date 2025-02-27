// This script is only used to sync the german nation names with the DMUN MUNdi Database and is obsolete from this point on.
// This file can be used if the DMUN MUNdi Database is ever updated and the german nation names need to be updated.
// The base JSON file from the MUNdi Export is called german_names_mundi.json and is located in the same directory as this file.

import german from "german_names_mundi.json";

const fs = require("node:fs");

const data = JSON.parse(fs.readFileSync("../nations.json", "utf8"));

for (const i of data) {
  for (const j of german) {
    if (j["ISO-Code"].toUpperCase() === i.alpha2.toUpperCase()) {
      i.de = j["Namensvariante beim Druck"];
      break;
    }
  }
}

fs.writeFileSync("../nations.json", JSON.stringify(data, null, 2), "utf8");
