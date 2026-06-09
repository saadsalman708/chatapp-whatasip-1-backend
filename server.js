const app = require("./src/app.js")
const connectDB = require("./src/lib/db.js");

const startServer = async () => {
   try {
    await connectDB();
    
    app.listen(5000 , ()=> {
        console.log("server say hi!");
    })
   } catch (error) {
    console.error(error.message);
    process.exit(1);
   }
}

startServer();