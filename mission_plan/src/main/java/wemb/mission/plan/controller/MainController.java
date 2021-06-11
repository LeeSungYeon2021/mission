package wemb.mission.plan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class MainController {

	@RequestMapping(value = "/")
	public String index() {

		return "index";
	}
	
	@RequestMapping(value = "/test")
	public String test() {

		return "test";
	}
	

}
