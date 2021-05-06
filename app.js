const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// let items = ["Yoga", "breakfast", "lunch", "code for couple hours"];
let workList = [];
app.set('view engine', 'ejs');
//step 1 for database
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
}, { useUnifiedTopology: true }, { useFindAndModify: false });
//step 2 create a schema
const itemsSchema = {
  name: String
};
//step 3: create a module
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to our Todo list"
});

const item2 = new Item({
  name: "hit the plus button to add a new field"
});

const item3 = new Item({
  name: "hey there you are awesome"
});

const defaultitems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  Item.find({}, function(err, founditems) {


    if (founditems.length === 0) {
      Item.insertMany(defaultitems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully entered the data entry in the DB !");
        }
        res.redirect("/");
      });
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: founditems
      });
    }


  });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({
    name: customListName
  }, function(err, foundlist) {
    if (!err) {
      if (!foundlist) {
        //then create a new list;
        const list = new List({
          name: customListName,
          items: defaultitems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //show existing list;
        res.render("list", {
          listTitle: foundlist.name,
          newListItems: foundlist.items
        });
      }
    }
  });


});
//////////////////////////////////////////.post;
app.post("/", function(req, res) {

  let itemName = req.body.newListItem;
  let listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundlist) {
      foundlist.items.push(item);
      foundlist.save();
      res.redirect("/" + listName);
    });
  }

})

app.post("/delete", function(req, res) {
  const checkedID = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkedID, function(err) {
      if (!err) {
        console.log("Success deleting the data entry!");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedID
        }
      }
    }, function(err, foundlist) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
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
