//Deze klasse is de beveiliging van de inputvelden.
package com.example.demo.util;

//import om patterns te compilen in regex
import java.util.regex.Pattern;
//import om de invoer te vergelijken met de pattern
import java.util.regex.Matcher;

//Dit zijn de Regex patterns die bepalen welke tekens, letters en cijfers er gebruikt mogen worden in de input velden. 
public class RegexUtil{
    public static final String FIRSTNAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String LASTNAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String EMAIL_PATTERN = "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b";
    public static final String COUNTRY_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String PASSWORD_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

//Dit is de methode die bepaald of de invoer toe is gestaan op basis van de bovenstaande patterns.
    public static boolean hasValidPattern(String patternToCheck, String inputToCheck){
        //selecteerd het bijbehorende pattern die door is gegeven door userController en zet het op in Regex door te compilen.
        Pattern pattern = Pattern.compile(patternToCheck);
        //Match checkt of er een overeenkomst is tussen het pattern en de invoer.
        Matcher matcher = pattern.matcher(inputToCheck);
        //Hij returnd of de invoer is toegestaan of niet (true or false)
        return matcher.find();
    }
}