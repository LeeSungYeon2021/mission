package wemb.mission.plan.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wemb.mission.plan.dao.PlanDao;
import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCal;

@Service
public class PlanServiceImpl implements PlanService {

	@Autowired
	private PlanDao planDao;
	
	//일정등록
	@Override
	public int planInsert(Plan plan) {
		// TODO Auto-generated method stub
		return planDao.planInsert(plan);
	}

	//일정조회
	@Override
	public List<Plan> planSelect(String startDay,String endDay) {
		// TODO Auto-generated method stub
		return planDao.planSelect(startDay,endDay);
	}
	
	//월별 일정조회
	@Override
	public int planMonthCount(String startDay,String endDay) {
		// TODO Auto-generated method stub
		return planDao.planMonthCount(startDay,endDay);
	}
	
	//상세보기
	@Override
	public Plan planView(int no) {
		// TODO Auto-generated method stub
		return planDao.planView(no);
	}
	
	//일정수정
	@Override
	public int planUpdate(Plan plan) {
		// TODO Auto-generated method stub
		return planDao.planUpdate(plan);
	}
	
	//일정삭제
	@Override
	public int planDelete(int no) {
		// TODO Auto-generated method stub		
		return planDao.planDelete(no);
	}
	
	//일정상태조회
	@Override
	public List<Map<String, Object>> planState(String startDay,String endDay) {
		// TODO Auto-generated method stub
		return planDao.planState(startDay,endDay);
	}
	
	//일별 카운트 조회
	@Override
	public List<Map<String, Object>> planDayCount(String startDay, String endDay) {
		// TODO Auto-generated method stub
		return planDao.planDayCount(startDay,endDay);
	}
	
	//일별조회
	@Override
	public List<Plan> planDayList(String searchDay) {
		// TODO Auto-generated method stub
		return planDao.planDayList(searchDay);
	}

	@Override
	public List<PlanCal> planCal(String day) {
		// TODO Auto-generated method stub
		return planDao.planCal(day);
	}
	
	
}
