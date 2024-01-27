const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/kshitiz', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  const options = {
    method: 'GET',
    url: 'https://youtube-search-and-download-api.p.rapidapi.com/search',
    params: {
      query: query,
      page: '1',
    },
    headers: {
      'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
      'X-RapidAPI-Host': 'youtube-search-and-download-api.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

   
    console.log(response.data);

    
    const videos = response.data || [];
    const videoInfo = videos.map((video) => ({
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
    }));

    res.json(videoInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
