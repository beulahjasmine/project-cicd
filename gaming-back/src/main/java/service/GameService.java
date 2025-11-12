package com.gamingportal.service;

import com.gamingportal.model.Game;
import com.gamingportal.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }
}