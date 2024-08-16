const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

//
app.get("/", (req, res) => {
  res.send("HELO WORLD!");
});
//

app.get("/article", (req, res) => {
  // энэ дотор data базаас утгуудаа аваад res.json дотор буцааж болно
  // Мөн data баз руу  юм нэмж болно
  //   source кодоо өөрчлөхгүйгээр яаж data-гаа өөрчлөх вэ?
  res.json([
    { id: 1, title: "CRUD", name: "C" },
    { id: 2, title: "Create", name: "R" },
    { id: 3, title: "Read", name: "U" },
    { id: 4, title: "Delete", name: "D" },
  ]);
});

// Эхний арга нь RAM дээр хадагалах буюу accounts гэсэн хувьсагч өгч хадагана. Энэ хувьсагч бидний RAM дээр хадгалагдах тул унтраангуут л бидний өгсөн утгуудыг хадгалахггүй харин default-р гараар өгсөн утгуудыг нь хадгална. Харин frontEnd-c button дарж prompt-р өгсөн утгуудыг хадгалахгүй. Энэ нь түр санах ойд хадгалаж байгаа буй унтраагаад асааангуут түр санах ой цэвэрлэгдээд анхны default-р гараар өгсөн утгуудыг л байдаг байгаатай холбоотой. Бүх утгууд нь эхний утгууд дээрээ очдог гэсэн санаа. Бүх утгаа авч үлдэхийн тулд хувьсагч руу утгаа хадгалах биш харин файл руу бичиж хадгалж болно.Файл руу хадгалах үйлдлийг backEnd code бичиж чаддаг байгаа. backEnd code нь бидний компьютер рүү хандаж чаддаг байгаа.Тэгэхээр файл руу хувьсагч const accounts - гэдгийг хадгалчихад болно.

// const accounts = [
//   {
//     name: "shopping",
//     title: "hello",
//   },
//   {
//     name: "Ider",
//     title: "hero",
//   },
// ];
// Read from file system
const content = fs.readFileSync("accounts.json", "utf-8");
let accounts = JSON.parse(content);

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
  accounts.push({
    id: new Date().toISOString(),
    title: title,
    name: name,
  });
  //
  //   Ингэж бичвэл хүссэн нэр болон гарчигаа бичих боломжтой болно.
  //   Output:http://localhost:4000/accounts/create?name=Ider&title=Hero
  //
  // http://localhost:4000/accounts/list
  //
  //  нэг бол дээр хувьсагчаар зарлахгүйгээр ингэж бичиж болно.
  //   accounts.push({ title: req.params.title, name: req.params.name });
  //   res.json("SUCCESS");

  // Write to file system
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json(accounts);
});
//
//CRUD:Update
app.get("/accounts/update", (req, res) => {
  //
  const { id, name, title } = req.query;
  // index-ийг нь id-гаар нь олж засах
  const index = accounts.findIndex((acc) => acc.id === id);
  accounts[index].name = name;
  accounts[index].title = title;

  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json("SUCCESS");
});
//
//CRUD:Delete 200ok
app.get("/accounts/Delete", (req, res) => {
  //
  const { id } = req.query;
  console.log({ id });
  accounts = accounts.filter((acc) => acc.id !== id);
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json("SUCCESS");
});

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// CRUD: Create, Read, Update, Delete
