package wemb.mission.plan.service;

import java.util.List;
import java.util.Map;

import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

public interface PlanService {

	//일정 등록
	int planInsert(Plan plan);
	//일정 조회
	List<Plan> planSelect(String startDay,String endDay);
	//월 일정 개수 조회
	int planMonthCount(String startDay,String endDay);
	//일별 일정 개수 조회
	List<Map<String, Object>> planDayCount(String startDay,String endDay);
	//일정 상세 조회
	Plan planView(int no);
	//일정 수정
	int planUpdate(Plan plan) ;
	//일정 삭제
	int planDelete(int no) ;
	//일정 중요도 카운트
	List<Map<String, Object>> planState(String searchDay,String startDay,String endDay);
	//일별 일정 리스트 조회
	List<Plan> planDayList(String searchDay);
}
