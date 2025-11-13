package com.gamingportal.controller;

import com.gamingportal.entity.Tournament;
import com.gamingportal.repository.TournamentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "http://localhost:5173")
public class TournamentController {

    private final TournamentRepository repo;

    public TournamentController(TournamentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Tournament> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Tournament create(@RequestBody Tournament t) {
        return repo.save(t);
    }

    @GetMapping("/{id}")
    public Tournament getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Tournament update(@PathVariable Long id, @RequestBody Tournament t) {
        t.setId(id);
        return repo.save(t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
