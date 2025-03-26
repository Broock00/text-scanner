# Text Scanner

A web application that captures text from a live camera feed using Optical Character Recognition (OCR). The frontend is built with React and Vite, while the backend uses Django with an OCR library (e.g., Tesseract). Users can manually capture an image from the camera and extract text, which can then be copied to the clipboard.

## Features
- Live camera preview using the browser's MediaStream API.
- Manual text capture with a "Capture" button to prevent continuous updates.
- Text extraction via a Django backend API.
- Copy extracted text to the clipboard.
- Responsive design with a simple, clean UI.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Axios
- **Backend**: Django, Python, Django REST Framework
- **OCR**: Tesseract
- **Proxy**: Vite proxy to handle API requests

## Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git
- A webcam or camera-enabled device

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Broock00/text-scanner.git
cd text-scanner
```

### Backend Setup
1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   *Note: Ensure you have a `requirements.txt` file with dependencies like `django`, `djangorestframework`, and any OCR library (e.g., `pytesseract`).
   ```
   django==4.2
   djangorestframework==3.14
   pytesseract==0.3.10
   pillow==10.0.0
   ```
4. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```
5. **Run the Django server:**
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

### Project Structure
```
text-scanner/
├── backend/
├── api/              # Django app for API logic
├── text_scanner/     # Django project settings
├── manage.py
└── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React components (Camera, TextField, CopyButton)
│   │   ├── utils/        # API utility functions
│   │   ├── App.tsx
│   │   └── index.css
│   ├── vite.config.ts    # Vite configuration with proxy
│   ├── package.json
│   └── README.md
```

## Usage
1. Open your browser to `http://localhost:5173`.
2. Allow camera access when prompted.
3. Point the camera at text you want to scan.
4. Click the "Capture" button to extract the text.
5. The extracted text will appear in the text area.
6. Click the "Copy" button to copy the text to your clipboard.

## API Endpoint
- **POST `/scan/`**
  - **Request Body:** `{ "image": "data:image/jpeg;base64,..." }`
  - **Response:** `{ "text": "extracted text" }`
  - The frontend sends base64-encoded images to this endpoint, which the backend processes with OCR.

## Configuration Notes
- The Vite proxy rewrites `/api/scan/` to `/scan/` to match the backend endpoint. If you change the backend URL structure (e.g., to `/api/scan/`), update `vite.config.ts` accordingly.
- Ensure your OCR library is installed and configured on the backend (e.g., Tesseract requires additional setup like installing the binary and specifying its path).

## Troubleshooting
- **Camera not working:** Check browser permissions and ensure `navigator.mediaDevices.getUserMedia` is supported.
- **404 on `/scan/`:** Verify the backend is running and the endpoint matches the proxy rewrite.
- **400 Bad Request:** Ensure the image payload is a valid base64 string.
- **Text updates continuously:** Confirm `setInterval` is removed from `Camera.tsx`.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License

