package com.example.oblig3;

//oppretter en klasse
public class Billett {
    private int id;
    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private int telefonnr;
    private String epost;

//Konstrutør for klassen Billett
public Billett( int id, String film, int antall, String fornavn, String etternavn, int telefonnr, String epost ){
        this.id = id;
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;

  //Get og Set metoder
    }
    public Billett() {

    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getFilm() {
        return film;
    }
        public void setFilm(String film) {
            this.film = film;
    }
    public void setAntall(int antall) {
        this.antall = antall;
    }
    public int getAntall() {
        return antall;
    }
    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }
    public String getFornavn() {
        return fornavn;
    }
    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }
    public String getEtternavn() {
        return etternavn;
    }
    public void setTelefonnr(int telefonnr) {
        this.telefonnr = telefonnr;
    }
    public int getTelefonnr() {
        return telefonnr;
    }
    public void setEpost(String epost) {
        this.epost = epost;
    }
    public String getEpost() {
        return epost;
    }
}







