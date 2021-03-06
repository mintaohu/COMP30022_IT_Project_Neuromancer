
require('dotenv').config()
const mongoose = require("mongoose")

// Connect to MongoDB - database login is retrieved from environment variables - YOU SHOULD USE YOUR OWN ATLAS CLUSTER
CONNECTION_STRING = "mongodb+srv://<username>:<password>@seeya.n8mo7.mongodb.net/SeeYa?retryWrites=true&w=majority"

MONGO_URL = CONNECTION_STRING.replace("<username>", "hongthuanta").replace("<password>", "gc7tzhH7e6FsemUK")

mongoose.connect(MONGO_URL || "mongodb://localhost", {
useNewUrlParser: true,
useUnifiedTopology: true,
dbName: "SeeYa"
})

const db = mongoose.connection

db.on("error", err => {
console.error(err);
process.exit(1)
})

db.once("open", async () => {
console.log("Mongo connection started on " + db.host + ":" + db.port)
})