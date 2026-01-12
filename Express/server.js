import express from "express"

const PORT = 3005;

let app = new express()

app.listen(PORT, () => {
    console.log("server running on port number 3000");
});
