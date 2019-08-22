package com.example.demo.comment;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer>{
    
    List<Comment> findByFileId(Integer FileId);
}
