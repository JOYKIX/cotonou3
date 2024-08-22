document.addEventListener("DOMContentLoaded", function() {
    const staffGrid = document.querySelector('.staff-grid');

    // Données des membres du staff
    const staffMembers = [
        {
            name: "Joykix",
            role: "Flemme d'écrire",
            bio: "Flemme d'écrire"
        },
        {
            name: "Pakoro",
            role: "Flemme d'écrire",
            bio: "Flemme d'écrire"
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
