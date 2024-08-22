document.addEventListener("DOMContentLoaded", function() {
    const staffGrid = document.querySelector('.staff-grid');

    // Données des membres du staff
    const staffMembers = [
        {
            name: "Joykix",
            role: "Configuration du Serveur et Sélection des Mods",
            bio: "Joykix est responsable de la configuration du serveur Minecraft et de la sélection des mods. Avec une attention méticuleuse aux détails, il assure que le serveur fonctionne de manière optimale et que les mods choisis enrichissent l'expérience de jeu."
        },
        {
            name: "Pakoro",
            role: "Sélection des Mods",
            bio: "Pakoro collabore étroitement avec Joykix pour sélectionner les mods. Son expertise dans les mods permet de créer un environnement de jeu immersif et varié, apportant des fonctionnalités uniques au serveur."
        }
    ];

    // Fonction pour créer les cartes des membres du staff
    function createStaffCard(member) {
        const staffCard = document.createElement('div');
        staffCard.classList.add('staff-card');

        staffCard.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Rôle :</strong> ${member.role}</p>
            <p><strong>Bio :</strong> ${member.bio}</p>
        `;

        return staffCard;
    }

    // Afficher les membres du staff
    function displayStaffMembers() {
        staffMembers.forEach(member => {
            const staffCard = createStaffCard(member);
            staffGrid.appendChild(staffCard);
        });
    }

    // Initialiser l'affichage des membres du staff
    displayStaffMembers();
});
