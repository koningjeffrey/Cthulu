//Deze klasse kan comments creëren, lezen, updaten en verwijderen(crud) in de database.
//https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
package com.example.demo.comment;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

//De klasse heeft de naam nodig en het type primairykey
public interface CommentRepository extends CrudRepository<Comment, Integer>{
    
    //Zoekt een lijst van files op basis van een FileId.
    public List<Comment> findByFileId(Integer FileId);
    //Zoekt een lijst van comments op basis van een fileId.
    public Optional<Comment> findByCommentId(Integer fileId);
    
}
