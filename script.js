// Global variables
let currentUser = null;
let capturedImage = null;
let uploadedImage = null;
let stream = null;

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const startScanner = document.getElementById('startScanner');
const captureBtn = document.getElementById('captureBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removeImage = document.getElementById('removeImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const userEmail = document.getElementById('userEmail');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    startScanner.addEventListener('click', startCamera);
    captureBtn.addEventListener('click', captureImage);
    fileInput.addEventListener('change', handleFileUpload);
    removeImage.addEventListener('click', removeUploadedImage);
    analyzeBtn.addEventListener('click', analyzeImage);
    
    // Drag and drop functionality
    setupDragAndDrop();
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, this would be API call)
    if (email && password) {
        currentUser = { email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
}

function showDashboard() {
    loginSection.classList.remove('active');
    dashboardSection.classList.add('active');
    userEmail.textContent = currentUser.email;
}

function showLogin() {
    dashboardSection.classList.remove('active');
    loginSection.classList.add('active');
    document.getElementById('loginForm').reset();
}

// Camera Functions
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            } 
        });
        
        video.srcObject = stream;
        startScanner.style.display = 'none';
        captureBtn.style.display = 'flex';
        
        // Show video container
        document.getElementById('scannerContainer').style.display = 'block';
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
    }
}

function captureImage() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    capturedImage = canvas.toDataURL('image/jpeg');
    
    // Stop camera
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    // Reset UI
    startScanner.style.display = 'flex';
    captureBtn.style.display = 'none';
    document.getElementById('scannerContainer').style.display = 'none';
    
    // Enable analyze button
    analyzeBtn.disabled = false;
    
    // Show preview
    showImagePreview(capturedImage);
}

// File Upload Functions
function setupDragAndDrop() {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        showImagePreview(uploadedImage);
        analyzeBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function showImagePreview(src) {
    previewImage.src = src;
    uploadArea.style.display = 'none';
    previewContainer.style.display = 'block';
}

function removeUploadedImage() {
    uploadedImage = null;
    capturedImage = null;
    previewContainer.style.display = 'none';
    uploadArea.style.display = 'block';
    analyzeBtn.disabled = true;
    fileInput.value = '';
}

// Analysis Functions
async function analyzeImage() {
    const imageToAnalyze = capturedImage || uploadedImage;
    
    if (!imageToAnalyze) {
        alert('Please capture or upload an image first.');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call (replace with actual API endpoint)
        const result = await simulateAnalysis(imageToAnalyze);
        
        hideLoading();
        displayResults(result, imageToAnalyze);
    } catch (error) {
        hideLoading();
        console.error('Analysis error:', error);
        alert('Error analyzing image. Please try again.');
    }
}

function simulateAnalysis(image) {
    return new Promise((resolve) => {
        // Simulate processing time
        setTimeout(() => {
            // Mock results - replace with actual API call
            const conditions = [
                'Melanoma',
                'Basal Cell Carcinoma',
                'Squamous Cell Carcinoma',
                'Actinic Keratosis',
                'Benign Keratosis',
                'Dermatofibroma',
                'Vascular Lesion',
                'Melanocytic Nevus'
            ];
            
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
            
            resolve({
                condition: randomCondition,
                confidence: confidence,
                recommendations: [
                    'Consult with a dermatologist immediately',
                    'Schedule a follow-up appointment',
                    'Monitor for any changes in size or color',
                    'Avoid excessive sun exposure',
                    'Use sunscreen daily'
                ]
            });
        }, 3000);
    });
}

function displayResults(result, imageSrc) {
    // Update results
    document.getElementById('predictedCondition').textContent = result.condition;
    document.getElementById('confidenceText').textContent = `${result.confidence}%`;
    document.getElementById('confidenceFill').style.width = `${result.confidence}%`;
    document.getElementById('resultImage').src = imageSrc;
    
    // Update recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    result.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
    
    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// UI Functions
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        if (analyzeBtn.disabled === false) {
            analyzeImage();
        }
    }
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden && stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
}
