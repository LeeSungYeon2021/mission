package wemb.mission.plan.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanCal {
	private String current_yymm;
	private String sun;
	private String mon;
	private String the;
	private String wed;
	private String thu;
	private String fri;
	private String sat;
	
}
