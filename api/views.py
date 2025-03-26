from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cv2
import pytesseract
import base64
from io import BytesIO
from PIL import Image
import numpy as np

class ScanTextAPIView(APIView):
    def post(self, request):
        try:
            image_data = request.data.get('image')
            if not image_data:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

            # Decode base64 image
            image_bytes = base64.b64decode(image_data.split(',')[1])
            image = Image.open(BytesIO(image_bytes))

            # Convert to OpenCV format
            img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
            thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

            text = pytesseract.image_to_string(thresh)
            return Response({"text": text.strip()}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)