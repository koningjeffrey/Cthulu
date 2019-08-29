//userController wordt gebruikt om gegevens van en naar de database te sturen
package com.example.demo.user;

import com.example.demo.comment.CommentRepository;
import com.example.demo.file.FileRepository;
import com.example.demo.file.UploadStorage;
import com.example.demo.loginattempt.LoginAttempt;
import com.example.demo.loginattempt.LoginAttemptRepository;
import com.example.demo.util.PWHashing;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class UserController {

    private UserRepository userRepository;
    private LoginAttemptRepository loginAttemptRepository;
    private UploadStorage uploadStorage;
    private FileRepository fileRepository;
    private CommentRepository commentRepository;
    
    //Constructor
    public UserController(  UserRepository userRepository, 
                            LoginAttemptRepository loginAttemptRepository, 
                            UploadStorage uploadStorage, 
                            FileRepository fileRepository,
                            CommentRepository commentRepository)    {
        
        this.userRepository = userRepository;
        this.loginAttemptRepository = loginAttemptRepository;
        this.uploadStorage = uploadStorage;
        this.fileRepository = fileRepository;
        this.commentRepository = commentRepository;
    }
    
    @PostMapping("/api/login")
    public User loginUser(  @RequestParam("email")      String email,
                            @RequestParam("password")   String password) throws NoSuchAlgorithmException   {

        String hashedPassword = PWHashing.generateHash(password);
        
        Optional<User> oUser = userRepository.findByEmail(email);
        
        /*zit het ingevoerde emailadres in het systeem?*/
        if ( oUser.isPresent())   {
                try {loginAttemptRepository.clearLoginAttempts();} 
                catch (Exception e) {System.out.println("LoginAttempts already clear!" + e);}
                
                /*is het ingevoerde emailadres niet geblokkeerd?*/
                if(oUser.get().getUseable() == true) {
                    
                    Optional<User> p = userRepository.findByEmailAndPassword(email, hashedPassword);
                    
                    if(p.isPresent())  {    
                        return p.get();
                        
                    } else {
                        
                        if(loginAttemptRepository.countByEmail(email) < 10 )    {
                            LoginAttempt loginAttempt = new LoginAttempt(email,(System.currentTimeMillis()/1000));
                            loginAttemptRepository.save(loginAttempt);
                            return null;
                        } else {
                            oUser.get().setUseable(false);
                            userRepository.save(oUser.get());
                            return null;
                        }
                    }
                /*geblokkeerd*/
                } else {return null;}
        /*verkeerde email*/
        } else{ return null;}
    }
    
    //Maakt een user aan en checkt of hij aan de Regex voorwaarden voldoet.
    @PostMapping("/api/user")
    public User createUser( @RequestParam("email")      String email,
                            @RequestParam("firstName")  String firstName,
                            @RequestParam("lastName")   String lastName,
                            @RequestParam("password")   String password,
                            @RequestParam("country")    String country) throws IOException, NoSuchAlgorithmException  {
        
        Optional<User> u = userRepository.findByEmail(email);
        if(u.isPresent()) { return null; } 
        
        else if( email.contains("@") && email.contains(".") 
        && !firstName.contains(">") && !firstName.contains(".") 
        && !lastName.contains(">") && firstName != null 
        && lastName != null && country != null && password != null){
            
        User user = new User(email, firstName, lastName, password, country);
        User createdUser= userRepository.save(user);
        uploadStorage.createDirectory(createdUser.getEmail());
        
        return createdUser;
        }else{ return null;}
    }
    
    @PostMapping("/api/userPromo")
    public User createPromo( @RequestParam("email")      String email,
                             @RequestParam("firstName")  String firstName,
                             @RequestParam("lastName")   String lastName,
                             @RequestParam("password")   String password,
                             @RequestParam("country")    String country,
                             @RequestParam("userRole")   Integer userRole) throws NoSuchAlgorithmException, IOException  {
        
        Optional<User> u = userRepository.findByEmail(email);
        if(u.isPresent()) { return null; } 
        
        else if( email.contains("@") && email.contains(".") 
        && !firstName.contains(">") && !firstName.contains(".") 
        && !lastName.contains(">") && firstName != null 
        && lastName != null && country != null && password != null
        && userRole != null){
            
        User promoUser = new User(email, firstName, lastName, password, country);
        promoUser.setUserRole(userRole);
        User createdPromoUser = userRepository.save(promoUser);
        uploadStorage.createDirectory(createdPromoUser.getEmail());
        
        return createdPromoUser;
        }else{ return null; }
    }
    
    //RequestParm haalt de gegevens op van de frontend en maakt hier een string van om in java te gebruiken. Deze post(plaatst) hij in de map api/userPromo.
    @PostMapping("/api/changeUser")
    public User changeUser( @RequestParam("userId")     Integer userId,
                            @RequestParam("firstName")  String firstName,
                            @RequestParam("lastName")   String lastName,
                            @RequestParam("password")   String password,
                            @RequestParam("country")    String country) throws IOException, NoSuchAlgorithmException  {
        
        Optional<User> u = userRepository.findById(userId);
        User cUser = u.isPresent() ? u.get()  : null;
        
        if(!firstName.contains(">") && !firstName.contains(".") 
        && !lastName.contains(">") && firstName != null 
        && lastName != null && country != null && password != null){
            
            cUser.setFirstName(firstName);
            cUser.setLastName(lastName);
            cUser.setCountry(country);
            cUser.setPassword(password);

        User changedUser = userRepository.save(cUser);
        return changedUser;
        }else{
            return null;
        }
    }
    
    //Deze haalt een lijst van producers op uit api/producers op basis van de toegewezen role.
    @GetMapping("/api/producers")
    public List<User> getProducers()   {
        
        List<User> producers = userRepository.findByUserRole(0);
        return producers;
    }
    
    //Deze haalt een lijst van promotors op uit api/promotors op basis van de toegewezen role.
    @GetMapping("/api/promoters")
    public List<User> getPromoUsers()   {
        
        List<User> promoters = userRepository.findByUserRole(1);
        return promoters;
    }
    @GetMapping("/api/getUser/{userId}")
    public User getUserUserId(@PathVariable("userId") Integer userId)   {
        
        Optional<User> u = userRepository.findById(userId);
        User loadUser = u.isPresent() ? u.get() : null;
        
        return loadUser;
    }
    
    //Deze stuurd een opdracht om te verijderen op basis van een userId
    @PostMapping("/api/user/delete")
    public User deleteUser( @RequestParam("userId") Integer userId)   {
        
        //De userId die met RequestParm is doorgegeven uit de frontend wordt gezocht in de database met users.
        Optional<User> u = userRepository.findById(userId);
        //Als deze user is gevonden haalt hij hem op en kan user worden verwijdert. Als de user er niet is returnt hij null en doet niks.
        User dUser = u.isPresent() ? u.get()  : null;
        userRepository.delete(dUser);
        
        return dUser;
    }
    
    //Deze stuurd een opdracht om een gebruiker te blocken op basis van een userId
    @PostMapping("/api/user/block")
    public User blockUser ( @RequestParam("userId") Integer userId) {
        
        Optional<User> u = userRepository.findById(userId);
        User bUser = u.isPresent() ? u.get() : null;
      
        bUser.setUseable(false);
        userRepository.save(bUser);
        
        return bUser;
    }
    //Deze stuurd een opdracht om een gebruiker te unblocken op basis van een userId
    @PostMapping("/api/user/unblock")
    public User unblockUser ( @RequestParam("userId") Integer userId) {
        
        Optional<User> u = userRepository.findById(userId);
        User bUser = u.isPresent() ? u.get() : null;
        
        bUser.setUseable(true);
        userRepository.save(bUser);
        
        return bUser;
    }
}