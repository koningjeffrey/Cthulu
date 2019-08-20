package com.example.demo.user;

import com.example.demo.login.LoginAttempt;
import com.example.demo.login.LoginAttemptRepository;

import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.example.demo.util.RegexUtil;



@RestController
public class UserController {

    private UserRepository userRepository;
    private LoginAttemptRepository loginAttemptRepository;

    public UserController(UserRepository userRepository, LoginAttemptRepository loginAttemptRepository)    {
        this.userRepository = userRepository;
        this.loginAttemptRepository = loginAttemptRepository;
    }
    
    @PostMapping("/api/login")
    public User loginUser(  @RequestParam("email")      String email,
                            @RequestParam("password")   String password)   {

        Optional<User> oUser = userRepository.findByEmail(email);
        
        if ( oUser.isPresent() )   {

                Optional<User> p = userRepository.findByEmailAndPassword(email, password);
            
                if(p.isPresent() )  {
                    return p.get();

                } else {

                    if(loginAttemptRepository.countByEmail(email) < 10 )    {
                        LoginAttempt loginAttempt = new LoginAttempt(email,(System.currentTimeMillis()/1000));
                        loginAttemptRepository.save(loginAttempt);
                        System.out.println("You have incorrectly try to log in: "+loginAttemptRepository.countByEmail(email)+" times");
                        return null;
                        
                    } else  {
                        oUser.get().setUseable(false);
                        userRepository.save(oUser.get());
                        System.out.println("Account blocked. Try again in 1 hour");
                        return null;
                    }
                }
            } else {return null;} 
    }
    
    @PostMapping("/api/user")
    public User createUser( @RequestParam("email")      String email,
                            @RequestParam("firstName")  String firstName,
                            @RequestParam("lastName")   String lastName,
                            @RequestParam("password")   String password,
                            @RequestParam("country")    String country)  {
       /* if(RegexUtil.hasValidPattern(email, RegexUtil.EMAIL_PATTERN) && 
            RegexUtil.hasValidPattern(firstName, RegexUtil.FIRSTNAME_PATTERN) &&
            RegexUtil.hasValidPattern(lastName, RegexUtil.LASTNAME_PATTERN) &&
            RegexUtil.hasValidPattern(password, RegexUtil.PASSWORD_PATTERN) &&
            RegexUtil.hasValidPattern(country, RegexUtil.COUNTRY_PATTERN)){*/
            if(email.contains("@") && email.contains(".") && !firstName.contains(">") && !firstName.contains(".") && !lastName.contains(">")){
            User u = new User(email, firstName, lastName, password, country);
            User createdUser = userRepository.save(u);
    
            return createdUser;
            }else{
                return null;
            }
    }
    
    @PostMapping("/api/user/delete/")
    public User deleteUser( @RequestParam("CurrentUserId") Integer userId)   {
        
        Optional<User> u = userRepository.findById(userId);
        
        User dUser = u.isPresent() ? u.get()  : null;
        userRepository.delete(dUser);
        
        return dUser;
    }
}