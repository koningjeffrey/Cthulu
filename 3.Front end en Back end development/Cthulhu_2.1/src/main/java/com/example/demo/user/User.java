//Deze klasse maakt een tabel aan voor gebruikers(user).
package com.example.demo.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {
    
    //Attributen
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private Integer userId;
    
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Integer userRole;
    private Boolean useable;
    private String country;
    
    //Constructor
    private User()   {}

    //Constructor
    public User(String email,String firstName,String lastName,String password, String country)  {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.country = country;
        this.userRole = 0;
        this.useable = true;
    }
    
    //Getters en setters
    public Integer getUserId()  {
        return userId;
    }
    public Boolean getUseable() {
        return useable;
    }
    public void setUseable(Boolean useable)    {
        this.useable = useable;
    }
    public String getFirstName()   {
        return firstName;
    }
    public void setFirstName(String firstName)   {
        this.firstName = firstName;
    }
    public String getCountry()  {
        return country;
    }
    public void setCountry(String country)  {
        this.country = country;
    }
    public void setUserRole(Integer userRole)   {
        this.userRole = userRole;
    }
    public Integer getUserRole()    {
        return userRole;
    }
    public String getLastName()   {
        return lastName;
    }
    public void setLastName(String lastName)   {
        this.lastName = lastName;
    }
    public String getEmail()   {
        return email;
    }
    public void setEmail(String email)   {
        this.email = email;
    }
    public String getPassword()   {
        return password;
    }
    public void setPassword(String password)   {
        this.password = password;
    }
}
