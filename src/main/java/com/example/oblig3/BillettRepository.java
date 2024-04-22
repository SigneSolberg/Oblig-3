package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;
//lager metoder for lagring av billetter og hvordan det skal skrives inn i SQL

    public void lagreBillett(Billett Billett) {
        String sql = "INSERT INTO Billettlagring(film,antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, Billett.getFilm(), Billett.getAntall(), Billett.getFornavn(), Billett.getEtternavn(), Billett.getTelefonnr(), Billett.getEpost());
    }
//Lager metode for å hente alle billettene og hvordan det skal skrives inn i SQL

    public List <Billett> hentAlleBilletter() {
       String sql = "SELECT * FROM Billettlagring ORDER BY etternavn";
       List <Billett> hentAlleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
       return hentAlleBilletter;
    }
    //Lager metode for å kunne slette alle billettene og hvordan det skal skrives inn i SQL

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billettlagring";
        db.update(sql);
    }
}

