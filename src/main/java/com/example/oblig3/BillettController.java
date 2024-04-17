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

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett Billett) {
        rep.lagreBillett(Billett);
    }

    @GetMapping("/hentAllebilletter")
    public List<Billett> hentAllebilletter() {
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlleBilletter")
    public void slettAlleBilletter() {
        rep.slettAlleBilletter();
    }
}
