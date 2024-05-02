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
-   [CI](#CI)
    -   [CI-Frontend](#CI-Frontend)
    -   [CI-Backend](#CI-Backend)
-   [CD](#CD)
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

    ![Tietokantataulu](/src/img/tietokanta.png)

    Tietokannan taulut:
    -   users (käyttäjät)
    -   listings (listaukset)
    -   images (listausten kuvat)
    -   messages (keskustelut listausten alla)
    -   categories (kategoriat)

    ## Teknologiat

    ### Frontend

    -   React
    -   Tailwind CSS

    ### Backend

    -   TypeScript
    -   Express
    -   MariaDB

    ### CI/CD

    -   GitHub Actions
    -   Ansible
    -   Podman

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
        -   Ilmoitusten hakeminen ja filtteröinti

    -   Yhteydenotto
        -   Yhteydenottolomake

    ## CI

    -   [CI-Frontend](https://github.com/MetroHege/MPP-Frontend/tree/main/.github/workflows)
    -   [CI-Backend](https://github.com/MetroHege/MPP-Backend/tree/main/.github/workflows)

    ### toteutus
    CI on toteutettu GitHub Actionsin avulla. Frontend ja Backend buildataan ja testataan jokaisen pushin yhteydessä.

    ## CD

    -   [CD](https://github.com/MatteZ02/mpp-ansible/tree/main)
    
    ### toteutus
    CD on toteutettu Ansiblen avulla. Frontend ja Backend deployataan Azureen jokaisen pushin main branchiin jälkeen.

    ## Testaus

    [Testaus](https://github.com/MetroHege/MPP-Backend/blob/main/.github/workflows/tests.yml)
