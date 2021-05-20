package wemb.mission.plan.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plan {

	private int plan_seq_no;
	private Date plan_enroll_date;
	private String plan_start_date;
	private String plan_end_date;
	private Date plan_update_date;
	private String plan_title;
	private String plan_content;
	private String plan_state;			
	
}
