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

    public void lagreBillett(Billett Billett) {
        String sql = "INSERT INTO Billett(film,antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, Billett.getFilm(), Billett.getAntall(), Billett.getFornavn(), Billett.getEtternavn(), Billett.getTelefonnr(), Billett.getEpost());
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billettlagring ORDER BY etternavn";
        List<Billett> AlleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        return AlleBilletter;
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
