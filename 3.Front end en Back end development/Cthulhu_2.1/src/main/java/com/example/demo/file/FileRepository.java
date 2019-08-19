package com.example.demo.file;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Integer>{
    
    List<File> findByUserId(Integer userId, Sort sort);
    
    Optional<File> findByFileId(Integer fileId);
    
    List<File> findAll(Sort sort);
}