package wemb.mission.plan.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plan {

	private int plan_no;
	private String plan_enrollDate;
	private String plan_startDate;
	private String plan_endDate;
	private String plan_updateDate;
	private String plan_title;
	private String plan_content;
	private String plan_select;			
	
}
