package wemb.mission.plan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import wemb.mission.plan.service.PlanService;
import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

@Controller

public class MainController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private PlanService planService;

	@RequestMapping(value = "/")
	public String index() {

		return "index";
	}
	
	@RequestMapping(value = "/calendar")
	public String calendar() {

		return "/calendar/calendar";
	}
	
	// 일정 카운트
	@RequestMapping(value = "/plan_count", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> planCount(String startDay,String endDay) {

		
		int sum = 0;
		int monthCount = planService.planMonthCount(startDay,endDay);
	
	
		
		Map<String,Object> map = new HashMap();
		map.put("monthCount", monthCount);
		
		return map;
	}

	// 일정 조회(월 전체)
	@RequestMapping(value = "/plan_search", method = RequestMethod.POST)
	@ResponseBody
	public List<Plan>  planSelect(String startDay, String endDay) {
		
		List<Plan> list = planService.planSelect(startDay, endDay);
		
		return list;

	}

	// 일정 등록
	@RequestMapping(value = "/plan_enroll", method = RequestMethod.POST)
	public String planEnroll(Plan plan) {
		String msg = "";
		
		int result = planService.planInsert(plan);

		return "redirect:/calendar";
	}

	// 일정 수정
	@RequestMapping(value = "/plan_edit", method = RequestMethod.POST)	
	public String planUpdate(Plan plan) {
		String msg = "";
			
		int result = planService.planUpdate(plan);
		if (result != 0) {
			msg = "등록 되었습니다.";
		} else {
			msg = "등록에 실패하였습니다.";
		}

		return "redirect:/calendar";
	}

	// 일정 삭제
	@RequestMapping(value = "/plan_delete", method = RequestMethod.POST)
	@ResponseBody
	public String planDelete(int no) {

		String msg = "";
		int result = planService.planDelete(no);

		if (result != 0) {
			msg = "삭제 되었습니다.";
		} else {
			msg = "삭제를 실패하였습니다.";
		}

		return msg;
	}

	// 일정 상세보기
	@RequestMapping(value = "/plan_viewDetail", method = RequestMethod.POST)
	@ResponseBody
	public Plan planEnroll(int no) {

		Plan p = planService.planView(no);

		return p;
	}
	
	//일정 상태값 조회
	@RequestMapping(value = "/plan_state", method = RequestMethod.POST)
	@ResponseBody
	public int planState_Select(String subDay) {

		log.info("sub : {} ", subDay);
		int result = planService.planState(subDay);

		return result;
	}

}
