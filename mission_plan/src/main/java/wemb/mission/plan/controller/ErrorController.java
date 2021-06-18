package wemb.mission.plan.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController extends RuntimeException{
	
	
	//에러페이지 전환
	@RequestMapping(value = "/plan_error")
	public String error(HttpServletRequest req,HttpServletResponse res,Model m) {
		Object status = req.getAttribute(RequestDispatcher.ERROR_EXCEPTION_TYPE);

		m.addAttribute("code",status);
		System.out.println("status : " + status);
		return "/error/error";
	}
}
