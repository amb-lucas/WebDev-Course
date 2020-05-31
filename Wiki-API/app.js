const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);

// Targeting all articles

app
  .route("/articles")

  .get((req, res) => {
    Article.find((err, foundArticles) => {
      if (err) res.send(err);
      else res.send(foundArticles);
    });
  })

  .post((req, res) => {
    const { title, content } = req.body;

    const newArticle = new Article({
      title: title,
      content: content,
    });

    newArticle.save((err) => {
      if (!err) res.send("Sucessfully added a new article.");
      else res.send(err);
    });
  })

  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) res.send("Sucessfully deleted all articles.");
      else res.send(err);
    });
  });

// Targetting a specific article

app
  .route("/articles/:articleId")

  .get((req, res) => {
    const article_id = req.params.articleId;
    Article.findById(article_id, (err, foundArticle) => {
      if (err) res.send(err);
      else if (foundArticle) res.send(foundArticle);
      else res.send("No article was found.");
    });
  })

  .put((req, res) => {
    const article_id = req.params.articleId;
    const { title, content } = req.body;

    Article.findByIdAndUpdate(
      article_id,
      {
        title: title,
        content: content,
      },
      { overwrite: true },
      (err, updatedArticle) => {
        if (err) res.send(err);
        else if (updatedArticle) res.send(updatedArticle);
        else res.send("No article was found.");
      }
    );
  })

  .patch((req, res) => {
    const article_id = req.params.articleId;
    const { title, content } = req.body;

    const articleUpdates = _.pickBy({ title, content }, _.identity);

    Article.findByIdAndUpdate(
      article_id,
      articleUpdates,
      (err, updatedArticle) => {
        if (err) res.send(err);
        else if (updatedArticle) res.send(updatedArticle);
        else res.send("No article was found.");
      }
    );
  })

  .delete((req, res) => {
    const article_id = req.params.articleId;
    Article.findByIdAndDelete(article_id, (err, deletedArticle) => {
      if (err) res.send(err);
      else if (deletedArticle) res.send(deletedArticle);
      else res.send("No article was found.");
    });
  });

// App listening

let port = process.env.PORT;
if (!port || port === "") port = 3000;
app.listen(port, function () {
  console.log(`Server has successfully started on port ${port}`);
});
