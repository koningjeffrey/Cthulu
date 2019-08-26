//commentControler maakt met PostMapping en GetMapping folders aan zodat je gegevens kan plaatsen en ophalen vanaf de frontend.
package com.example.demo.comment;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//Deze RestController kan de Post en GetMapping verwerken. 
@RestController
public class CommentController {
    
    private CommentRepository commentRepository;
    
    public CommentController(CommentRepository commentRepository)   {
        this.commentRepository = commentRepository;
    }

    //Deze GetMapping, maakt een lijst van alle comment berichten, die worden gezocht in de database door de commentRepository op basis van de fileId. 
    @GetMapping("/api/comments/{currentFileId}")  
    public List<Comment> getCommentsByFileId(@PathVariable("currentFileId") Integer fileId)  {
        List <Comment> comments = commentRepository.findByFileId(fileId);
        
        return comments;
    }
    
    //Dit plaatst de comments die het ontvangt in de database.
    @PostMapping("/api/comment")
    public Comment createComment(   @RequestParam("value")          String commentField, 
                                    @RequestParam("currentFileId")  Integer fileId,
                                    @RequestParam("currentUserId")  Integer userId) {
        //Hier wordt een comment object gemaakt van alle ontvangen attributen.
        Comment c = new Comment(commentField, fileId, userId);
        //Met save() kan de commentRepository de attributen opslaan in de database.
        Comment createdComment = commentRepository.save(c);
        return createdComment;
    }
    
    //PostMapping kan een bericht verwijderen als het een commentId ontvangt.
    @PostMapping("/api/comment/delete/")
    public Comment deleteComment( @RequestParam("commentId") Integer commentId)   {
        
        //Het commentId wordt gezocht in de database.
        Optional<Comment> c = commentRepository.findById(commentId);
        //Als de comment is gevonden haalt hij het op en wordt het dComment genoemd anders gebeurt er niets(null).
        Comment dComment = c.isPresent() ? c.get()  : null;
        //Met delete() kan de de repository het uit de database verwijderen.
        commentRepository.delete(dComment);
        return dComment;
    }
}
