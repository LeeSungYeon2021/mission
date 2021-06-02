package wemb.mission.plan.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanCount {

	private String plan_start_date;
	private String plan_end_date;
	private int count;
	
}
