export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    // If element not found on current page, navigate to home with hash
    window.location.href = `/#${sectionId}`
  }
} 