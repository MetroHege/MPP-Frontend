import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const encouragementMessages: string[] = [
    "Tsemppiä sinulle, kun teet ympäristöystävällisen valinnan ja kierrät urheiluvälineitäsi! Pienellä teolla voi olla suuri merkitys ympäristölle. Jatka samaan malliin!",
    "Kiitos, että olet mukana edistämässä kestävämpää tulevaisuutta urheiluvälineiden kierrätyksen avulla. Jokainen teko luo muutosta – olet osa tärkeää muutosta!",
    "Olet upea esimerkki siitä, miten pienillä teoilla voi olla suuri vaikutus ympäristöön. Jatka vanhojen urheiluvaatteiden ja -välineiden kierrättämistä!",
    "Hattua nostan sinulle kierrätysteostasi! Jokainen askel kohti kestävämpää tulevaisuutta on arvokas. Pidetään yhdessä huolta ympäristöstämme!",
    "Mahtavaa, että välität ympäristöstäsi ja kierrät urheiluvälineitäsi. Pienet teot voivat muuttaa maailmaa – ja sinä olet niiden sankari!",
    "Kiitos, että teet osasi urheiluvälineiden kierrätyksen puolesta! Jokainen kierrätetty väline on askel kohti kestävämpää urheilukulttuuria. Pidetään huolta ympäristöstämme yhdessä!",
    "Olet todellinen ekosankari kierrättäessäsi vanhoja urheiluvälineitäsi! Sinun teoillasi on merkitystä ympäristölle. Jatka samaan malliin!",
    "Hienoa nähdä, että arvostat ympäristöäsi ja teet aktiivisesti töitä sen hyväksi kierrättämällä urheiluvälineitäsi. Pidetään yhdessä huolta planeetastamme!",
    "Iso kiitos panoksestasi urheiluvälineiden kierrätyksen edistämisessä! Jokainen kierrätetty väline on askel kohti kestävämpää tulevaisuutta. Olet arvokas osa tätä muutosta!",
    "Tsemppiä matkallesi kohti kestävämpää elämäntapaa urheiluvälineiden kierrätyksen kautta! Pidä yllä hyvää työtä ja inspiroi muita tekemään samoin. Yhdessä voimme tehdä suuria asioita ympäristömme hyväksi!",
    "Hienoa, että olet mukana edistämässä kestävää urheilukulttuuria! Kierrättämällä vanhoja urheiluvälineitäsi olet osa suurempaa muutosta kohti ympäristöystävällisempää maailmaa.",
    "Iso kiitos sitoutumisestasi urheiluvälineiden kierrätykseen! Jokainen teko luo positiivista vaikutusta ympäristölle. Pysy vahvana ja jatka eteenpäin!",
    "Olet todellinen ekovisionääri! Kierrättämällä urheiluvälineitäsi osoitat, että pienet teot voivat tehdä suuria asioita ympäristömme hyväksi. Kiitos siitä!",
    "Mahtavaa, että olet mukana rakentamassa kestävämpää tulevaisuutta urheiluvälineiden kierrätyksen avulla! Pidä kiinni tekemästäsi työstä – se todella merkitsee!",
    "Kiitos, että teet osasi vähentääksesi jätettä ja edistääksesi kestävää elämäntapaa urheiluvälineiden kierrätyksen avulla! Jokainen kierrätetty väline on askel kohti parempaa huomista.",
    "Sinä olet todellinen ympäristösankari! Kiitos, että välität tarpeeksi ympäristöstäsi toimiaksesi sen hyväksi. Jatka rohkeasti eteenpäin!",
    "Tiedän, että urheiluvälineiden kierrätys voi joskus tuntua pieneltä teolta, mutta se on todellisuudessa suuri askel kohti kestävämpää maailmaa. Kiitos panoksestasi!",
    "Olet inspiroiva esikuva muille! Kiitos, että teet osasi urheiluvälineiden kierrätyksen edistämiseksi ja ympäristömme suojelemiseksi. Jatka samaan malliin!",
    "Kiitos, että olet osa kestävää muutosta! Pienillä teoilla, kuten urheiluvälineiden kierrättämisellä, voimme yhdessä vaikuttaa suuresti ympäristömme tilaan. Pidä kiinni tavoitteestasi!",
    "Tsemppiä matkallesi kohti kestävämpää elämäntapaa! Jokainen kierrätetty urheiluväline on merkittävä askel kohti ympäristöystävällisempää maailmaa. Kiitos, että olet mukana tässä tärkeässä tehtävässä!"
];

const getRandomEncouragementMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
    return encouragementMessages[randomIndex];
};

const Login = () => {
    return (
        <>
            <h1 className=" mb-5 text-4xl">
                Hienoa, että otat vanhojen tavaroiden kierrätyksen vakavasti!
            </h1>
            <p className="mb-10 text-l">{getRandomEncouragementMessage()}</p>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <LoginForm />
                </div>
                <div className="w-1/2">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Login;
