// Mushin page specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  const savedLanguage = localStorage.getItem("language") || "es"
  // Declare the updateTranslations function or import it here
  function updateTranslations(language) {
    // Placeholder for translation logic
    console.log("Updating translations to:", language)
  }
  updateTranslations(savedLanguage)

  // Add animation class
  const content = document.querySelector(".mushin-content")
  if (content) {
    setTimeout(() => {
      content.style.opacity = "1"
      content.style.transform = "translateY(0)"
    }, 100)
  }
})

// Set initial styles for animation
const style = document.createElement("style")
style.textContent = `
    .mushin-content {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
`
document.head.appendChild(style)
