package com.gamingportal.service;

import com.gamingportal.model.Score;
import com.gamingportal.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    public Score saveScore(Score score) {
        return scoreRepository.save(score);
    }

    public List<Score> getScoresByUser(Long userId) {
        return scoreRepository.findByUserId(userId);
    }
}