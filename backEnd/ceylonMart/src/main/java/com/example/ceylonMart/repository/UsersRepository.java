package com.example.ceylonMart.repository;


import com.example.ceylonMart.entity.ProductEntity;
import com.example.ceylonMart.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users,Long> {

    @Query(value = "SELECT EXISTS(SELECT 1 FROM users WHERE user_name = ?1) AS user_exists", nativeQuery = true)
    public boolean checkIfUserNameExists(String userName);

    @Query(value = "SELECT * FROM users WHERE user_name = ?1", nativeQuery = true)
    Optional<Users> getAllById(String userName);

    @Query(value = "SELECT user_id FROM users WHERE user_id = (SELECT MAX(user_id) FROM users);", nativeQuery = true)
    String lastID();

    @Query(value = "SELECT * FROM users", nativeQuery = true)
    List<Users> getAll();

    @Query(value = "  SELECT * FROM users WHERE user_id != 'U0001';", nativeQuery = true)
    List<Users> getAllUsers();

    @Query(value = "SELECT * FROM users WHERE user_id = ?1", nativeQuery = true)
    Optional<Users> findByUserId(String userId);

    @Query("SELECT COUNT(u) FROM Users u")
    long countAllUsers();
}
