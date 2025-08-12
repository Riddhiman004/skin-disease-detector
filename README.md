# DermaScan AI - Skin Disease & Cancer Prediction Interface

A modern, responsive web interface for skin disease and cancer prediction using AI/ML technology.

## Features

### 🔐 Authentication
- Secure login system with email/password
- Persistent session management using localStorage
- Logout functionality

### 📸 Image Analysis Options
1. **Live Scanner**
   - Real-time camera access
   - Interactive scanning interface with frame guide
   - One-click capture functionality

2. **Image Upload**
   - Drag & drop support
   - File browser integration
   - Image preview with remove option
   - Support for common image formats (JPG, PNG, etc.)

### 📊 Results Dashboard
- Detailed analysis results
- Confidence level visualization
- Personalized recommendations
- Responsive design for all devices

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with CSS Grid & Flexbox
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)
- **Responsive**: Mobile-first design

## Getting Started

### Prerequisites
- Modern web browser with camera access
- Local web server (recommended for camera functionality)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For full camera functionality, serve via local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### Usage

1. **Login**: Enter any email and password (demo mode)
2. **Choose Analysis Method**:
   - Click "Start Scanner" for live camera
   - Or drag & drop/upload an image
3. **Capture/Upload Image**: Take photo or select file
4. **Analyze**: Click "Analyze Image" to process
5. **View Results**: See predictions and recommendations

## File Structure
```
skin-disease-detector/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Interactive functionality
└── README.md          # Documentation
```

## Customization

### Colors
Edit CSS variables in `:root` to change theme:
```css
--primary-color: #2563eb;
--secondary-color: #1e40af;
```

### API Integration
Replace `simulateAnalysis()` function in `script.js` with actual API call:
```javascript
// Replace this:
const result = await simulateAnalysis(imageToAnalyze);

// With actual API:
const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    body: formData
});
```

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Features
- Input validation
- File type checking
- Camera permission handling
- Error boundaries

## Performance Optimizations
- Lazy loading
- Image compression
- Efficient DOM manipulation
- Responsive images

## Future Enhancements
- User registration system
- Analysis history
- Multiple image analysis
- Export results
- Dark mode toggle
- Multi-language support

## Demo Credentials
- Email: user@example.com
- Password: any (demo mode)

## License
This project is created for educational purposes as a final year project.

## Support
For issues or questions, please check the browser console for error messages and ensure camera permissions are granted.
