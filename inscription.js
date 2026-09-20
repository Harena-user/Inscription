/*// ==========================
// ÉLÉMENTS HTML
// ==========================

const form =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");


// ==========================
// CHAMPS
// ==========================

const fields = [
    "nom",
    "prenom",
    "email"
];


// ==========================
// NETTOYAGE
// ==========================

function cleanText(value) {

    return value
        .trim()
        .replace(/\s+/g, " ");
}


// ==========================
// EMAIL
// ==========================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


// ==========================
// ERREUR
// ==========================

function setError(fieldName, message) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );

    field.classList.add("invalid");

    error.textContent = message;
}


// ==========================
// SUPPRIMER ERREUR
// ==========================

function clearError(fieldName) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );

    field.classList.remove("invalid");

    error.textContent = "";
}


// ==========================
// VALIDER UN CHAMP
// ==========================

function validateField(fieldName) {

    const field =
        document.getElementById(fieldName);

    const value =
        cleanText(field.value);

    clearError(fieldName);

    // Champ vide

    if (!value) {

        const messages = {

            nom:
                "Veuillez saisir votre nom.",

            prenom:
                "Veuillez saisir votre prénom.",

            email:
                "Veuillez saisir votre adresse e-mail."
        };

        setError(
            fieldName,
            messages[fieldName]
        );

        return false;
    }

    // Email invalide

    if (
        fieldName === "email" &&
        !isValidEmail(value)
    ) {

        setError(
            "email",
            "Adresse e-mail invalide."
        );

        return false;
    }

    return true;
}


// ==========================
// VALIDATION COMPLÈTE
// ==========================

function validateForm() {

    let isValid = true;

    fields.forEach(function(field) {

        if (!validateField(field)) {

            isValid = false;
        }

    });

    return isValid;
}


// ==========================
// VALIDATION EN DIRECT
// ==========================

fields.forEach(function(fieldName) {

    const field =
        document.getElementById(fieldName);

    field.addEventListener(
        "blur",
        function() {

            validateField(fieldName);
        }
    );

    field.addEventListener(
        "input",
        function() {

            if (
                field.classList.contains(
                    "invalid"
                )
            ) {

                validateField(fieldName);
            }
        }
    );

});


// ==========================
// ENVOI
// ==========================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        formMessage.textContent = "";

        formMessage.className =
            "form-message";

        if (!validateForm()) {

            formMessage.textContent =
                "Veuillez corriger les champs.";

            formMessage.classList.add(
                "error"
            );

            return;
        }

        // Simulation d'envoi

        formMessage.textContent =
            "Inscription enregistrée.";

        formMessage.classList.add(
            "success"
        );

        form.reset();

        fields.forEach(function(field) {

            clearError(field);

        });

    }
);
*/

// ==========================
// CONFIGURATION SUPABASE
// ==========================

// Remplace ces deux constantes par tes vraies clés trouvées dans Supabase (Project Settings > API)
const SUPABASE_URL = "https://TON_PROJET.supabase.co";
const SUPABASE_ANON_KEY = "TA_CLE_ANON_PUBLIQUE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ==========================
// ÉLÉMENTS HTML
// ==========================

const form =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");


// ==========================
// CHAMPS
// ==========================

const fields = [
    "nom",
    "prenom",
    "email"
];


// ==========================
// NETTOYAGE
// ==========================

function cleanText(value) {

    return value
        .trim()
        .replace(/\s+/g, " ");
}


// ==========================
// EMAIL
// ==========================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


// ==========================
// ERREUR
// ==========================

function setError(fieldName, message) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );

    field.classList.add("invalid");

    error.textContent = message;
}


// ==========================
// SUPPRIMER ERREUR
// ==========================

function clearError(fieldName) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );

    field.classList.remove("invalid");

    error.textContent = "";
}


// ==========================
// VALIDER UN CHAMP
// ==========================

function validateField(fieldName) {

    const field =
        document.getElementById(fieldName);

    const value =
        cleanText(field.value);

    clearError(fieldName);

    // Champ vide

    if (!value) {

        const messages = {

            nom:
                "Veuillez saisir votre nom.",

            prenom:
                "Veuillez saisir votre prénom.",

            email:
                "Veuillez saisir votre adresse e-mail."
        };

        setError(
            fieldName,
            messages[fieldName]
        );

        return false;
    }

    // Email invalide

    if (
        fieldName === "email" &&
        !isValidEmail(value)
    ) {

        setError(
            "email",
            "Adresse e-mail invalide."
        );

        return false;
    }

    return true;
}


// ==========================
// VALIDATION COMPLÈTE
// ==========================

function validateForm() {

    let isValid = true;

    fields.forEach(function(field) {

        if (!validateField(field)) {

            isValid = false;
        }

    });

    return isValid;
}


// ==========================
// VALIDATION EN DIRECT
// ==========================

fields.forEach(function(fieldName) {

    const field =
        document.getElementById(fieldName);

    field.addEventListener(
        "blur",
        function() {

            validateField(fieldName);
        }
    );

    field.addEventListener(
        "input",
        function() {

            if (
                field.classList.contains(
                    "invalid"
                )
            ) {

                validateField(fieldName);
            }
        }
    );

});


// ==========================
// ENVOI (INTEGRATION SUPABASE)
// ==========================

// Utilisation de async function pour pouvoir attendre la réponse de Supabase
form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        formMessage.textContent = "";

        formMessage.className =
            "form-message";

        if (!validateForm()) {

            formMessage.textContent =
                "Veuillez corriger les champs.";

            formMessage.classList.add(
                "error"
            );

            return;
        }

        // Afficher un message de chargement
        formMessage.textContent = "Envoi en cours...";

        // Récupérer les données nettoyées
        const nomVal = cleanText(document.getElementById("nom").value);
        const prenomVal = cleanText(document.getElementById("prenom").value);
        const emailVal = cleanText(document.getElementById("email").value);

        // Envoi vers Supabase (Table 'inscriptions')
        const { data, error } = await supabase
            .from("inscriptions")
            .insert([
                { nom: nomVal, prenom: prenomVal, email: emailVal }
            ]);

        // Gestion du résultat
        if (error) {

            console.error("Erreur Supabase :", error);

            formMessage.textContent =
                "Erreur lors de l'enregistrement. Réessayez.";

            formMessage.classList.add(
                "error"
            );

        } else {

            formMessage.textContent =
                "Inscription enregistrée avec succès !";

            formMessage.classList.add(
                "success"
            );

            form.reset();

            fields.forEach(function(field) {

                clearError(field);

            });
        }

    }
);