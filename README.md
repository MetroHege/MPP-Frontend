# DivariNet

Käytettyjen urheiluvälineide/-vaatteiden vaihtopaikka.

## Sisällysluettelo

-   [Sovellus](#Sovellus)
-   [Käyttöliittymä](#Käyttöliittymä)
-   [Backend](#Backend)
    -   [API](#API)
    -   [Apidoc](#Apidoc)
    -   [Tietokanta](#Tietokanta)
-   [Teknologiat](#teknologiat)
    -   [Frontend](#Frontend)
    -   [Backend](#Backend)
-   [Toiminnallisuudet](#Toiminallisuudet)
-   [CI/CD](#CI/CD)
-   [Testaus](#Testaus)

    ## Sovellus

    [DivariNet](https://divari.northeurope.cloudapp.azure.com)

    ## Käyttöliittymä

    ![Kotisivu](/src/img/Screenshot-Home.png)
    ![Kirjautuminen](/src/img/Screenshot-Login.png)
    ![Profiili](/src/img/Screenshot-Profile.png)
    ![Ilmoituksen jättäminen](/src/img/Screenshot-Upload.png)
    ![Yksittäinen ilmoitus](/src/img/Screenshot-Single.png)
    ![Yhteydenotto](/src/img/Screenshot-Contact.png)
    ![Käyttöehdot](/src/img/Screenshot-Rules.png)

    ## Backend

    ### API

    [API](https://divari.northeurope.cloudapp.azure.com/api/users)

    ### Apidoc

    [Apidoc](https://divari.northeurope.cloudapp.azure.com/docs)

    ### Tietokanta

    [Tietokanta]()

    Tähän kohtaan tulee kuvaus tietokannasta ja sen rakenteesta.

    ## Teknologiat

    ### Frontend

    -   React
    -   Tailwind CSS

    ### Backend

    -   TypeScript
    -   Express

    ## Toiminnallisuudet

    -   Käyttäjähallinta

        -   Rekisteröityminen
        -   Kirjautuminen
        -   Salasanan vaihto
        -   Käyttäjän poisto
        -   Käyttäjän tietojen muokkaus

    -   Ilmoitukset

        -   Kuvien lataaminen ilmoitukseen
        -   Ilmoituksen jättäminen
        -   Ilmoituksen poisto
        -   Ilmoituksen muokkaus
        -   Ilmoitusten selaaminen
        -   Ilmoitusten hakeminen
        -   Ilmoitusten suodattaminen
        -   Ilmoitusten kommentointi

    -   Yhteydenotto
        -   Yhteydenottolomake

    ## CI/CD

    [CI/CD Frontend](https://github.com/MetroHege/MPP-Frontend/tree/main/.github/workflows)
    [CI/CD Backend](https://github.com/MetroHege/MPP-Backend/tree/main/.github/workflows)

    ## Testaus

    [Testaus](https://github.com/MetroHege/MPP-Backend/blob/main/.github/workflows/tests.yml)
