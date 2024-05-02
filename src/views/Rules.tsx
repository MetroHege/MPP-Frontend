import { useState } from "react";

// This component is used to render the rules and terms of service.
const Rules = () => {
    const [openSections, setOpenSections] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    // This function is used to handle the click event on a section.
    const handleClick = (sectionIndex: number) => {
        const newOpenSections = [...openSections];
        newOpenSections[sectionIndex] = !newOpenSections[sectionIndex];
        setOpenSections(newOpenSections);
    };

    return (
        <>
            <h1 className="text-4xl mt-4">
                <strong>DivariNetin säännöt ja käyttöehdot</strong>
            </h1>
            <p className="text-xl mt-2 mb-4">
                Tervetuloa DivariNet-palveluun! Olemme innoissamme siitä, että olet kiinnostunut
                käyttämään palveluamme. Haluamme varmistaa, että ymmärrät täysin käyttöehtomme ja
                tietosuojakäytäntömme, jotta voit nauttia palvelustamme turvallisesti ja mukavasti.
            </p>
            <h2 onClick={() => handleClick(0)} className="cursor-pointer text-2xl font-bold">
                1. Palvelun saatavuus & muutokset {openSections[0] ? "▲" : "▼"}
            </h2>
            {openSections[0] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Pyrimme tarjoamaan palvelun 24/7, mutta pidätämme oikeuden tehdä tilapäisiä
                    huoltokatkoksia tai muutoksia, jotka voivat vaikuttaa palvelun saatavuuteen tai
                    toimivuuteen. Emme voi taata, että palvelu toimii jatkuvasti ilman keskeytyksiä
                    tai virheitä. Teemme parhaamme varmistaaksemme, että mahdolliset muutokset
                    palvelussa tehdään läpinäkyvästi ja käyttäjille ilmoitetaan niistä
                    asianmukaisesti.
                </p>
            )}

            <h2 onClick={() => handleClick(1)} className="cursor-pointer text-2xl font-bold">
                2. Käyttäjän vastuut & velvollisuudet {openSections[1] ? "▲" : "▼"}
            </h2>
            {openSections[1] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjänä sinun odotetaan noudattavan käyttöehtojamme ja muita palvelussa
                    annettuja sääntöjä ja ohjeita. Sinun tulee myös varmistaa, että julkaistava
                    materiaali ja toimintasi palvelussa ovat lain ja hyvän tavan mukaisia. Tämä
                    sisältää muun muassa sen, että vastaat itse julkaisemasi materiaalin
                    laillisuudesta ja siitä, että sinulla on tarvittavat oikeudet sen
                    julkaisemiseen.
                </p>
            )}

            <h2 onClick={() => handleClick(2)} className="cursor-pointer text-2xl font-bold">
                3. Käyttäjätiedot & tietoturva {openSections[2] ? "▲" : "▼"}
            </h2>
            {openSections[2] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Rekisteröityessäsi palveluun annat meille tiettyjä henkilötietoja, jotka ovat
                    välttämättömiä palvelun tarjoamiseksi sinulle. Tietosuojakäytäntömme
                    määrittelee, miten käsittelemme näitä tietoja ja miten niitä säilytetään ja
                    suojataan. Pyrimme parhaamme mukaan pitämään tiedot turvassa ja suojaamaan niitä
                    luvattomalta pääsyltä tai väärinkäytöksiltä.
                </p>
            )}

            <h2 onClick={() => handleClick(3)} className="cursor-pointer text-2xl font-bold">
                4. Ikäraja {openSections[3] ? "▲" : "▼"}
            </h2>
            {openSections[3] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    DivariNet:n käyttö edellyttää vähintään 15 vuoden ikää. Alle 15-vuotiaat voivat
                    käyttää palveluamme ainoastaan huoltajiensa valvonnassa ja näiden hyväksynnällä.
                </p>
            )}

            <h2 onClick={() => handleClick(4)} className="cursor-pointer text-2xl font-bold">
                5. Ilmoitukset & sisällön julkaiseminen {openSections[4] ? "▲" : "▼"}
            </h2>
            {openSections[4] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Palvelussa on mahdollista julkaista erilaisia ilmoituksia ja sisältöä. Pidätämme
                    kuitenkin oikeuden tarkistaa ja tarvittaessa muokata tai poistaa sisältöä, jos
                    se rikkoo käyttöehtojamme tai on muutoin sopimatonta. Tavoitteenamme on tarjota
                    käyttäjillemme turvallinen ja viihtyisä ympäristö, jossa voi jakaa ja löytää
                    kiinnostavaa sisältöä.
                </p>
            )}

            <h2 onClick={() => handleClick(5)} className="cursor-pointer text-2xl font-bold">
                6. Vastuun rajoitus {openSections[5] ? "▲" : "▼"}
            </h2>
            {openSections[5] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Emme voi taata palvelumme virheettömyyttä tai täydellisyyttä, emmekä siksi ole
                    vastuussa mahdollisista vahingoista tai menetyksistä, jotka voivat aiheutua
                    palvelun käytöstä. Käyttäjänä ymmärrät ja hyväksyt tämän vastuun rajoituksen, ja
                    käytät palveluamme omalla vastuullasi.
                </p>
            )}

            <h2 onClick={() => handleClick(6)} className="cursor-pointer text-2xl font-bold">
                7. Käyttöehtojen muutokset {openSections[6] ? "▲" : "▼"}
            </h2>
            {openSections[6] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Pidätämme oikeuden muuttaa käyttöehtojamme tarpeen mukaan. Ilmoitamme
                    käyttäjillemme mahdollisista muutoksista ja pyrimme varmistamaan, että ne ovat
                    selkeästi ymmärrettävissä. Jatkamalla palvelumme käyttöä muutosten jälkeen
                    osoitat hyväksyväsi päivitetyt käyttöehdot.
                </p>
            )}

            <h2 onClick={() => handleClick(7)} className="cursor-pointer text-2xl font-bold">
                8. Käyttäjän vastuu tunnistetiedoista {openSections[7] ? "▲" : "▼"}
            </h2>
            {openSections[7] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjänä olet vastuussa omista tunnistetiedoistasi, kuten käyttäjänimestäsi ja
                    salasanastasi. Älä jaa tunnistetietojasi muiden kanssa, ja pidä ne turvassa
                    estääksesi väärinkäytöksiä ja luvattomia pääsyjä tilillesi.
                </p>
            )}

            <h2 onClick={() => handleClick(8)} className="cursor-pointer text-2xl font-bold">
                9. Käyttäjän luoma sisältö {openSections[8] ? "▲" : "▼"}
            </h2>
            {openSections[8] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Kaikki käyttäjän luoma sisältö, kuten tekstit, kuvat ja videot, ovat käyttäjän
                    omistuksessa ja vastuulla. Käyttäjän vastuulla on varmistaa, ettei luotu sisältö
                    ei loukkaa kolmansien osapuolien oikeuksia eikä riko sovellettavia lakeja tai
                    sääntöjä.
                </p>
            )}

            <h2 onClick={() => handleClick(9)} className="cursor-pointer text-2xl font-bold">
                10. Käyttäjän toiminnan säännöt {openSections[9] ? "▲" : "▼"}
            </h2>
            {openSections[9] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjän tulee käyttäytyä kohteliaasti ja kunnioittavasti muita käyttäjiä
                    kohtaan. Mitään häiritsevää, loukkaavaa tai väkivaltaista käyttäytymistä ei
                    sallita palvelussa. Mikäli huomaat epäasiallista käytöstä, ilmoita siitä
                    välittömästi ylläpidolle.
                </p>
            )}

            <h2 onClick={() => handleClick(10)} className="cursor-pointer text-2xl font-bold">
                11. Käyttäjän sisällön moderointi {openSections[10] ? "▲" : "▼"}
            </h2>
            {openSections[10] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Ylläpidolla on oikeus moderoida käyttäjän luomaa sisältöä tarvittaessa. Tämä voi
                    sisältää sisällön tarkistamisen, muokkaamisen tai poistamisen, mikäli se rikkoo
                    palvelun käyttöehtoja tai on muuten sopimatonta.
                </p>
            )}

            <h2 onClick={() => handleClick(11)} className="cursor-pointer text-2xl font-bold">
                12. Käyttäjätilin sulkeminen {openSections[11] ? "▲" : "▼"}
            </h2>
            {openSections[11] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Ylläpidolla on oikeus sulkea käyttäjätili, mikäli käyttäjä rikkoo toistuvasti
                    palvelun käyttöehtoja tai hänen toimintansa on muutoin haitallista yhteisölle.
                    Tällöin käyttäjä menettää pääsyn palveluun ja luotu sisältö voidaan poistaa.
                </p>
            )}

            <h2 onClick={() => handleClick(12)} className="cursor-pointer text-2xl font-bold">
                13. Käyttäjän oikeudet sisältöön {openSections[12] ? "▲" : "▼"}
            </h2>
            {openSections[12] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjä säilyttää kaikki oikeudet itse luomaansa sisältöön, paitsi jos toisin
                    sovitaan palvelun käyttöehtojen tai lisenssiehtojen puitteissa. Käyttäjän
                    sisältöä ei käytetä muihin tarkoituksiin ilman käyttäjän lupaa.
                </p>
            )}

            <h2 onClick={() => handleClick(13)} className="cursor-pointer text-2xl font-bold">
                14. Markkinointi ja mainonta {openSections[13] ? "▲" : "▼"}
            </h2>
            {openSections[13] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Kaikenlainen markkinointi ja mainonta on sallittua ainoastaan niille alueille
                    palvelussa, jotka on nimenomaisesti tarkoitettu siihen. Käyttäjä sitoutuu
                    noudattamaan sovellettavia lakeja ja määräyksiä markkinoinnin ja mainonnan
                    osalta, mukaan lukien vaadittavat lisenssit ja luvat.
                </p>
            )}

            <h2 onClick={() => handleClick(14)} className="cursor-pointer text-2xl font-bold">
                15. Käyttäjän hyväksyntä käyttöehtoihin {openSections[14] ? "▲" : "▼"}
            </h2>
            {openSections[14] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjä vahvistaa lukeneensa ja hyväksyneensä nämä käyttöehdot ennen palvelun
                    käyttöönottoa. Käyttäjä sitoutuu noudattamaan näitä ehtoja palvelun käytön
                    aikana.
                </p>
            )}

            <h2 onClick={() => handleClick(15)} className="cursor-pointer text-2xl font-bold">
                16. Sopimusrikkomusten seuraamukset {openSections[15] ? "▲" : "▼"}
            </h2>
            {openSections[15] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Sopimusrikkomusten tapauksessa palveluntarjoajalla on oikeus ryhtyä
                    asianmukaisiin toimiin, mukaan lukien käyttäjätilin sulkeminen ja mahdolliset
                    oikeudelliset toimenpiteet.
                </p>
            )}

            <h2 onClick={() => handleClick(16)} className="cursor-pointer text-2xl font-bold">
                17. Käyttäjätunnusten turvallisuus {openSections[16] ? "▲" : "▼"}
            </h2>
            {openSections[16] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjä on vastuussa omien käyttäjätunnustensa ja salasanojensa
                    turvallisuudesta. Käyttäjän tulee huolehtia siitä, ettei tunnuksia ja salasanoja
                    jaeta muiden kanssa ja että ne säilytetään turvallisesti.
                </p>
            )}

            <h2 onClick={() => handleClick(17)} className="cursor-pointer text-2xl font-bold">
                18. Yksityisyysasetukset {openSections[17] ? "▲" : "▼"}
            </h2>
            {openSections[17] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjällä on oikeus hallita omia yksityisyysasetuksiaan ja henkilötietojensa
                    käsittelyä palvelussa. Lisätietoja löytyy palvelun tietosuojakäytännöstä.
                </p>
            )}

            <h2 onClick={() => handleClick(18)} className="cursor-pointer text-2xl font-bold">
                19. Palvelun rajoitukset {openSections[18] ? "▲" : "▼"}
            </h2>
            {openSections[18] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Käyttäjän on noudatettava palvelun käytössä annettuja rajoituksia ja ehtoja.
                    Kaikenlainen automaattinen tietojen kaavinta tai muu epäasiallinen käyttö on
                    kielletty.
                </p>
            )}

            <h2 onClick={() => handleClick(19)} className="cursor-pointer text-2xl font-bold">
                20. Takuut ja vastuuvapauslausekkeet {openSections[19] ? "▲" : "▼"}
            </h2>
            {openSections[19] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Palvelu tarjotaan sellaisena kuin se on. Palveluntarjoaja ei anna minkäänlaisia
                    takuita palvelun virheettömyydestä tai luotettavuudesta. Käyttäjä käyttää
                    palvelua omalla vastuullaan.
                </p>
            )}

            <h2 onClick={() => handleClick(20)} className="cursor-pointer text-2xl font-bold">
                21. Oikeus muutoksiin {openSections[20] ? "▲" : "▼"}
            </h2>
            {openSections[20] && (
                <p className="text-xl mt-2 mb-4 ml-7">
                    Palveluntarjoajalla on oikeus muuttaa käyttöehtoja ja tietosuojakäytäntöä
                    tarpeen mukaan. Käyttäjille ilmoitetaan muutoksista asianmukaisesti, ja heidän
                    odotetaan hyväksyvän uudet ehdot jatkaakseen palvelun käyttöä.
                </p>
            )}

            <p className="text-xl mt-2 mb-20">
                Olemme sitoutuneet tarjoamaan käyttäjillemme turvallisen ja miellyttävän kokemuksen
                DivariNet-palvelussa. Mikäli sinulla on kysyttävää tai huomautettavaa
                käyttöehtoihimme tai tietosuojakäytäntöömme liittyen,{" "}
                <a href="/contact" className="text-blue-500">
                    ota rohkeasti yhteyttä
                </a>{" "}
                asiakaspalveluumme. Kiitos, että olet osa DivariNet-yhteisöä!
            </p>
        </>
    );
};

export default Rules;
