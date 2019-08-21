package com.example.demo.user;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

//Dit zogd ervoor dat er dingen ingevoerd kunnen worden in de tabel User met als primairykey een integer. Create/Read/Upldate/Delete
public interface UserRepository extends CrudRepository<User, Integer>  {
    
    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email, String password);
    
    @Query(value= "SELECT * FROM spring_demo.user WHERE user_role = ?1", nativeQuery = true)
    public List<User> findByUserRole(Integer userRole);
    
}