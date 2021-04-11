const express = require("express");
var multer = require("multer");
var cors = require("cors");
const reader = require("xlsx");
const csv = require("csv-parser");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = async (req, file, cb) => {
  var allowedMimeTypes = [
    "application/wps-office.xlsx",
    "text/csv",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    "application/vnd.ms-excel",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = "Only xlsx, txt, csv files are allowed!";
    return cb(new Error("Only xlsx, txt, csv files are allowed!"), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: fileFilter });

const app = express();
app.use(cors());

app.post("/upload/txt", upload.single("txtFile"), function (req, res) {
  try {
    console.log(req.file);
    fs.readFile("./uploads/" + req.file.filename, function (err, data) {
      res.status(200).send({ data: data.toString() });
    });
  } catch (err) {
    res.status(200).send(err);
  }
});

app.post("/upload/csv", upload.single("csvFile"), function (req, res) {
  try {
    console.log(req.file.filename);

    var csvData = [];
    fs.createReadStream("./uploads/" + req.file.filename)
      .pipe(csv())
      .on("data", (row) => {
        console.log(row);
        csvData.push(row);
      })
      .on("end", () => {
        res.send({ data: csvData });
        console.log("CSV file successfully processed");
      });
  } catch (err) {
    res.status(200).send(err);
  }
});

app.post("/upload/xlsx", upload.single("xlsxFile"), function (req, res) {
  try {
    // Reading our test file
    console.log(req.file.filename);
    const file = reader.readFile("./uploads/" + req.file.filename);
    // const file = reader.readFile(req.files[0]);

    let data = [];

    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }

    // Printing data
    // console.log(data);
    res.status(200).send({ data: data });
  } catch (err) {
    res.status(200).send(err);
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
