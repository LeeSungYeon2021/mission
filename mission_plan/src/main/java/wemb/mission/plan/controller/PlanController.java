package wemb.mission.plan.controller;

import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import wemb.mission.plan.service.PlanService;
import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

@Controller
public class PlanController {

//	private final Logger log = LoggerFactory.getLogger(this.getClass());
//
//	@Autowired
//	private PlanService planService;
//
//	@RequestMapping(value = "/calendars")
//	public ModelAndView calendar(Model m, String year, String month) {
//
//		int parseYear = 0;
//		int parseMonth = 0;
//		Calendar cal = Calendar.getInstance();
//
//		if (year != null && month != null) {
//
//			parseYear = Integer.parseInt(year);
//			parseMonth = Integer.parseInt(month);
//			cal.set(Calendar.YEAR, parseYear);
//			cal.set(Calendar.MONTH, parseMonth - 1);
//
//		} else {
//			parseYear = cal.get(Calendar.YEAR);
//			parseMonth = cal.get(Calendar.MONTH) + 1;
//
//		}
//
//		if ((parseYear % 4 == 0 && parseYear % 100 != 0) || parseYear % 400 == 0) {
//			// 2월 29일
//			System.out.println("윤년");
//		} else {
//			// 2월 28일
//			System.out.println("평년");
//		}
//
//		cal.set(Calendar.DAY_OF_MONTH, 1);
//
//		int firstDay = cal.get(Calendar.DAY_OF_WEEK);
//		int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
//
//		int[] day = new int[firstDay + lastDay];
//		int count = 1;
//		for (int i = 0; i < firstDay + lastDay; i++) {
//			if (i < (firstDay - 1)) {
//				day[i] = 0;
//			} else {
//				if (count <= lastDay) {
//					day[i] = count;
//					count++;
//				}
//			}
//		}
//		String[] dataKey = new String[lastDay];
//		for (int i = 0; i < dataKey.length ; i++) {
//			if (parseMonth < 10 && i > 0) {
//				dataKey[i] = parseYear + "-0" + parseMonth;
//			}
//			if ( i < 10) {
//				log.info("들어옴?");
//				dataKey[i] += "-0" + (i+1);
//			} else {
//				dataKey[i] = parseYear + "-0" + parseMonth + "-" + (i+1);
//				
//			}
//		}
//
//		for (int i = 0; i < dataKey.length; i++) {
//			log.info("dataKey : {} ", dataKey[i]);
//		}
//		String fDay = parseYear + "-" + parseMonth + "-01";
//		String lDay = parseYear + "-" + parseMonth + "-" + lastDay;
//
//		List<Plan> list = planService.planSelect(fDay, lDay);
//		List<PlanCount> pc = planService.planCount("21/05");
//		for (Plan p : list) {
//			System.out.println("list : " + list);
//
//		}
//		ModelAndView mv = new ModelAndView();
//
//		mv.addObject("parseYear", parseYear);
//		mv.addObject("parseMonth", parseMonth);
//		mv.addObject("firstDay", firstDay);
//		mv.addObject("lastDay", lastDay);
//		mv.addObject("day", day);
//		mv.addObject("list", list);
//		mv.addObject("pc", pc);
//		mv.addObject("dataKey", dataKey);
//		mv.setViewName("calendar");
//
//		return mv;
//	}

}
