package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//Controller steld index in als startpagina.
@Controller
public class HomeController {
	
	//De value in de URL "/" ladt hij index.html
	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

}