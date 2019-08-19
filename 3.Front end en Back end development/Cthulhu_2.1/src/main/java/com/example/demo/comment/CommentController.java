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
    public Comment createComment(   @RequestParam("commentField")   String commentField, 
                                    @RequestParam("fileId")         Integer fileId) {
        
        Comment c = new Comment(commentField, fileId);
        Comment createdComment = commentRepository.save(c);
        return createdComment;
    }
    
    @PostMapping("/api/comment/delete/")
    public Comment deleteComment( @RequestParam("commentId") Integer commentId)   {
        
        Optional<Comment> c = commentRepository.findById(commentId);
        
        Comment dComment = c.isPresent() ? c.get()  : null;
        commentRepository.delete(dComment);
        
        return dComment;
    }
}
