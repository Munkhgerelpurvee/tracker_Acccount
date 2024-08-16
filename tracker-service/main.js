const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//
app.get("/", (req, res) => {
  res.send("HELO WORLD!");
});
//

app.get("/record", (req, res) => {
  // энэ дотор data базаас утгуудаа аваад res.json дотор буцааж болно
  // Мөн data баз руу  юм нэмж болно
  //   source кодоо өөрчлөхгүйгээр яаж data-гаа өөрчлөх вэ?
  res.json([
    { id: 1, title: "CRUD" },
    { id: 2, title: "Create" },
    { id: 3, title: "Read" },
    { id: 4, title: "Delete" },
  ]);
});

// Эхний арга нь RAM дээр хадагалах буюу accounts гэсэн хувьсагч өгч хадагалах
const accounts = [
  {
    name: "shopping",
    title: "hello",
  },
];

// Одоо RAM дээр хадагалснаа хэрхэн унших вэ? Энэ зам дээр READ accounts http://localhost:4000/accounts/list
app.get("/accounts/list", (req, res) => {
  res.json(accounts);
});

//
// Одоо нэмэхдээ "new accounts","saraa" гэдэг үгээр биш http://localhost:4000/accounts/create дээр name - гэдэг parameter дамжуулаад http://localhost:4000/accounts/create?name=Naraa  өөр үгээр нэмэхийг хүсвэл хэрхэн нэмэх вэ? Хүсэн үгээрээ нэмээд const accounts дээр оруулж ирэх вэ? Тэгэхээр одоо хэрэгтэй зүйл нь ?name=Naraa - гэдэг parameter нь "saraa" - гэдэг  үгийн оронд байх хэрэгтэй байна
//
//  http://localhost:4000/accounts/create  дээр хэрхэн мэдээлэл нэмэх вэ? Ингэж default-р кодон дээр байхгүй зүйлийг нэмж чадаж байна.
//
//CRUD:Create
app.get("/accounts/create", (req, res) => {
  //   console.log(req.params);
  //   console.log(req.query);
  //   accounts.push({ title: "new accounts", name: "saraa" });
  //   res.json("SUCCESS");
  const { title } = req.query;
  const { name } = req.query;
  accounts.push({ title: title, name: name });
  //
  //   Ингэж бичвэл хүссэн нэр болон гарчигаа бичих боломжтой болно.
  res.json(accounts);
  //   Output:http://localhost:4000/accounts/create?name=Ider&title=Hero
  //
  // http://localhost:4000/accounts/list
  //
  //  нэг бол дээр хувьсагчаар зарлахгүйгээр ингэж бичиж болно.
  //   accounts.push({ title: req.params.title, name: req.params.name });
  //   res.json("SUCCESS");
});
//
//CRUD:Update
app.get("/accounts/update", (req, res) => {
  //
  res.json("SUCCESS");
});
//
//CRUD:Delete
app.get("/accounts/Delete", (req, res) => {
  //
  res.json("SUCCESS");
});

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// CRUD: Create, Read, Update, Delete
