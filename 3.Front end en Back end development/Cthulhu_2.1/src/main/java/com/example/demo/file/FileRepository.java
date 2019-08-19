package com.example.demo.file;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Integer>{
    
    /*in de opdracht staat dat we een sql select  instructie moeten kunnen maken, 
    vandaar deze handmatige sql query*/
    @Query(value= "SELECT * FROM spring_demo.file WHERE user_id = ?1", nativeQuery = true)
    List<File> findByUserId(Integer userId);
    
    Optional<File> findByFileId(Integer fileId);
}