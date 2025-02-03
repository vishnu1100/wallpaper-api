## Free wallpaper-api Hosted onrender 


### Local Testing : http://localhost:3000/api/wallpapers



# Wallpaper API Documentation

## Base URL:
All endpoints can be accessed at `https://wallpaper-api-41jy.onrender.com/api/wallpapers`.

---

## 1. GET /api/wallpapers

### Description:
Fetches the list of wallpapers available in the `api/wallpapers` directory. It returns the image metadata (title and URL) for each wallpaper.

### Response:
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`

```json
[
  {
    "title": "sunset",
    "url": "https://<your-project-id>.onrender.com/api/wallpapers/sunset.jpg"
  },
  {
    "title": "mountains",
    "url": "https://<your-project-id>.onrender.com/api/wallpapers/mountains.jpg"
  }
]
```

### Notes:
- Only image files with extensions `.jpg`, `.jpeg`, `.png`, and `.webp` are returned.

---

## 2. POST /api/upload

### Description:
Uploads a new wallpaper image to the `public/wallpapers/` directory. The uploaded image will be accessible through the `/api/wallpapers` endpoint.

### Request:
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Form Field Name:** `wallpaper`
- **Body:** A single image file.

### Example Request (cURL):
```bash
curl -X POST https://<your-project-id>.onrender.com/api/upload   -F "wallpaper=@/path/to/your/image.jpg"
```

### Response:
- **Status Code:** `200 OK` (if the upload is successful)
- **Content-Type:** `application/json`

```json
{
  "message": "Wallpaper uploaded successfully",
  "file": "image.jpg"
}
```

- **Status Code:** `400 Bad Request` (if no file is provided)
- **Content-Type:** `application/json`

```json
{
  "error": "No file uploaded"
}
```

### Notes:
- The image will be stored in the `public/wallpapers/` folder with its original filename.
- If the file upload fails (e.g., due to size or type restrictions), an error will be returned.

---

## 3. Static File Serving

### Description:
Images uploaded via the `POST /api/upload` endpoint, or existing images, can be accessed directly using their URL. The images are served statically from the `public/wallpapers` folder.

### URL Pattern:
`/api/wallpapers/<image-name>`

### Example:
To view the `sunset.jpg` image:
```
https://wallpaper-api-41jy.onrender.com/api/wallpapers/10.png
```

### Notes:
- The images are served with their original filename.
- Only files with extensions `.jpg`, `.jpeg`, `.png`, and `.webp` are supported.

---

## Example Workflow

### Step 1: Upload a Wallpaper

1. **Send a `POST` request** to `/api/upload` with the image file:
   - Use a file input in HTML or `curl` to upload the file.

### Step 2: View Wallpapers

1. **Send a `GET` request** to `/api/wallpapers` to get the list of wallpapers.
2. **Display the wallpapers** dynamically in your app, using the `url` from the API response.

### Step 3: Access Uploaded Wallpapers

1. **Access individual images** via their URL:
   - `https://<your-project-id>.onrender.com/api/wallpapers/<image-name>`

---

## Deployment

- **Firebase Functions Deployment:**  
  Ensure your functions are deployed with the correct configuration. Run the following command to deploy your API:
  ```bash
  firebase deploy --only functions
  ```

- **Firebase Hosting Deployment:**  
  Ensure static files (wallpapers) are served from the `public/wallpapers` directory.

---

### File Structure

```plaintext
/wallpaper-app
│── /functions             (Contains server logic)
│   ├── /node_modules
│   ├── index.js           (Firebase functions entry point)
│   ├── server.js          (Express app with API)
│   ├── package.json
│── /public                (Public folder served by Firebase Hosting)
│   ├── /wallpapers        (Folder for uploaded wallpapers)
│   ├── index.html         (Frontend interface for the app)
│   ├── upload.html        (Upload form for wallpaper)
│   ├── styles.css         (CSS for styling)
│   ├── script.js          (JavaScript logic to fetch wallpapers)
│── firebase.json          (Firebase Hosting and Functions config)
```

---

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install express multer cors
   ```

2. **Run the API locally** (for testing):
   ```bash
   node server.js
   ```

3. **Deploy to Firebase( Optional )**:
   - Deploy Functions using `firebase deploy --only functions`.
   - Deploy Hosting using `firebase deploy --only hosting`.

---
