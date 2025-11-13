package com.gamingportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingportal.entity.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {}
