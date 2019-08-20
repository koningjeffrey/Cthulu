package com.example.demo.util;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexUtil{
    public static final String FIRSTNAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String LASTNAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String EMAIL_PATTERN = "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b";
    public static final String COUNTRY_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String PASSWORD_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

    public static boolean hasValidPattern(String patternToCheck, String inputToCheck){
        Pattern pattern = Pattern.compile(patternToCheck);
        Matcher matcher = pattern.matcher(inputToCheck);

        return matcher.find();
    }
}