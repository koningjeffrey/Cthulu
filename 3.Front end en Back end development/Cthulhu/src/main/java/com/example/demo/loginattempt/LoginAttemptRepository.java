package com.example.demo.loginattempt;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface LoginAttemptRepository extends CrudRepository<LoginAttempt, Integer>  {
    
    @Query(value= "SELECT COUNT(email) FROM spring_demo.login_attempt WHERE email = ?1", nativeQuery = true)
    Integer countByEmail(String email);
    
    @Query(value= "DELETE FROM spring_demo.login_attempt WHERE timestamp < UNIX_TIMESTAMP()-3600;", nativeQuery = true)
    void clearLoginAttempts();
}