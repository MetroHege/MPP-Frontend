import ContactForm from "../components/ContactForm";
import Kuva from "../image/nörtti-2.jpg";

const Contact = () => {
    return (
        <>
            <h1 className="text-4xl mt-4 mb-4">Yhteydenottolomake</h1>
            <div className="flex">
                <div className="w-1/2">
                    <p className="mb-4">
                        Olemme täällä auttaaksemme sinua parhaamme mukaan, joten älä epäröi ottaa
                        meihin yhteyttä minkä tahansa kysymyksen tai huolen kanssa. Arvostamme
                        palautettasi ja ideoitasi, jotka auttavat meitä kehittymään ja tarjoamaan
                        entistä parempaa palvelua.
                    </p>
                    <p className="mb-4">
                        Kiitos, että valitsit meidät! Odotamme innolla mahdollisuutta auttaa sinua.
                    </p>
                    <img src={Kuva} alt="nörtti" className="rounded" />
                </div>
                <div className="w-1/2">
                    <ContactForm />
                </div>
            </div>
        </>
    );
};

export default Contact;
