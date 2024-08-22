document.addEventListener("DOMContentLoaded", function() {
    const presentationSection = document.querySelector('#presentation');
    const featuresSection = document.querySelector('#features');

    // Appliquer les transitions
    presentationSection.style.transition = "opacity 1s ease, transform 1s ease";
    featuresSection.style.transition = "opacity 1s ease, transform 1s ease";

    // Activer immédiatement les animations après un léger délai
    setTimeout(() => {
        presentationSection.classList.add('visible');
        featuresSection.classList.add('visible');
    }, 100); // Délai pour assurer l'application des styles avant l'animation
});
