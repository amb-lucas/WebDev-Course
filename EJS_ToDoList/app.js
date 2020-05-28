//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = { name: String };
const listSchema = { name: String, items: [itemsSchema] };

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({ name: "Welcome to your list" });
const item2 = new Item({ name: "Hit the + button to add a new item" });
const item3 = new Item({ name: "<-- Hit this to delete an item" });
const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (err) console.log(err);
    else if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) console.log(err);
        else res.render("list", { listTitle: "Today", items: foundItems });
      });
    } else {
      res.render("list", { listTitle: "Today", items: foundItems });
    }
  });
});

app.get("/:customListName", (req, res) => {
  const listName = _.capitalize(req.params.customListName);

  if (listName === "Today") {
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      if (err) {
        console.log(err);
      } else if (!foundList) {
        // Create new List

        const list = new List({
          name: listName,
          items: defaultItems,
        });
        list.save();

        res.redirect(`/${listName}`);
      } else {
        // Show existing List

        res.render("list", { listTitle: listName, items: foundList.items });
      }
    });
  }
});

app.post("/Today", (req, res) => {
  console.log(` >>> POST /Today`);

  const itemName = req.body.newItem;

  // Alternative:
  // const newItem = new Item({ name: itemName });
  // newItem.save();

  Item.create({ name: itemName }, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.list;

  if (listName === "Today") {
    Item.findByIdAndDelete(checkedItemId, (err) => {
      if (err) console.log(err);
      res.redirect("/Today");
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      {
        $pull: {
          items: { _id: checkedItemId },
        },
      },
      (err, foundList) => {
        if (err) console.log(err);
        res.redirect(`/${listName}`);
      }
    );
  }
});

app.post("/:customListName", (req, res) => {
  const listName = req.params.customListName;
  const item = new Item({
    name: req.body.newItem,
  });

  if (listName === "to-list") {
    const toList = req.body.listName;
    res.redirect(`/${toList}`);
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      if (err) console.log(err);
      else if (foundList) {
        foundList.items.push(item);
        foundList.save();
      }
    });

    res.redirect(`/${listName}`);
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
