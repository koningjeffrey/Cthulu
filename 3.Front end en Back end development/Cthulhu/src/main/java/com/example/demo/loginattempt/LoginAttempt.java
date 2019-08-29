package com.example.demo.loginattempt;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="loginAttempt")
public class LoginAttempt {
    
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer loginId;
    private String email;
    private Long timestamp;
    
    private LoginAttempt()  {}
    
    public LoginAttempt(String email, Long timestamp)   {
        this.email = email;
        this.timestamp = timestamp;
    }
    
    public Long getTimestamp()    {
        return timestamp;
    }
    public Integer getLoginId()  {
        return loginId;
    }
    public String getEmail()    {
        return email;
    }
}
