//Deze klasse kan User creëren, lezen, updaten en verwijderen(crud) in de database.
//https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
package com.example.demo.user;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer>  {

    //Zoekt een user op.
    public Optional<User> findByEmail(String email);
    //Zoekt een user met zijn password op.
    public Optional<User> findByEmailAndPassword(String email, String password);
    
    //Maakt een lijst van users met een bepaalde role.
    @Query(value= "SELECT * FROM spring_demo.user WHERE user_role = ?1", nativeQuery = true)
    public List<User> findByUserRole(Integer userRole);
    
}