package com.example.demo.comment;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer>{
    
    public List<Comment> findByFileId(Integer FileId);
    public Optional<Comment> findByCommentId(Integer fileId);
    
}
