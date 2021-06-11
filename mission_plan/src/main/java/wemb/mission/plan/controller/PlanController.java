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

@Controller
public class PlanController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private PlanService planService;

	@RequestMapping(value = "/calendar")
	public String calendar() {

		return "/calendar/calendar";
	}

	// 일정 카운트
	@RequestMapping(value = "/plan_count", method = RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> planCount(String startDay, String endDay) {

		int monthCount = planService.planMonthCount(startDay, endDay);
		List<Map<String, Object>> list = planService.planDayCount(startDay, endDay);		
		Map<String,Object> map = new HashMap();
		map.put("monthCount", monthCount);
		list.add(map);
		
		return list;
	}

	// 일정 조회(월 전체)
	@RequestMapping(value = "/plan_search", method = RequestMethod.POST)
	@ResponseBody
	public List<Plan> planSelect(String startDay, String endDay) {

		List<Plan> list = planService.planSelect(startDay, endDay);

		return list;

	}

	// 일정 등록
	@RequestMapping(value = "/plan_enroll", method = RequestMethod.POST)
	public String planEnroll(Plan plan, String startTime, String endTime) {

		String msg = "";
		
		try {
		// 시작시간 Plus
		String startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
		// 끝시간 Plus
		String endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;

		// plan 데이터 대입
		plan.setPlan_start_date(startRe);
		plan.setPlan_end_date(endRe);
		
		int result = planService.planInsert(plan);
		}catch(Exception e) {
			log.info("등록 실패");
			//등록실패 log
			e.printStackTrace();
		}

		return "redirect:/calendar";
	}

	// 일정 수정
	@RequestMapping(value = "/plan_edit", method = RequestMethod.POST)
	public String planUpdate(Plan plan, String startTime, String endTime) {

		int result = 0;
		try {

			// 시작시간 Plus
			String startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
			// 끝시간 Plus
			String endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;

			// plan 데이터 대입
			plan.setPlan_start_date(startRe);
			plan.setPlan_end_date(endRe);

			result = planService.planUpdate(plan);
		} catch (Exception e) {
			log.info("update Failed");
			//수정실패 log
			e.printStackTrace();
		}

		return "redirect:/calendar";
	}

	// 일정 삭제
	@RequestMapping(value = "/plan_delete", method = RequestMethod.POST)
	@ResponseBody
	public String planDelete(int no) {
		int result = 0;
		String msg = "";
		try {
			result = planService.planDelete(no);
			return  "삭제 되었습니다.";
		} catch (Exception e) {
			log.info("delete Failed");
			//삭제실패 log
			e.printStackTrace();
			return  "삭제를 실패하였습니다.";
		}		
	}

	// 일정 상세보기
	@RequestMapping(value = "/plan_viewDetail", method = RequestMethod.POST)
	@ResponseBody
	public Plan planEnroll(int no) {

		Plan p = planService.planView(no);

		return p;
	}

	// 일정 상태값 조회
	@RequestMapping(value = "/plan_state", method = RequestMethod.POST)
	@ResponseBody
	public int planState_Select(String searchDay) {

		int result = planService.planState(searchDay);

		return result;
	}
}
