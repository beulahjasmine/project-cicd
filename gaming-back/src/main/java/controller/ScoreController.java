package com.gamingportal.controller;

import com.gamingportal.model.Score;
import com.gamingportal.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "http://localhost:3000")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping
    public List<Score> getAllScores() {
        return scoreService.getAllScores();
    }

    @PostMapping
    public Score addScore(@RequestBody Score score) {
        return scoreService.saveScore(score);
    }

    @GetMapping("/user/{userId}")
    public List<Score> getScoresByUser(@PathVariable Long userId) {
        return scoreService.getScoresByUser(userId);
    }
}