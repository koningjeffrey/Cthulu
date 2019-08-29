package com.example.demo.comment;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {
    
    private CommentRepository commentRepository;
    
    public CommentController(CommentRepository commentRepository)   {
        this.commentRepository = commentRepository;
    }
        
    @GetMapping("/api/comments/{currentFileId}")  
    public List<Comment> getCommentsByFileId(@PathVariable("currentFileId") Integer fileId)  {
        List <Comment> comments = commentRepository.findByFileId(fileId);
        
        return comments;
    }
    
    @PostMapping("/api/comment")
    public Comment createComment(   @RequestParam("value")          String commentField, 
                                    @RequestParam("currentFileId")  Integer fileId,
                                    @RequestParam("currentUserId")  Integer userId) {
        if (commentField != "" && fileId != 0 && userId != 0) {
            Comment c = new Comment(commentField, fileId, userId);
            Comment createdComment = commentRepository.save(c);
            return createdComment;
        } else {
            return null;
        }
    }
    
    @PostMapping("/api/comment/delete/")
    public Comment deleteComment( @RequestParam("commentId") Integer commentId)   {
        
        Optional<Comment> c = commentRepository.findById(commentId);
        Comment dComment = c.isPresent() ? c.get()  : null;
        
        commentRepository.delete(dComment);
        return dComment;
    }
}
