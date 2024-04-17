

// tømme og fjerne feilmeldingene når man får kjøpt billett og skrevet inn rikitg informasjon
document.getElementById("feilAntall").innerHTML="";
document.getElementById("feilFornavn").innerHTML="";
document.getElementById("feilEtternavn").innerHTML="";
document.getElementById("feilTelefonnr").innerHTML="";
document.getElementById("feilEpost").innerHTML="";

        const antall = $("#antall").val();
        const fornavn = $("#fornavn").val();
        const etternavn = $("#etternavn").val();
        const telefonnr = $("#telefonnr").val();
        const epost = $("#epost").val();


    //Her har jeg if-setninger (for å få frem feilmeldinger) for antall, fornavn,etternavn,telefonnr og epost.
    if (antall <= 0 || isNaN(antall)) {
        document.getElementById("feilAntall").innerHTML
            = "Feil, skriv inn et heltall";
    }
    if (fornavn.length === 0 || !isNaN(fornavn)) {
        document.getElementById("feilFornavn").innerHTML
            = "Feil skrevet, skriv KUN med bokstaver";
    }
    if (etternavn.length === 0 || !isNaN(etternavn)) {
        document.getElementById("feilEtternavn").innerHTML
            = "Feil etternavn, skriv KUN med bokstaver";
    }
    if (telefonnr.length !== 8 || isNaN(telefonnr)) {
        document.getElementById("feilTelefonnr").innerHTML
            = "Feil telefonnr, skriv et telefonnr med 8 siffer";
    }
    //Her har jeg brukt en REGEX for validering av epost
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("feilEpost").innerHTML
            = "Feil epost, prøv på nytt";


}
//oppretter en funksjon for lagring og legge til ny kunde til kjøpte billetter
    function regKjøpeBillett() {
        const Billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };
        $.post("/lagreBillett", Billett, function () {
            hentAlleBilletter();
        });

        //Viser de kjøpte billettene og ny informasjon
        viseKjøpteBilletter();
    }
//Skriver kode for å tømme arrayet/slette info fra input boksene
$("#film").value = "";
$("#antall").value = "";
$("#fornavn").value = "";
$("#etternavn").value = "";
$("#telefonnr").value = "";
$("#epost").value = "";
{

//funksjon for å skrive ut billetettene
    function viseKjøpteBilletter() {
        let ut = "<table><tr>" + "<th>Film</th><th>Antall</th>" +
            "<th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" + "</tr>";
        for (let k of KjøpteBilletter) {
            ut += "<tr>";
            ut += "<td>" + k.film + "</td><td>" + k.antall
                + "</td><td>" + k.fornavn + "</td><td>" + k.etternavn + "</td><td>"
                + k.telefonnr + "</td><td>" + k.epost + "</td>";
            ut += "</tr>";
        }
        ut += "</table>";
        $("#Kjøptebilletter").html(ut);
    }

//Oppretter en funksjon for å slette de kjøpte billettene ved at man trykker på (slett alle billetter)

    function sletteAlleBilletter() {
        $.get("/slettAlleBilletter", function () {
            BilletterReg.length = 0;
            viseKjøpteBilletter();
        });
    }

//lager en funksjon for å vise de kjøpte billettene
    function hentAlleBilletter() {
        $.get("/hentAlleBilletter", function (kinoBilletter) {
            BilletterReg = kinoBilletter;
            viseKjøpteBilletter();
        });
        $(document).ready(function () {
            hentAlleBilletter()
        });
    }
}




