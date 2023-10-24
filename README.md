# API-EfterårsOpgave

## Programprotokol af Star Wars API

1. DOMContentLoaded Event Lytter: <br/>
__Formål:__ Vent på, at det initiale HTML-dokument er fuldstændigt indlæst og parset. <br/>
__Handling:__
Lyt efter DOMContentLoaded-begivenheden. <br/>
Når begivenheden udløses, kaldes lazyLoadCharacters-funktionen. <br/>
<br/>
3. Lazy Load Characters Funktion: <br/>
__Formål:__ Implementer doven indlæsning af Star Wars-karakterdata.
__Handling:__
Definer et array af karakter-ID'er.
Hent reference til output-div-elementet.
Initialiser en Intersection Observer for at opdage synligheden af pladsholdere.
For hver karakter oprettes et pladsholderdiv-element med et unikt karakter-ID.
Observer hvert pladsholderelement.
4. Intersection Observer Håndtering:
Formål: Håndter synligheden af pladsholdere ved at aktivere indlæsning af karakterdata.
Handling:
Når et pladsholderelement bliver synligt (erIntersecting), udfør følgende trin:
Hent karakterdata ved hjælp af fetchCharacterData.
Hent yderligere information ved hjælp af fetchAdditionalInfo.
Vis data ved hjælp af displaySingleStarWarsData.
Stop observationen af det pågældende element.
5. Fetch Character Data Funktion:
Formål: Hent grundlæggende karakterdata fra Star Wars API'en.
Handling:
Konstruer API URL baseret på karakter-ID.
Udfør en fetch-anmodning for at hente data.
Hvis responsen ikke er ok, kast en fejl.
Returnér JSON-responsen som en promise.
6. Fetch Additional Info Funktion:
Formål: Hent yderligere information for en karakter (hjemverden, film, arter, stjerneskibe, køretøjer).
Handling:
Udfør flere fetch-anmodninger parallelt ved hjælp af Promise.all.
Returnér et løfte, der resulterer i en sammensat datamodel.
7. Display Single Star Wars Data Funktion:
Formål: Vis karakterdata og yderligere information på HTML-siden.
Handling:
Opdater HTML-indholdet af det tilsvarende pladsholderelement i output-div'en med karakterens detaljer.
