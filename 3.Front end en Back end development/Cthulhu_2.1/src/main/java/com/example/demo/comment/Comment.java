//Dit zijn alle attributen die nodig zijn voor comments en die in de database worden geplaatst.
package com.example.demo.comment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity //is een JPA-annotatie die de hele klasse voor opslag in een relationele tabel aangeeft. https://spring.io/guides/gs/accessing-data-jpa/
@Table(name="comment") //We maken een tabel aan die comment heet
public class Comment {
    
    //Hier genereren we een unieke id voor elke comment.
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer commentId;
    
    private String commentField;
    private Integer fileId;
    private Integer userId;
    
    //Constructor is altijd nodig in een class
    private Comment()    {}
    
    //Deze constructor kan de bovenstaande attributen aanvullen.
    public Comment(String commentField, Integer fileId, Integer userId)    {
        this.commentField = commentField;
        this.fileId = fileId;
        this.userId = userId;
    }

    //Getters maken de attributen toegangkelijk voor andere klassen
    public Integer getCommentId() {
        return commentId;
    }
    public Integer getFileId()  {
        return fileId;
    }

    //Setters zijn er om attributen te initialiseren door andere klassen. De argument/parameter die ze ontvangen kunnen ze dan doorpasen naar de constructor die dat attributen initialiseerd.
    public void setFileId(Integer fileId)    {
        this.fileId = fileId;
    }
    public Integer getUserId()  {
    return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getCommentField()  {
        return commentField;
    }
    public void setCommentField(String commentField)  {
        this.commentField = commentField;
    }
}
