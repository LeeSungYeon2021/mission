package wemb.mission.plan.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PlanController {

	@RequestMapping(value = "/calendar")
	public ModelAndView calendar(ModelAndView mv) {
		int year = 2021;
		int month = 5;
		if((year % 4 == 0 && year % 100 != 0 ) || year % 400 ==0) {
			//2월 29일
			System.out.println("윤년");
		}else {
			//2월 28일
			System.out.println("평년");
		}
		
		List<int[]> list = new ArrayList();
		Calendar cal = Calendar.getInstance();
//		cal.set(cal.MONTH,5);
//		cal.set(cal.YEAR,2021);
		cal.set(Calendar.DAY_OF_MONTH,1); 
		int firstDay = cal.get(Calendar.DAY_OF_WEEK);
		int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH); 
		System.out.println(firstDay);
		System.out.println(lastDay);
		int[] day = new int[firstDay+lastDay];		
		int count = 1;
		for(int i=0;i<firstDay+lastDay;i++) {
			if(i < (firstDay - 1)) {
				day[i] = 0;				
			}else {
				if(count <= lastDay) {
					day[i] = count;
					count++;
				}				
			}
		}
		int test[] = new int[2];
		test[0] = 1;
		test[1] = 2;
		mv.setViewName("calendar");
		mv.addObject("dayList", day);
		mv.addObject("year", year);
		mv.addObject("month", month);
		
		return mv;
	}
	
}
