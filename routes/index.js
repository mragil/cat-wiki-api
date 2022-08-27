// import lodash
const _ = require('lodash');
// import express
const express = require("express");
// import fetch
const fetch = require("node-fetch");
// express router
const router = express.Router();
 
const headers = {
  'x-api-key': '3ca2c026-8fae-4c0b-9c19-43dc1ef92b08'
};

router.get('/breeds/all', async (req, res) => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds', { headers});
  const breeds = await response.json();
  res.send(breeds);
})

router.get('/most-searched', async (req, res) => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', { headers });
    const catBreeds = await response.json();
    const filteredBreeds = _.sampleSize(catBreeds, 4)
    res.send(filteredBreeds);
});

router.get('/breeds/:breed', async (req, res) => {
  const { breed } = req.params;
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, { headers });
  const catBreeds = await response.json();
  if(catBreeds.length === 0) {
    return res.status(404).send({
    message: 'Breed not found!'
  });
  }

  const cat = {
    ...catBreeds[0].breeds[0],
    image : {
      url: catBreeds[0].url
    }
  }

  return res.send(cat);
})

router.get('/breeds/:breed/more-photo', async (req, res) => {
  const { breed } = req.params;
  console.log(breed)
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breed}&limit=8`, { headers });
  const catImages = await response.json();
  if(catImages.length === 0) {
    return res.status(404).send({
    message: 'Breed not found!'
  });
  }
  const images = catImages.map((image) => _.pick(image, ['id','url']));
  return res.send(images);
})

// export router
module.exports = router;