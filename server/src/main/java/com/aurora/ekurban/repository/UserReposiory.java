package com.aurora.ekurban.repository;

import com.aurora.ekurban.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserReposiory extends JpaRepository<User, Long> {
    List<User> findUserByEposta(String eposta);
}