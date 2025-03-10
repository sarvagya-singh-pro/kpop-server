const express = require("express");
const cors = require("cors");
const Melon = require('melon-chart-api');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://www.allkpop.com/';
const articles = [];
async function scrapeKpopNews() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
       

        const articlePromises = $('.title a').map(async (index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            
            if (link) {
                const fullLink = `https://www.allkpop.com${link}`;
                const articleText = await scrapeArticleText(fullLink);
                articles.push({ title, link: fullLink, content: articleText });
            }
        }).get();

        await Promise.all(articlePromises);
        console.log(articles);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function scrapeArticleText(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let content = $('p').map((index, element) => $(element).text().trim()).get().join('\n');
        
        // Remove content after 'SEE ALSO:'
        content = content.split('SEE ALSO:')[0].trim();
        
        return content;
    } catch (error) {
        console.error(`Error fetching article content from ${url}:`, error);
        return '';
    }
}

scrapeKpopNews();
setInterval(scrapeArticleText,10000*60*60*5)

const app = express();
app.use(cors()); // Allow requests from your React Native app

app.get("/api/melon-chart", async (req, res) => {
  try {
    let data=await Melon(new Date().toDateString(), { cutLine: 413 }).daily()
    res.json(data);
  } catch (error) {
    console.error("Error fetching Melon Chart data:", error);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
});
app.get("/news",(req,res)=>{
  try{
  res.json({data:articles||"none"})
  }catch (error) {
    console.error("Error fetching Melon Chart data:", error);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }

})

const PORT = process.env.PORT||3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));