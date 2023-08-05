const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const TurndownService = require("turndown");

// URL of the page we want to scrape
const url = "https://v8.dev";

// Initialize Turndown service
const turndownService = new TurndownService();

 function titleNameGenerator(str){
  if(str){
    let filterSpcial = str.replace(/[^a-zA-Z ]/g, "")
    return filterSpcial ? filterSpcial.toLocaleLowerCase().replaceAll(/ /g,"-") : null;
   }
  }
// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url+"/blog");
    const $ = cheerio.load(data);
    const listItems = $("#main ol li");
    const blogData = [];
    listItems.each((idx, el) => {
      const blog = { id: "" ,name: "", date: "", tags: [],href: "",url: "",tag:''};
      let name =  $(el).children("a").text().split('.').join("");
      blog.name = name;
      blog.date = $(el).children("time").text();
      $(el).children("a").each((i, tagEl) => {
        const href = $(tagEl).attr("href");
        const hasTagClass = $(tagEl).hasClass("tag");
        if (!hasTagClass) {
          blog.href = href;
        } else {
          blog.tags.push($(tagEl).text());
        }
      });

      const folderName = titleNameGenerator(blog.tags[0]);
      const postId = titleNameGenerator(blog.name);
      blog.tag = folderName;
      blog.url = `blog_store/posts/${folderName}/${postId}.md`;
      blog.id = postId;
      blogData.push(blog);
    });

    const uniqueTags = _.uniq(blogData.flatMap((blog) => blog.tags));

    for (const tag of uniqueTags) {
      const countriesWithTag = blogData.filter((blog) => blog.tags.includes(tag));
      const folderName = titleNameGenerator(tag.toLowerCase());
      fs.mkdirSync(`.././src/blog_store/posts//${folderName}`, { recursive: true });

      countriesWithTag.forEach((blog) => {
        scrapBlogData(blog.href,blog.id,folderName);
      });
    }
    const jsonFilePath = path.join(__dirname, "..", "src", "blog_store","posts_index.json");
    fs.writeFile(jsonFilePath, JSON.stringify(blogData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written blog to file");
    });
  } catch (err) {
    console.error(err);
  }
}

async function scrapBlogData(href,id,folderName) {
  try {
    const hrefData = await axios.get(url + href);
    const $h = cheerio.load(hrefData.data);
    const content = $h("#main article").html(); // Convert Cheerio object to HTML string
    let newContent = content.replace(/<footer[^>]*>.*<\/footer>/g, '');
    let markdown = turndownService.turndown(newContent);
    const filePath = path.join(__dirname, "..", "src", "blog_store", "posts", folderName, `${id}.md`);
    fs.writeFile(filePath, markdown, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Successfully written data to markdown file for blog post: ${id}`);
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();
