package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;
//Lager et array for en drop down meny for å velge film
    @GetMapping("/VelgFilm")
    public List <String> VelgFilm (){
        List<String>listFilmer= new ArrayList<>();
        listFilmer.add("Titanic");
        listFilmer.add("The Notebook") ;
        listFilmer.add(" Harry Potter and the Goblet of fire") ;
        listFilmer.add("Mamma Mia") ;
        return listFilmer;
    }

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett Billett) {
        rep.lagreBillett(Billett);
    }

    @GetMapping("/hentAlleBilletter")
    public List<Billett> hentAlleBilletter() {
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlleBilletter")
    public void slettAlleBilletter() {
        rep.slettAlleBilletter();
    }
}
