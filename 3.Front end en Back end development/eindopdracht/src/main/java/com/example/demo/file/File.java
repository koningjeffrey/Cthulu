package com.example.demo.file;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name="file")
public class File {
    
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer fileId;
    
    private String filename;
    private Integer userId;
    private Integer fileValue;
    private String timestamp;
    private String title;
    
    private File()  {}
    
    public File(String filename, Integer userId, String title, String timestamp)  {
        this.filename = filename;
        this.userId = userId;
        this.timestamp = timestamp;
        this.fileValue = 0;
        this.title = title;
    }
    public void setFileValue(Integer fileValue)  {
        this.fileValue = fileValue;
    }
    public Integer getFileValue()   {
        return fileValue;
    }
    public void setTile(String title)   {
        this.title = title;
    }
    public String getTitle()    {
        return title;
    }
    public void setFilename(String filename)    {
        this.filename = filename;
    }
    public String getFilename() {
        return filename;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public Integer getUserId()  {
        return userId;
    }
    public Integer getFileId()  {
        return fileId;
    }
}
