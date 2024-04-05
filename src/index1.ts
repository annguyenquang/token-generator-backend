import epress, { Express } from "express";

const app = epress();

app.get("/", (req, res) => {
    res.send("Hello frfdfeom typ   sc ri 123pts");
})


app.listen(3000, () => {
    console.log(`listening on ${3000}`);
})