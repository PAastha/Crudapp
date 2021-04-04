const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Nepusa@100",
  database: "bookstore",
});

app.post("/create", (req, res) => {
  const  name  = req.body.name;
  const  date= req.body.date;
  const  author = req.body.author;
  const  publisher= req.body.publisher;
  const  status = req.body.status;

  db.query(
    "INSERT INTO book (name, date, author, publisher, status) VALUES (?,?,?,?,?)",
    [name, date, author, publisher, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM book", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    "UPDATE book SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM book WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/search:name",(res,req)=>{
  const name=req.params.name;
  db.query("SELECT * FROM book where name=?",name,(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
