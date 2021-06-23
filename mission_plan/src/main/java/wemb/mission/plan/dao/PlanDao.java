package wemb.mission.plan.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import wemb.mission.plan.vo.Plan;


@Mapper
public interface PlanDao {

	int planInsert(Plan plan);
	List<Plan> planSelect(String startDay,String endDay);
	int planMonthCount(String startDay,String endDay);
	Plan planView(int no);
	int planUpdate(Plan plan);
	int planDelete(int no);
	List<Map<String, Object>> planState(String searchDay,String startDay,String endDay);
	List<Map<String, Object>> planDayCount(String startDay, String endDay);
	List<Plan> planDayList(String searchDay);
}
