package com.sourcery.km.repository;

import java.util.Optional;
import java.util.UUID;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.sourcery.km.entity.User;

public interface UserRepository {
    @Insert("INSERT INTO app_users (id, auth0_id, email, username) VALUES (#{id}, #{auth0Id}, #{email}, #{username})")
    void insertUser(User user);

    @Select("SELECT * FROM app_users WHERE auth0_id=#{auth0Id}")
    Optional<User> getUserWithAuth0ID(String auth0Id);

    @Select("SELECT * FROM app_users WHERE id=#{id}")
    Optional<User> getUserById(UUID id);
}
