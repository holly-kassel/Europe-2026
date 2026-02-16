#!/bin/bash
# Download all images from Europe-2026 GitHub issues
# Run this script from the images folder: ./download-images.sh

echo "Downloading images from Europe-2026 issues..."

# Issue #8 - Fifteen Keys Hotel, Rome
echo "Downloading: Fifteen Keys Hotel..."
curl -L -o "issue-08-fifteen-keys-hotel.png" \
  "https://github.com/user-attachments/assets/39a42ed6-13ef-4070-adb5-352c6f632615"

# Issue #9 - Booking confirmation
echo "Downloading: Booking confirmation..."
curl -L -o "issue-09-booking-confirmation.png" \
  "https://github.com/user-attachments/assets/d0385f01-a907-4edf-89d8-c632c14e4540"

# Issue #10 - Delta flight ORD→CDG
echo "Downloading: Delta flight confirmation..."
curl -L -o "issue-10-delta-flight-ord-cdg.png" \
  "https://github.com/user-attachments/assets/2c630ce9-090e-4a3d-85fc-51a61a717c1c"

# Issue #12 - American flight FCO→ORD
echo "Downloading: American flight confirmation..."
curl -L -o "issue-12-american-flight-fco-ord.png" \
  "https://github.com/user-attachments/assets/e2a87c8d-622d-4ef5-8a92-15500814080e"

# Issue #13 - Train itinerary (1)
echo "Downloading: Train itinerary 1..."
curl -L -o "issue-13-train-itinerary-1.png" \
  "https://github.com/user-attachments/assets/b694fbcc-3eed-4e7e-b217-77e6e1483e6e"

# Issue #13 - Train itinerary (2)
echo "Downloading: Train itinerary 2..."
curl -L -o "issue-13-train-itinerary-2.png" \
  "https://github.com/user-attachments/assets/c00e9910-9d05-41a0-9e46-5c90e1639cff"

# Issue #15 - Itinerary screenshot
echo "Downloading: Itinerary screenshot..."
curl -L -o "issue-15-itinerary.png" \
  "https://github.com/user-attachments/assets/ba3839c8-3b1b-46dd-b493-ce370bcac5c4"

# README - Delta flight (may be duplicate of issue-10)
echo "Downloading: README Delta flight..."
curl -L -o "readme-delta-flight.png" \
  "https://github.com/user-attachments/assets/d272fdab-b374-4a4f-b629-42c2f77d88b8"

# README - American flight (may be duplicate of issue-12)
echo "Downloading: README American flight..."
curl -L -o "readme-american-flight.png" \
  "https://github.com/user-attachments/assets/4342ec3d-175e-4dc6-ada5-443bfe6cdc33"

echo ""
echo "Done! Downloaded images:"
ls -la *.png 2>/dev/null || echo "No PNG files found"
