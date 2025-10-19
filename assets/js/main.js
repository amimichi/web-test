document.addEventListener("DOMContentLoaded", () => {
  // =================================================================
  // 1. SELECTORES DE DOM Y ESTADO INICIAL
  // =================================================================
  const hamburger = document.querySelector(".hamburger")
  const sideMenu = document.querySelector("#side-menu")
  const navLinks = document.querySelectorAll(".side-menu a")
  const body = document.body
  const langSelect = document.querySelector("#languageSelect")

  // =================================================================
  // 2. FUNCIONES
  // =================================================================

  function toggleMenu() {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true"
    hamburger.classList.toggle("active")
    sideMenu.classList.toggle("active")
    body.classList.toggle("no-scroll")
    hamburger.setAttribute("aria-expanded", !isExpanded)
    hamburger.setAttribute("aria-label", !isExpanded ? "Cerrar menú" : "Abrir menú")
  }

  function initCarousel(trackId, containerSelector) {
    const track = document.getElementById(trackId)
    const container = document.querySelector(containerSelector)
    if (!track || !container) return

    const arrows = container.querySelectorAll(".carousel-arrow")
    const slides = Array.from(track.children)
    let currentIndex = 0

    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth + Number.parseInt(getComputedStyle(track).gap)
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    }

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        if (arrow.classList.contains("left")) {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length
        } else {
          currentIndex = (currentIndex + 1) % slides.length
        }
        updateCarousel()
      })
    })

    // Soporte básico para swipe (drag)
    let isDown = false
    let startX
    let scrollLeft

    track.addEventListener("mousedown", (e) => {
      isDown = true
      track.style.cursor = "grabbing"
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
    })
    track.addEventListener("mouseleave", () => {
      isDown = false
      track.style.cursor = "grab"
    })
    track.addEventListener("mouseup", () => {
      isDown = false
      track.style.cursor = "grab"
    })
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 2
      track.scrollLeft = scrollLeft - walk
    })

    window.addEventListener("resize", updateCarousel)
    updateCarousel()
  }

  function initScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal")
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    revealElements.forEach((el) => observer.observe(el))
  }

  function updateTranslations(lang) {
    // Placeholder for translation logic
    console.log(`Language changed to ${lang}`)
  }

  // =================================================================
  // 3. LISTENERS DE EVENTOS E INICIALIZACIÓN
  // =================================================================

  // Menú
  hamburger.addEventListener("click", toggleMenu)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (sideMenu.classList.contains("active")) {
        toggleMenu()
      }
    })
  })

  // Traductor
  langSelect.addEventListener("change", (e) => updateTranslations(e.target.value))

  // Inicialización al cargar la página
  updateTranslations(langSelect.value)
  initCarousel("clientTrack", "#clientes .carousel")
  initCarousel("productTrack", "#productos .carousel")
  initScrollAnimations()
})
