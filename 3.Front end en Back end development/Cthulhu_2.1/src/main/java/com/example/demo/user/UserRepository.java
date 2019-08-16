package com.example.demo.user;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer>  {

    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email, String password);
    
}