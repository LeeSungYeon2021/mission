package wemb.mission.plan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import wemb.mission.plan.service.PlanService;
import wemb.mission.plan.vo.Plan;

@Controller
public class PlanController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private PlanService planService;
	
	@RequestMapping(value = "/idx")
	public String index() {

		return "/index";
	}
	
	@RequestMapping(value = "/calendar")
	public String calendar(String msg) {

		return "/calendar/calendar";
	}

	// 일별,달별 카운트
	@RequestMapping(value = "/plan_count", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<List<Map<String, Object>>> planCount(String startDay, String endDay) {
		
		int monthCount = 0;
		List<Map<String, Object>> list = null;
		Map<String, Object> map = new HashMap();
		try {
			monthCount = planService.planMonthCount(startDay, endDay);
			list = planService.planDayCount(startDay, endDay);
			
			if(list.size() != 0 && monthCount != 0) {
				map.put("monthCount", monthCount);
				list.add(map);
			}
			
			return new ResponseEntity<List<Map<String, Object>>>(list,HttpStatus.OK);
		}catch(Exception e) {
			log.error("count error : {} ", e.getMessage());
			return new ResponseEntity<List<Map<String, Object>>>(list,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 일정 조회(월 전체)
	@RequestMapping(value = "/plan_search", method = RequestMethod.POST)
	public ResponseEntity<List<Plan>> planSelect(String startDay, String endDay) {

		List<Plan> list = null;
		try {
			list = planService.planSelect(startDay, endDay);

			return new ResponseEntity<List<Plan>>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("search error : {} ", e.getMessage());
			return new ResponseEntity<List<Plan>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 일정 등록
	@RequestMapping(value = "/plan_enroll", method = RequestMethod.POST)
	public String planEnroll(Plan plan, String startTime, String endTime, String timeChk,
			RedirectAttributes redirectAttr) {

		// 시작시간 Plus
		String startRe = "";
		// 끝시간 Plus
		String endRe = "";

		if (timeChk != null) {
			startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + timeChk;
			endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + timeChk;
		} else {
			startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
			endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;
		}

		// plan 데이터 대입
		plan.setPlan_start_date(startRe);
		plan.setPlan_end_date(endRe);

		try {

			int result = planService.planInsert(plan);
			if (result <= 0) {
				throw new Exception("enroll result = 0 예외처리");
			} else {				
				redirectAttr.addFlashAttribute("msg", "enrollsuccess");
			}

		} catch (Exception e) {
			// 등록실패 log
			log.error("error : {} ", e.getMessage());
			redirectAttr.addFlashAttribute("msg", "enrollfail");
		}

		return "redirect:/calendar";
	}

	// 일정 수정
	@RequestMapping(value = "/plan_edit", method = RequestMethod.POST)
	public String planUpdate(Plan plan, String startTime, String endTime,String timeChk, RedirectAttributes redirectAttr) {


		// 시작시간 Plus
		String startRe = "";
		// 끝시간 Plus
		String endRe = "";

		if (timeChk != null) {
			startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + timeChk;
			endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + timeChk;
		} else {
			startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
			endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;
		}

		// plan 데이터 대입
		plan.setPlan_start_date(startRe);
		plan.setPlan_end_date(endRe);

		try {

			int result = planService.planUpdate(plan);
			if (result <= 0) {
				throw new Exception("update result = 0 예외처리");
			} else {
				
				redirectAttr.addFlashAttribute("msg", "updatesuccess");
			}

		} catch (Exception e) {
			// 수정실패 log
			log.error("error : {} ", e.getMessage());
			redirectAttr.addFlashAttribute("msg", "updatefail");
		}
		return "redirect:/calendar";
	}

	// 일정 삭제
	@RequestMapping(value = "/plan_delete", method = RequestMethod.POST)
	public ResponseEntity<String> planDelete(int no) {

		int result = 0;
		try {

			result = planService.planDelete(no);

			if (result <= 0) {
				throw new Exception("delete result = 0 예외처리");
			} else {

				return new ResponseEntity<String>("OK", HttpStatus.OK);
			}

		} catch (Exception e) {

			log.error("error : {} ", e.getMessage());
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// 일정 상세보기
	@RequestMapping(value = "/plan_viewDetail", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Plan> planEnroll(int no) {
		Plan plan = null;
		try {
			plan = planService.planView(no);			
			return new ResponseEntity<Plan>(plan, HttpStatus.OK);
		} catch (Exception e) {
			log.error("viewDetail error : {} ",e.getMessage());
			return new ResponseEntity<Plan>(plan, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 일정 상태값 조회
	@RequestMapping(value = "/plan_state", method = RequestMethod.POST)
	public ResponseEntity<Integer> planStateSearch(String searchDay) {

		int result = 0;

		try {
			result = planService.planState(searchDay);

			return new ResponseEntity<Integer>(result, HttpStatus.OK);

		} catch (Exception e) {
			log.error("state count error : {} ", e.getMessage());
			return new ResponseEntity<Integer>(result, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 일별 일정 리스트 조회
	@RequestMapping(value = "/plan_dayList", method = RequestMethod.POST)
	public ResponseEntity<List<Plan>> planDayList(String searchDay) {

		List<Plan> list = null;
		try {
			list = planService.planDayList(searchDay);

			return new ResponseEntity<List<Plan>>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("day list error : {} ", e.getMessage());
			return new ResponseEntity<List<Plan>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
