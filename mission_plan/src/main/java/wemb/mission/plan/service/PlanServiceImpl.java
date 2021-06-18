package wemb.mission.plan.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wemb.mission.plan.dao.PlanDao;
import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

@Service
public class PlanServiceImpl implements PlanService {

	@Autowired
	private PlanDao planDao;

	@Override
	public int planInsert(Plan plan) {
		// TODO Auto-generated method stub
		return planDao.planInsert(plan);
	}

	@Override
	public List<Plan> planSelect(String startDay,String endDay) {
		// TODO Auto-generated method stub
		return planDao.planSelect(startDay,endDay);
	}

	@Override
	public int planMonthCount(String startDay,String endDay) {
		// TODO Auto-generated method stub
		return planDao.planMonthCount(startDay,endDay);
	}

	@Override
	public Plan planView(int no) {
		// TODO Auto-generated method stub
		return planDao.planView(no);
	}

	@Override
	public int planUpdate(Plan plan) {
		// TODO Auto-generated method stub
		return planDao.planUpdate(plan);
	}

	@Override
	public int planDelete(int no) {
		// TODO Auto-generated method stub
		return planDao.planDelete(no);
	}

	@Override
	public int planState(String searchDay) {
		// TODO Auto-generated method stub
		return planDao.planState(searchDay);
	}

	@Override
	public List<Map<String, Object>> planDayCount(String startDay, String endDay) {
		// TODO Auto-generated method stub
		return planDao.planDayCount(startDay,endDay);
	}

	@Override
	public List<Plan> planDayList(String searchDay) {
		// TODO Auto-generated method stub
		return planDao.planDayList(searchDay);
	}
	
	
	
	
	
	
	
	
	
	
	
}
