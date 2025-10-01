# Animal API

A simple REST API that provides random animal pictures and GIFs, similar to [cataas.com](https://cataas.com) but supporting multiple animal types.

## Currently Supported Animals

- Dogs
- Cats
- Turtles
- Ducks
- Gophers
- Rhinos

The architecture supports up to 1000+ different animal types.

## Installation

```bash
npm install
```

## Running the API

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 3000 by default (configurable via `PORT` environment variable).

## API Endpoints

### `GET /`
Returns API information and available endpoints.

### `GET /animals`
Lists all available animal types with their image and GIF counts.

**Example Response:**
```json
{
  "count": 6,
  "animals": [
    {
      "type": "dog",
      "name": "Dog",
      "imageCount": 5,
      "gifCount": 3
    }
  ]
}
```

### `GET /:animal`
Returns a random image or GIF for the specified animal (redirects to the media URL).

**Example:**
- `GET /dog` - Random dog image or GIF
- `GET /cat` - Random cat image or GIF

### `GET /:animal/image`
Returns a random image for the specified animal (redirects to the image URL).

**Example:**
- `GET /dog/image` - Random dog image
- `GET /turtle/image` - Random turtle image

### `GET /:animal/gif`
Returns a random GIF for the specified animal (redirects to the GIF URL).

**Example:**
- `GET /dog/gif` - Random dog GIF
- `GET /rhino/gif` - Random rhino GIF

### `GET /:animal/all`
Returns all available images and GIFs for the specified animal.

**Example Response:**
```json
{
  "animal": "dog",
  "name": "Dog",
  "images": ["url1", "url2"],
  "gifs": ["url1", "url2"],
  "totalCount": 8
}
```

## Adding New Animals

To add a new animal type:

1. Edit `data/animals.json`
2. Add a new entry with the animal type as the key:

```json
{
  "newanimal": {
    "name": "New Animal",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "gifs": [
      "https://example.com/gif1.gif"
    ]
  }
}
```

3. Restart the server

No code changes required - the API automatically picks up new animal types from the JSON file.

## Testing

```bash
npm test
```

## Project Structure

```
animal-api/
├── data/
│   └── animals.json       # Animal data (images and GIFs)
├── src/
│   └── index.js          # Main API server
├── package.json
└── README.md
```

## License

MIT
