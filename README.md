# API-EfterårsOpgave

## Programprotokol af Star Wars API

1. DOMContentLoaded Event Lytter:
   - __Formål:__ Venter på, at det initiale HTML-dokument er fuldstændigt indlæst og parset.
   - __Handling:__ Lyt efter DOMContentLoaded-begivenheden. Når begivenheden udløses, kaldes lazyLoadCharacters-funktionen.

2. Lazy Load Characters Funktion:
   - __Formål:__ Implementer doven indlæsning af Star Wars-karakterdata.
   - __Handling:__ Definer et array af karakter-ID'er. Hent reference til output-div-elementet. Initialiser en Intersection Observer for at opdage synligheden af pladsholdere. For hver karakter oprettes et pladsholderdiv-element med et unikt karakter-ID. Observer hvert pladsholderelement.

3. Intersection Observer Håndtering:
   - __Formål:__ Håndter synligheden af pladsholdere ved at aktivere indlæsning af karakterdata.
   - __Handling:__ Når et pladsholderelement bliver synligt (erIntersecting), udfør følgende trin: Hent karakterdata ved hjælp af fetchCharacterData. Hent yderligere information ved hjælp af fetchAdditionalInfo. Vis data ved hjælp af displaySingleStarWarsData. Stop observationen af det pågældende element.

4. Fetch Character Data Funktion:
   - __Formål:__ Hent grundlæggende karakterdata fra Star Wars API'en.
   - __Handling:__ Konstruer API URL baseret på karakter-ID. Udfør en fetch-anmodning for at hente data. Hvis responsen ikke er ok, kast en fejl. Returnér JSON-responsen som en promise.

5. Fetch Additional Info Funktion:
   - __Formål:__ Hent yderligere information for en karakter (homeworld, films, species, starships, and vehicles).
   - __Handling:__ Udfør flere fetch-anmodninger parallelt ved hjælp af Promise.all. Returnér et løfte, der resulterer i en sammensat datamodel.

6. Display Single Star Wars Data Funktion:
   - __Formål:__ Vis karakterdata og yderligere information på HTML-siden.
   - __Handling:__ Opdater HTML-indholdet af det tilsvarende pladsholderelement i output-div'en med karakterens detaljer.