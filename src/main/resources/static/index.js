
//viser de ulike valgene
$(function () {
    VelgFilm();
});
//oppretter en funskjon for utformingen av hvordan nedtrekkslisten skal se ut og formateres
function opprettFilm(valg) {
    let ut = "<select id = 'film'>";
    ut += "<option value = '' disabled selected> Velg film her </option>";
    for (const film of valg) {
        ut += "<option value = '" + film + "'>" + film + "</option>";
    }
    ut += "</select>";
    $("#film").html(ut);
}

//oppretter en funksjon for å velge film
function VelgFilm() {
    $.get("/VelgFilm", function (valg) {
        opprettFilm(valg);
    });
}

//oppretter en funksjon for lagring og legge til ny kunde til kjøpte billetter, ved å klikke på kjøp billett
function regKjøpeBillett() {
    const film = $("#film").val();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();

    const Billett = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost,
    };

    //sender billetter til serveren for å lagre billettene
    $.post("/lagreBillett", Billett, function () {
        viseKjøpteBilletter();

    });

    let valideringFeil = false;

    //Her har jeg if-setninger (for å få frem feilmeldinger) for antall, fornavn,etternavn,telefonnr og epost.
    if (antall <= 0 || isNaN(antall)) {
        valideringFeil = true;
        $("#feilAntall").html("feil, skriv inn et heltall");
    }
    if (fornavn || fornavn.length === 0 || !isNaN(fornavn)) {
        valideringFeil = true;
        $("#feilFornavn").html("Feil skrevet, skriv KUN med bokstaver");

    }
    if (etternavn || etternavn.length === 0 || !isNaN(etternavn)) {
        valideringFeil = true;
        $("#feilEtternavn").html("Feil etternavn, skriv Kun med bokstaver");

    }
    if (telefonnr || telefonnr.length !== 8 || isNaN(telefonnr)) {
        valideringFeil = true;
        $("#feilTelefonnr").html("Feil telefonNr, skriv et telefonnr med 8 siffer");

    }
    //Her har jeg brukt en REGEX for validering av epost
    if (!/\S+@\S+\.\S+/.test(epost)) {
        valideringFeil = true;
        $("#feilEpost").html("Feil epost, prøv på nytt");

    }
    // Tømme og fjerne feilmeldingene når man får kjøpt billett og brukeren har rettet opp i feil
    $("#feilAntall").html("");
    $("#feilFornavn").html("");
    $("#feilEtternavn").html("");
    $("#feilTelefonnr").html("");
    $("#feilEpost").html("");

    // Hvis valideringen er vellykket vil billettene lagres
    if (!valideringFeil) {
        regKjøpeBillett()
    }

    //tømme arrayet/slette info fra input boksene
    $("#film").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");

    // funksjon for å vise og hente de kjøpte billettene
    function viseKjøpteBilletter() {
        $.get("/hentAlleBilletter", function (KjøpteBilletter) {
            opprettBilletter(KjøpteBilletter);
        });
    }

    //funksjon for å opprettelse av array og formatering av billetter
    function opprettBilletter(KjøpteBilletter) {
        let ut = "<table><tr>" +
            "<th>Film</th><th>Antall</th>" +
            "<th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>"
            + "</tr>";
        for (let k of KjøpteBilletter) {
            ut += "<tr>";
            ut += "<td>" +
                k.film + "</td><td>" + k.antall
                + "</td><td>" + k.fornavn + "</td><td>" + k.etternavn + "</td><td>"
                + k.telefonnr + "</td><td>" + k.epost + "</td>";
            ut += "</tr>";
        }
        ut += "</table>";
        $("#Kjøptebilletter").html(ut);
    }

//lager en funksjon for å vise og hente opp de kjøpte billettene
function hentAlleBilletter() {
    $.get("/hentAlleBilletter", function (data) {
        opprettBilletter(data);
    });
}
$(document).ready(function () {
    hentAlleBilletter();
});
}
//Oppretter en funksjon for å slette de kjøpte billettene ved at man trykker på (slett alle billetter)
    function slettAlleBilletter() {
        $.get("/slettAlleBilletter", function () {
            regKjøpeBillett();
        });
    }











