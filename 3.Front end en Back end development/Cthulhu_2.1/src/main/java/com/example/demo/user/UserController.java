package com.example.demo.user;

import com.example.demo.login.LoginAttempt;
import com.example.demo.login.LoginAttemptRepository;
import java.util.List;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



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
        
        User u = new User(email, firstName, lastName, password, country);
        User createdUser = userRepository.save(u);
        return createdUser;
    }
    
    @PostMapping("/api/userPromo")
    public User createPromo( @RequestParam("email")      String email,
                             @RequestParam("firstName")  String firstName,
                             @RequestParam("lastName")   String lastName,
                             @RequestParam("password")   String password,
                             @RequestParam("country")    String country)  {
        
        User promoUser = new User(email, firstName, lastName, password, country);
        promoUser.setUserRole(1);
        User createdPromoUser = userRepository.save(promoUser);
        return createdPromoUser;
    }
    
    @GetMapping("/api/producers")
    public List<User> getProducers()   {
        
        List<User> producers = userRepository.findByUserRole(0);
        
        return producers;
    }
    
    @GetMapping("/api/promoters")
    public List<User> getPromoUsers()   {
        
        List<User> promoters = userRepository.findByUserRole(1);
        
        return promoters;
    }
    
    @PostMapping("/api/user/delete")
    public User deleteUser( @RequestParam("userId") Integer userId)   {
        
        Optional<User> u = userRepository.findById(userId);
        
        User dUser = u.isPresent() ? u.get()  : null;
        userRepository.delete(dUser);
        
        return dUser;
    }
}