package com.example.demo.file;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Integer>{
    
    public List<File> findByUserId(Integer userId, Sort sort);
    public Optional<File> findByFileId(Integer fileId);
    public Optional<File> findByFilename(String filename);
    public List<File> findAll(Sort sort);
    public File getByFilename(String filename);
}