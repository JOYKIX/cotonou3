document.addEventListener("DOMContentLoaded", function() {
    const streamerList = document.getElementById('streamerList');
    const communityList = document.getElementById('communityList');
    const roleFilters = document.querySelectorAll('.filter-btn');
    const ageFilter = document.getElementById('ageRange');
    const overlay = document.querySelector('.overlay');
    const closeBtn = overlay.querySelector('.close-btn');

    // Données des personnages
    const streamers = [
        {
            name: "Fémi-Mars",
            gender: "Masculin",
            age: "Inconnu",
            role: "Inconnu",
            importance: "principal",
            history: "Inconnu"
        },
        {
            name: "Shyro",
            gender: "Masculin",
            age: "Inconnu",
            role: "Inconnu",
            importance: "principal",
            history: "Inconnu"
        },
        {
            name: "McQueen",
            gender: "Masculin",
            age: "Inconnu",
            role: "Inconnu",
            importance: "principal",
            history: "Inconnu"
        },
        {
            name: "Kailon",
            gender: "Masculin",
            age: "Inconnu",
            role: "Inconnu",
            importance: "principal",
            history: "Inconnu"
        },
        {
            name: "Mino",
            gender: "Masculin",
            age: "Inconnu",
            role: "Inconnu",
            importance: "principal",
            history: "Inconnu"
        }
    ];

    const communityCharacters = [
        {
            name: "Jean Dupont",
            gender: "Masculin",
            age: 50,
            role: "Chef de l'Abri",
            importance: "principal",
            history: "Ancien militaire, Jean a pris la tête de l'abri après la catastrophe. Il est déterminé à protéger les siens coûte que coûte.",
            available: true
        },
        {
            name: "Marie Lefevre",
            gender: "Féminin",
            age: 33,
            role: "Médecin de terrain",
            importance: "secondaire",
            history: "Médecin expérimentée, Marie lutte chaque jour pour soigner les malades avec les ressources limitées de l'abri.",
            available: true
        }
    ];

    // Fonction pour générer le numéro de dossier
    function generateDossierNumber(character) {
        // Normalisation des caractères pour compter les lettres correctement (inclut les accents)
        const normalizedName = character.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const id = normalizedName.replace(/[^a-zA-Z]/g, '').length.toString().padStart(3, '0'); // Nombre de lettres dans le nom
        const genderCode = character.gender === "Masculin" ? "01" : character.gender === "Féminin" ? "02" : "00";
        const importanceCode = character.importance === "principal" ? "01" : 
                               character.importance === "secondaire" ? "02" : 
                               character.importance === "figurant" ? "03" : "00";

        // Calcul de la somme des positions des lettres dans l'alphabet
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const nameSum = normalizedName.toLowerCase().replace(/[^a-z]/g, '').split('')
                        .reduce((sum, char) => sum + (alphabet.indexOf(char) + 1), 0)
                        .toString().padStart(3, '0'); // Pour s'assurer que c'est toujours au moins 3 chiffres

        return `${id}-${genderCode}-${importanceCode}-${nameSum}`;
    }

    // Fonction pour créer les cartes de personnage
    function createCharacterCard(character) {
        const dossierNumber = generateDossierNumber(character); // Générer le numéro de dossier
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.setAttribute('data-importance', character.importance);
        characterCard.setAttribute('data-age', character.age);

        // Tronquer l'histoire pour l'affichage initial (60 caractères)
        const shortHistory = character.history.length > 60 ? character.history.substring(0, 60) + "... <span class='see-more'>(cliquer pour voir plus)</span>" : character.history;

        const availability = character.available !== undefined ? (character.available ? 'Disponible' : 'Non disponible') : '';
        const availabilityClass = character.available !== undefined ? (character.available ? 'available' : 'not-available') : '';

        characterCard.innerHTML = `
            <h4>${character.name.replace(/ /g, '<br>')}</h4> <!-- Sépare le prénom et le nom sur deux lignes -->
            <p class="dossier-number"><strong>Numéro de dossier :</strong><br>${dossierNumber}</p> <!-- Numéro de dossier sur une nouvelle ligne -->
            <p><strong>Âge :</strong> ${character.age}</p>
            <p><strong>Sexe :</strong> ${character.gender}</p>
            <p><strong>Rôle :</strong> ${character.role}</p>
            <p><strong>Importance :</strong> ${character.importance.charAt(0).toUpperCase() + character.importance.slice(1)}</p>
            <p class="history"><strong>Histoire :</strong> ${shortHistory}</p>
            ${availability ? `<p class="${availabilityClass}"><strong>${availability}</strong></p>` : ''}
        `;

        // Event listener to open the character card in an overlay
        characterCard.addEventListener('click', function() {
            // Remplir l'overlay avec les informations du personnage
            overlay.querySelector('h4').innerHTML = character.name.replace(/ /g, '<br>');
            overlay.querySelector('.dossier-number').innerHTML = `Numéro de dossier :<br>${dossierNumber}`;
            overlay.querySelector('.history').textContent = character.history;

            // Afficher l'overlay avec l'animation de déploiement
            document.body.classList.add('overlay-active');
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10); // Petit délai pour permettre le rendu initial avant l'animation
        });

        return characterCard;
    }

    // Fonction pour afficher les personnages
    function displayCharacters(container, characters) {
        container.innerHTML = ''; // Clear previous characters
        characters.forEach(character => {
            const characterCard = createCharacterCard(character);
            container.appendChild(characterCard);
        });
    }

    // Fonction pour filtrer les personnages par importance des rôles
    function filterCharactersByImportance(importance, characters) {
        if (importance !== 'all') {
            return characters.filter(character => character.importance === importance);
        }
        return characters;
    }

    // Fonction pour filtrer par tranche d'âge
    function filterCharactersByAge(ageRange, characters) {
        if (ageRange !== 'all') {
            const [minAge, maxAge] = ageRange.split('-').map(Number);
            return characters.filter(character => {
                const age = parseInt(character.age);
                return !isNaN(age) && age >= minAge && (maxAge ? age <= maxAge : true);
            });
        }
        return characters;
    }

    // Initial display of all characters
    displayCharacters(streamerList, streamers);
    displayCharacters(communityList, communityCharacters);

    // Event listeners for filter buttons
    roleFilters.forEach(button => {
        button.addEventListener('click', (e) => {
            const importance = e.target.getAttribute('data-importance');
            displayCharacters(streamerList, filterCharactersByImportance(importance, streamers));
            displayCharacters(communityList, filterCharactersByImportance(importance, communityCharacters));

            // Update active filter button
            roleFilters.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Event listener for age range filter
    ageFilter.addEventListener('change', function() {
        const ageRange = ageFilter.value;
        displayCharacters(streamerList, filterCharactersByAge(ageRange, streamers));
        displayCharacters(communityList, filterCharactersByAge(ageRange, communityCharacters));
    });

    // Event listener for close button in the overlay
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
        document.body.classList.remove('overlay-active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500); // correspond à la durée de l'animation
    });

    // Fermer l'overlay en cliquant en dehors
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.classList.remove('overlay-active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    });
});
