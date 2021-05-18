package wemb.mission.plan.service;

import java.util.List;

import wemb.mission.plan.vo.Plan;
import wemb.mission.plan.vo.PlanCount;

public interface PlanService {

	int planInsert(Plan plan);
	List<Plan> planSelect(String subDay);
	List<PlanCount> planCount(String subDay);
}
