
//viser de ulike valgene
$(function () {
    VelgFilm();
});
//Oppretter en funskjon for utformingen av hvordan nedtrekkslisten skal se ut
function opprettFilm(valg) {
    let ut = "<select id = 'film'>";
    ut += "<option value = '' disabled selected> Velg film her </option>";
    for (const film of valg) {
        ut += "<option value = '" + film + "'>" + film + "</option>";
    }
    ut += "</select>";
    $("#film").html(ut);
}

//Oppretter en funksjon for å velge film
function VelgFilm() {
    $.get("/VelgFilm", function (valg) {
        opprettFilm(valg);
    });
}

//Oppretter en funksjon for lagring og legge til ny kunde til kjøpte billetter, ved å klikke på kjøp billett
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

    let valideringFeil = false;

    //Her har jeg if-setninger (for å få frem feilmeldinger) for antall, fornavn,etternavn,telefonnr og epost.
    if (antall <= 0 || isNaN(antall)) {
        $("#feilAntall").html("feil, skriv inn et heltall");
        valideringFeil = true;
    }
    if (fornavn.length === 0 || !isNaN(fornavn)) {
        $("#feilFornavn").html("Feil skrevet, skriv KUN med bokstaver");
        valideringFeil = true;
    }
    if (etternavn.length === 0 || !isNaN(etternavn)) {
        $("#feilEtternavn").html("Feil etternavn, skriv KUN med bokstaver");
        valideringFeil = true;
    }
    if (telefonnr.length !== 8 || isNaN(telefonnr)) {
        $("#feilTelefonnr").html("Feil telefonnr, skriv et telefonnr med 8 siffer");
        valideringFeil = true;
    }
    //Her har jeg brukt en REGEX for validering av epost
    if (!/\S+@\S+\.\S+/.test(epost)) {
        $("#feilEpost").html("Feil epost, prøv på nytt");
        valideringFeil = true;
    }

    // Hvis valideringen er vellykket vil billettene lagres
    if (!valideringFeil) {
        //sender billetter til serveren for å lagre billettene
        $.post("/lagreBillett", Billett, function () {
            viseKjøpteBilletter();

        });
        // Tømme og fjerne feilmeldingene når man får kjøpt billett og brukeren har rettet opp i feil
        $("#feilAntall").html("");
        $("#feilFornavn").html("");
        $("#feilEtternavn").html("");
        $("#feilTelefonnr").html("");
        $("#feilEpost").html("");

        //tømme arrayet/slette info fra input boksene
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}
        // Funksjon for å vise og hente de kjøpte billettene
        function viseKjøpteBilletter() {
            $.get("/hentAlleBilletter", function (KjøpteBilletter) {
                opprettBilletter(KjøpteBilletter);
            });
        }

        //Funksjon for å opprettelse av array og formatering av billetter
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
            $("#KjøpteBilletter").html(ut);
        }

         //Lager en funksjon for å vise og hente opp de kjøpte billettene
            function hentAlleBilletter() {
                $.get("/hentAlleBilletter", function (data) {
                    opprettBilletter(data);
                })
            }
            $(document).ready(function () {
                hentAlleBilletter();
        });

        //Oppretter en funksjon for å slette de kjøpte billettene ved at man trykker på (slett alle billetter)
        function slettAlleBilletter() {
            $.get("/slettAlleBilletter", function () {
                viseKjøpteBilletter();
            });
        }











