const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load animal data
const animalsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/animals.json'), 'utf8')
);

// Helper functions
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getAnimalData(animalType) {
  const normalizedType = animalType.toLowerCase();
  return animalsData[normalizedType];
}

function getAllAnimalTypes() {
  return Object.keys(animalsData);
}

// Routes

// Home route with API info
app.get('/', (req, res) => {
  res.json({
    message: 'Animal API - Get random animal pictures and GIFs',
    version: '1.0.0',
    endpoints: {
      'GET /animals': 'List all available animal types',
      'GET /:animal': 'Get a random image for a specific animal',
      'GET /:animal/gif': 'Get a random GIF for a specific animal',
      'GET /:animal/image': 'Get a random image for a specific animal',
      'GET /:animal/all': 'Get all images and GIFs for a specific animal'
    },
    availableAnimals: getAllAnimalTypes()
  });
});

// List all available animals
app.get('/animals', (req, res) => {
  const animals = getAllAnimalTypes().map(type => ({
    type,
    name: animalsData[type].name,
    imageCount: animalsData[type].images.length,
    gifCount: animalsData[type].gifs.length
  }));

  res.json({
    count: animals.length,
    animals
  });
});

// Get random image or GIF for an animal (default behavior)
app.get('/:animal', (req, res) => {
  const animalData = getAnimalData(req.params.animal);

  if (!animalData) {
    return res.status(404).json({
      error: 'Animal not found',
      availableAnimals: getAllAnimalTypes()
    });
  }

  // Combine both images and GIFs for random selection
  const allMedia = [...animalData.images, ...animalData.gifs];
  const randomMedia = getRandomItem(allMedia);

  res.redirect(randomMedia);
});

// Get random image for an animal
app.get('/:animal/image', (req, res) => {
  const animalData = getAnimalData(req.params.animal);

  if (!animalData) {
    return res.status(404).json({
      error: 'Animal not found',
      availableAnimals: getAllAnimalTypes()
    });
  }

  if (animalData.images.length === 0) {
    return res.status(404).json({
      error: 'No images available for this animal'
    });
  }

  const randomImage = getRandomItem(animalData.images);
  res.redirect(randomImage);
});

// Get random GIF for an animal
app.get('/:animal/gif', (req, res) => {
  const animalData = getAnimalData(req.params.animal);

  if (!animalData) {
    return res.status(404).json({
      error: 'Animal not found',
      availableAnimals: getAllAnimalTypes()
    });
  }

  if (animalData.gifs.length === 0) {
    return res.status(404).json({
      error: 'No GIFs available for this animal'
    });
  }

  const randomGif = getRandomItem(animalData.gifs);
  res.redirect(randomGif);
});

// Get all media for an animal
app.get('/:animal/all', (req, res) => {
  const animalData = getAnimalData(req.params.animal);

  if (!animalData) {
    return res.status(404).json({
      error: 'Animal not found',
      availableAnimals: getAllAnimalTypes()
    });
  }

  res.json({
    animal: req.params.animal,
    name: animalData.name,
    images: animalData.images,
    gifs: animalData.gifs,
    totalCount: animalData.images.length + animalData.gifs.length
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /animals',
      'GET /:animal',
      'GET /:animal/image',
      'GET /:animal/gif',
      'GET /:animal/all'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Animal API server running on port ${PORT}`);
  console.log(`Available animals: ${getAllAnimalTypes().join(', ')}`);
});

module.exports = app;
