const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let items = ["Yoga", "breakfast", "lunch", "code for couple hours"];
let workList = [];
app.set('view engine', 'ejs');

///////////////////////////////////////////.get;
app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});



//////////////////////////////////////////.post;
app.post("/", function(req, res) {
  //code needed to do all stuff here;
  let item = req.body.newListItem;
  if (req.body.list === "Work") {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workList
  });
})




///////////////////////////////////////////.listen;
app.listen(3000, function(req, res) {
  console.log("server at localhost 3000");
})
