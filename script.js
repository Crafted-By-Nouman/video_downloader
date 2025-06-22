// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "auto";

  // Change icon
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";

  // Change icon back to bars
  const icon = mobileMenuBtn.querySelector("i");
  icon.classList.remove("fa-times");
  icon.classList.add("fa-bars");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".mobile-menu .nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";

    // Change icon back to bars
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// DOM Elements
const downloadBtn = document.querySelector(".download-btn");
const urlInput = document.querySelector(".url-input");
const loading = document.querySelector(".loading");
const successAlert = document.querySelector(".alert-success");
const errorAlert = document.querySelector(".alert-error");
const warningAlert = document.querySelector(".alert-warning");
const floatingDownloadBtn = document.querySelector(".floating-download-btn");
const videoPreviewContainer = document.querySelector(
  ".video-preview-container"
);
const videoIframe = document.querySelector(".video-iframe");
const videoTitle = document.querySelector(".video-title");
const videoMeta = document.querySelector(".video-meta");
const qualityButtons = document.querySelector(".quality-buttons");
const downloadActionBtn = document.querySelector(".download-action");
const cancelActionBtn = document.querySelector(".cancel-action");

// Sample video data (in a real app, this would come from an API)
const sampleVideoData = {
  title: "Amazing Sunset at the Beach",
  views: "1.2M",
  likes: "45K",
  duration: "5:30",
  thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  qualities: [
    { quality: "1080p", type: "MP4", size: "45MB" },
    { quality: "720p", type: "MP4", size: "28MB" },
    { quality: "480p", type: "MP4", size: "15MB" },
    { quality: "360p", type: "MP4", size: "8MB" },
    { quality: "Audio Only", type: "MP3", size: "5MB" },
  ],
};

// Download Button Functionality
downloadBtn.addEventListener("click", processVideoUrl);
urlInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    processVideoUrl();
  }
});

// Process video URL
function processVideoUrl() {
  const url = urlInput.value.trim();

  if (!url) {
    showError("Please enter a video URL");
    return;
  }

  // Validate URL (simple check)
  if (!isValidUrl(url)) {
    showError("Please enter a valid URL");
    return;
  }

  // Check if it's from a supported platform
  if (!isSupportedPlatform(url)) {
    showError("This platform is not supported yet");
    return;
  }

  // Show loading
  showLoading();

  // Simulate API call (in a real app, you would call your backend API here)
  setTimeout(() => {
    hideLoading();

    // Simulate different responses randomly
    const random = Math.random();
    if (random < 0.7) {
      // Success - show video preview
      showVideoPreview(url);
    } else if (random < 0.9) {
      // Error - protected content
      showWarning("This video is protected and cannot be downloaded");
    } else {
      // Error - general error
      showError("Could not process this video. Please try another one.");
    }
  }, 1500);
}

// Show video preview
function showVideoPreview(url) {
  // In a real app, you would get this data from your API
  // For demo purposes, we're using sample data
  const videoData = getVideoData(url);

  // Set video info
  videoTitle.textContent = videoData.title;
  videoMeta.innerHTML = `
          <span><i class="fas fa-eye"></i> ${videoData.views} views</span>
          <span><i class="fas fa-thumbs-up"></i> ${videoData.likes} likes</span>
          <span><i class="fas fa-clock"></i> ${videoData.duration}</span>
        `;

  // Set iframe source
  videoIframe.src = videoData.embedUrl;

  // Create quality buttons
  qualityButtons.innerHTML = "";
  videoData.qualities.forEach((quality, index) => {
    const btn = document.createElement("button");
    btn.className = "quality-btn" + (index === 0 ? " active" : "");
    btn.innerHTML = `
            ${quality.quality} (${quality.type}) <span class="quality-size">${quality.size}</span>
          `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".quality-btn").forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");
    });
    qualityButtons.appendChild(btn);
  });

  // Show preview container
  videoPreviewContainer.style.display = "block";

  // Scroll to preview
  setTimeout(() => {
    videoPreviewContainer.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
}

// Download action
downloadActionBtn.addEventListener("click", () => {
  const selectedQuality = document.querySelector(".quality-btn.active");
  if (!selectedQuality) return;

  const qualityText = selectedQuality.textContent.trim();
  showLoading("Preparing download...");

  // Simulate download preparation
  setTimeout(() => {
    hideLoading();
    showSuccess(`Your video (${qualityText}) is ready to download!`);

    // In a real app, you would initiate the download here
    // For demo purposes, we'll just simulate it
    simulateDownload();
  }, 1000);
});

// Cancel action
cancelActionBtn.addEventListener("click", () => {
  videoPreviewContainer.style.display = "none";
  videoIframe.src = "";
  urlInput.value = "";
});

// Simulate download (in a real app, this would be an actual download)
function simulateDownload() {
  // Create a temporary link to simulate download
  const link = document.createElement("a");
  link.href = "https://example.com/sample-video.mp4"; // This would be your download URL
  link.download = "downloaded-video.mp4";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Helper functions
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function isSupportedPlatform(url) {
  // Check if URL is from a supported platform
  const supportedPlatforms = [
    "youtube.com",
    "youtu.be",
    "instagram.com",
    "facebook.com",
    "tiktok.com",
    "twitter.com",
    "vimeo.com",
    "dailymotion.com",
  ];

  return supportedPlatforms.some((platform) => url.includes(platform));
}

function getVideoData(url) {
  // In a real app, this would come from your API based on the URL
  // For demo purposes, we return sample data
  return sampleVideoData;
}

function showLoading(message = "Processing your request...") {
  loading.style.display = "block";
  loading.querySelector("p").textContent = message;
  successAlert.style.display = "none";
  errorAlert.style.display = "none";
  warningAlert.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showSuccess(message = "Your video is ready to download.") {
  successAlert.style.display = "flex";
  successAlert.querySelector(".alert-content p").textContent = message;
  errorAlert.style.display = "none";
  warningAlert.style.display = "none";

  // Hide after 5 seconds
  setTimeout(() => {
    successAlert.style.display = "none";
  }, 5000);
}

function showError(message = "Please enter a valid video URL.") {
  errorAlert.style.display = "flex";
  errorAlert.querySelector(".alert-content p").textContent = message;
  successAlert.style.display = "none";
  warningAlert.style.display = "none";
  loading.style.display = "none";

  // Hide after 5 seconds
  setTimeout(() => {
    errorAlert.style.display = "none";
  }, 5000);
}

function showWarning(
  message = "This video is protected and cannot be downloaded."
) {
  warningAlert.style.display = "flex";
  warningAlert.querySelector(".alert-content p").textContent = message;
  successAlert.style.display = "none";
  errorAlert.style.display = "none";
  loading.style.display = "none";

  // Hide after 5 seconds
  setTimeout(() => {
    warningAlert.style.display = "none";
  }, 5000);
}

// Floating download button click
floatingDownloadBtn.addEventListener("click", () => {
  urlInput.scrollIntoView({ behavior: "smooth" });
  urlInput.focus();
});

// Simple scroll animation implementation
const animateOnScroll = () => {
  const elements = document.querySelectorAll("[data-aos]");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("aos-animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Trigger initial check
animateOnScroll();
