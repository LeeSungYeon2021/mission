package wemb.mission.plan.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

import wemb.mission.plan.service.PlanService;
import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

@Controller
public class MainController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private PlanService planService;

	@RequestMapping(value = "/main")
	public String index() {

		return "index";
	}
	//일정 카운트 
	@RequestMapping(value="/plan_count" ,  method=RequestMethod.POST)
	@ResponseBody
	public List<PlanCount> planCount(String day) {
		
		log.info("카운트 : {} " ,day);
		String subDay = day.substring(2);
		List<PlanCount> list = planService.planCount(subDay);
		return list;
	}
	// 일정 조회
	@RequestMapping(value = "/plan_select" , method=RequestMethod.POST)
	@ResponseBody
	public List<Plan> planSelect(String day) {
		
		log.info("day : {} ",day);
		String subDay = day.substring(2);
		log.info("subDay : {} ",subDay);
		 List<Plan> list = planService.planSelect(subDay); 
		 
		 for(Plan p : list) {
			 log.info("P : {} " ,p);
		 }
		 return list;
		 
	}

	// 일정 등록
	@RequestMapping(value = "/plan_enroll",method=RequestMethod.POST)
	public RedirectView planEnroll(Plan plan) {
		if (plan.getPlan_select().equals("일반")) {
			plan.setPlan_select("N");
		}else { 
			plan.setPlan_select("Y");
		}
		int result = planService.planInsert(plan);
		
		return new RedirectView("/main");
	}
}
