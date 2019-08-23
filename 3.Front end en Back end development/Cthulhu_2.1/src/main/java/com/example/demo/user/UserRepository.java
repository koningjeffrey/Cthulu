package com.example.demo.user;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer>  {

    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email, String password);
    
    @Query(value= "SELECT * FROM spring_demo.user WHERE user_role = ?1", nativeQuery = true)
    public List<User> findByUserRole(Integer userRole);
    
}