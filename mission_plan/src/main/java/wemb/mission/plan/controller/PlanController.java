package wemb.mission.plan.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
		Map<String, Object> map = new HashMap();
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

		// 시작시간 Plus
		String startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
		// 끝시간 Plus
		String endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;

		// plan 데이터 대입
		plan.setPlan_start_date(startRe);
		plan.setPlan_end_date(endRe);

		try {

			int result = planService.planInsert(plan);

		} catch (Exception e) {
			log.info("등록 실패");
			// 등록실패 log
			log.error("enroll error : {} ", e.getMessage());
		}

		return "redirect:/calendar";
	}

	// 일정 수정
	@RequestMapping(value = "/plan_edit", method = RequestMethod.POST)
	public String planUpdate(Plan plan, String startTime, String endTime, ModelAndView mv) {

		// 시작시간 Plus
		String startRe = plan.getPlan_start_date().replaceAll("-", "") + " " + startTime;
		// 끝시간 Plus
		String endRe = plan.getPlan_end_date().replaceAll("-", "") + " " + endTime;

		// plan 데이터 대입
		plan.setPlan_start_date(startRe);
		plan.setPlan_end_date(endRe);

		try {

			int result = planService.planUpdate(plan);

			return "redirect:/calendar";

		} catch (Exception e) {
			// 수정실패 log
			log.error("update error : {} ", e.getMessage());

			return "redirect:/plan_error";
		}

	}

	// 일정 삭제
	@RequestMapping(value = "/plan_delete", method = RequestMethod.POST)
	@ResponseBody
	public String planDelete(int no) {

		String msg = "";
		int result = 0;
		System.out.println("try 밖");
		try {
			System.out.println("try");

			result = planService.planDelete(no);
//			if (result != 0) {
//				msg = "삭제 되었습니다.";
//				System.out.println("msg : " + msg);
//			} else {
//				msg = "삭제를 실패하였습니다.";
//				System.out.println("msg : " + msg);
//			}

		} catch (Exception e) {
			msg = "에러 입니다.";
			log.error("delete error : {} ", e.getMessage());
			System.out.println("msg : " + msg);
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

	// 일정 상태값 조회
	@RequestMapping(value = "/plan_state", method = RequestMethod.POST)
	@ResponseBody
	public int planStateSearch(String searchDay) {

		int result = planService.planState(searchDay);

		return result;
	}

	// 일별 일정 리스트 조회
	@RequestMapping(value = "/plan_dayList", method = RequestMethod.POST)
	@ResponseBody
	public List<Plan> planDayList(String searchDay) {

		List<Plan> list = new ArrayList();
		try {
			list = planService.planDayList(searchDay);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}
}
