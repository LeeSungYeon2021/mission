package wemb.mission.plan.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

@Mapper
public interface PlanDao {

	int planInsert(Plan plan);
	List<Plan> planSelect(String fDay,String lDay);
	List<PlanCount> planCount(String subDay);
	Plan planView(int no);
	int planUpdate(Plan plan);
	int planDelete(int no);
	int planState(String replaceDay);
}
