//Deze klasse kan File creëren, lezen, updaten en verwijderen(crud) in de database.
//https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
package com.example.demo.login;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface LoginAttemptRepository extends CrudRepository<LoginAttempt, Integer>  {
    
    //Haalt een lijst op op basis van email hoe vaak er is ingelogd.
    @Query(value= "SELECT COUNT(email) FROM spring_demo.login_attempt WHERE email = ?1", nativeQuery = true)
    Integer countByEmail(String email);
    
    //Verwijdert het aantal inlog pogingen na een bepaalde tijd.
    @Query(value= "DELETE FROM spring_demo.login_attempt WHERE timestamp < UNIX_TIMESTAMP()-3600;", nativeQuery = true)
    void clearLoginAttempts();
}