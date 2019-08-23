package com.example.demo.user;

import com.example.demo.file.UploadStorage;
import com.example.demo.login.LoginAttempt;
import com.example.demo.login.LoginAttemptRepository;
import java.io.IOException;
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
    private UploadStorage uploadStorage;

    public UserController(UserRepository userRepository, LoginAttemptRepository loginAttemptRepository, UploadStorage uploadStorage)    {
        this.userRepository = userRepository;
        this.loginAttemptRepository = loginAttemptRepository;
        this.uploadStorage = uploadStorage;
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
                            @RequestParam("country")    String country) throws IOException  {
        
        User u = new User(email, firstName, lastName, password, country);
        User createdUser= userRepository.save(u);
        uploadStorage.createDirectory(createdUser.getEmail());
        
        return createdUser;
    }
    
    @PostMapping("/api/changeUser")
    public User changeUser( @RequestParam("userId")     Integer userId,
                            @RequestParam("firstName")  String firstName,
                            @RequestParam("lastName")   String lastName,
                            @RequestParam("password")   String password,
                            @RequestParam("country")    String country) throws IOException  {
        
        Optional<User> u = userRepository.findById(userId);
        User cUser = u.isPresent() ? u.get()  : null;
        
        if(firstName != null)   {
            cUser.setFirstName(firstName);
        }
        if(lastName != null)    {
            cUser.setLastName(lastName);
        }
        if(country != null)     {
            cUser.setCountry(country);
        }
        if(password != null)    {
            cUser.setPassword(password);
        }
        User changedUser = userRepository.save(cUser);
        return changedUser;
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
    @PostMapping("/api/user/block")
    public User blockUser ( @RequestParam("userId") Integer userId) {
        
        Optional<User> u = userRepository.findById(userId);
        
        User bUser = u.isPresent() ? u.get() : null;
        
        bUser.setUseable(false);
        
        userRepository.save(bUser);
        
        return bUser;
    }
    @PostMapping("/api/user/unblock")
    public User unblockUser ( @RequestParam("userId") Integer userId) {
        
        Optional<User> u = userRepository.findById(userId);
        
        User bUser = u.isPresent() ? u.get() : null;
        
        bUser.setUseable(true);
        
        userRepository.save(bUser);
        
        return bUser;
    }
}