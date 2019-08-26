//Deze klasse kan File creëren, lezen, updaten en verwijderen(crud) in de database.
//https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
package com.example.demo.file;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Integer>{
    
    //Zoekt een userId in de lijst.
    public List<File> findByUserId(Integer userId, Sort sort);
    //Zoekt een fileID in de lijst.
    public Optional<File> findByFileId(Integer fileId);
    //Zoekt een bastand in de lijst.
    public Optional<File> findByFilename(String filename);
    //Haalt een lijst op van alle bestanden.
    public List<File> findAll(Sort sort);
    //Haalt bestand op.
    public File getByFilename(String filename);
}