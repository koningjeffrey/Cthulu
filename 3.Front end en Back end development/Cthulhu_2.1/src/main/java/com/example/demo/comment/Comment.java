package com.example.demo.comment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="comment")
public class Comment {
    
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer commentId;
    
    private String commentField;
    private Integer fileId;
    private Integer userId;
    
    private Comment()    {}
    
    public Comment(String commentField, Integer fileId, Integer userId)    {
        this.commentField = commentField;
        this.fileId = fileId;
        this.userId = userId;
    }
    public Integer getCommentId() {
        return commentId;
    }
    public Integer getFileId()  {
        return fileId;
    }
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
