//userController wordt gebruikt om gegevens van en naar de database te sturen
package com.example.demo.user;

import com.example.demo.login.LoginAttempt;
import com.example.demo.login.LoginAttemptRepository;
import java.util.List;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.example.demo.util.RegexUtil;



@RestController
public class UserController {

    private UserRepository userRepository;
    private LoginAttemptRepository loginAttemptRepository;

    //Constructor
    public UserController(UserRepository userRepository, LoginAttemptRepository loginAttemptRepository)    {
        this.userRepository = userRepository;
        this.loginAttemptRepository = loginAttemptRepository;
    }
    
    //Stuurt de login gegevens naar de database.
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
    
    //Maakt een user aan en checkt of hij aan de Regex voorwaarden voldoet.
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
    //RequestParm haalt de gegevens op van de frontend en maakt hier een string van om in java te gebruiken. Deze post(plaatst) hij in de map api/userPromo.
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
}