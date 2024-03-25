import { useState } from "react";

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

    const handleClick = (sectionIndex: number) => {
        const newOpenSections = [...openSections];
        newOpenSections[sectionIndex] = !newOpenSections[sectionIndex];
        setOpenSections(newOpenSections);
    };

    return (
        <>
            <h1 className="text-4xl mt-4">DivariNet:n säännöt ja käyttöehdot</h1>
            <p className="text-xl mt-2 mb-2">
                Tervetuloa DivariNet-palveluun! Olemme innoissamme siitä, että olet kiinnostunut
                käyttämään palveluamme. Haluamme varmistaa, että ymmärrät täysin käyttöehtomme ja
                tietosuojakäytäntömme, jotta voit nauttia palvelustamme turvallisesti ja mukavasti.
            </p>
            <h2 onClick={() => handleClick(0)} className="cursor-pointer text-2xl font-bold">
                1. Palvelun saatavuus & muutokset {openSections[0] ? "▲" : "▼"}
            </h2>
            {openSections[0] && (
                <p className="text-xl mt-2 mb-2">
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
                <p className="text-xl mt-2 mb-2">
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
                <p className="text-xl mt-2 mb-2">
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
                <p className="text-xl mt-2 mb-2">
                    DivariNet:n käyttö edellyttää vähintään 13 vuoden ikää. Alle 13-vuotiaat voivat
                    käyttää palveluamme ainoastaan huoltajiensa valvonnassa ja näiden hyväksynnällä.
                </p>
            )}
            <h2 onClick={() => handleClick(4)} className="cursor-pointer text-2xl font-bold">
                5. Ilmoitukset & sisällön julkaiseminen {openSections[4] ? "▲" : "▼"}
            </h2>
            {openSections[4] && (
                <p className="text-xl mt-2 mb-2">
                    Palvelussa on mahdollista julkaista erilaisia ilmoituksia ja sisältöä. Pidätämme
                    kuitenkin oikeuden tarkistaa ja tarvittaessa muokata tai poistaa tällaista
                    sisältöä, jos se rikkoo käyttöehtojamme tai on muutoin sopimatonta.
                    Tavoitteenamme on tarjota käyttäjillemme turvallinen ja viihtyisä ympäristö,
                    jossa voi jakaa ja löytää kiinnostavaa sisältöä.
                </p>
            )}
            <h2 onClick={() => handleClick(5)} className="cursor-pointer text-2xl font-bold">
                6. Vastuunrajoitus {openSections[5] ? "▲" : "▼"}
            </h2>
            {openSections[5] && (
                <p className="text-xl mt-2 mb-2">
                    Emme voi taata palvelumme virheettömyyttä tai täydellisyyttä, emmekä siksi ole
                    vastuussa mahdollisista vahingoista tai menetyksistä, jotka voivat aiheutua
                    palvelun käytöstä. Käyttäjänä ymmärrät ja hyväksyt tämän vastuunrajoituksen, ja
                    käytät palveluamme omalla vastuullasi.
                </p>
            )}
            <h2 onClick={() => handleClick(6)} className="cursor-pointer text-2xl font-bold">
                7. Käyttöehtojen muutokset {openSections[6] ? "▲" : "▼"}
            </h2>
            {openSections[6] && (
                <p className="text-xl mt-2 mb-2">
                    Pidätämme oikeuden muuttaa käyttöehtojamme tarpeen mukaan. Ilmoitamme
                    käyttäjillemme mahdollisista muutoksista ja pyrimme varmistamaan, että ne ovat
                    selkeästi ymmärrettävissä. Jatkamalla palvelumme käyttöä muutosten jälkeen
                    osoitat hyväksyväsi päivitetyt käyttöehdot.
                </p>
            )}
            <p className="text-xl mt-2 mb-2">
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
