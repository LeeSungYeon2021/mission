/**
 * 
 */

$(function() {
	//날짜 구하는 함수
	$.createDate();
	//달력 table 구현
	$.createCalendar();
	//일정 조회 및 구현
	$.searchPlan();
	//일 및 월 개수 조회
	$.searchPlanCount();

});

//날짜 표시(td)
var g_count = 1;
//날짜 년월일 파싱(string)
var g_ISOStr;
//날짜
var g_date;
//현재년도
var g_currentYear;
//현재 월
var g_currentMonth;
//현재 일
var g_currentDay;
//오늘날짜
var g_today;
//달력 비교형 오늘 날짜
var g_today_sub;
//일정 중요도 조회 count
var g_stateCount = 0;
//매달 1일 요일
var g_firstDay;
//매달 마지막 날짜
var g_lastDay;

//조회 시작날짜 
var g_startDay;
//조회 마감날짜 
var g_endDay;
//등록modal 시간 처리
var g_currentTime;
/*
 *날짜 계산 함수 
 *
 */
$.createDate = function(changeDate) {

	if (changeDate != null) {
		g_date = new Date(changeDate);
		g_ISOStr =
			new Date(g_date.getTime() - g_date.getTimezoneOffset() * 60000).toISOString();
	}
	else {
		g_date = new Date();
		g_ISOStr = g_date.toISOString();
	}

	//현재년월일 재조합
	g_currentYear = g_ISOStr.substring(0, 4);
	g_currentMonth = g_ISOStr.substring(5, 7);
	g_currentDay = g_ISOStr.substring(8, 10);

	//오늘날짜 재조합
	let l_todayDate = new Date();
	g_today = l_todayDate.toISOString().substring(0, 10).replaceAll('-', '');
	g_today_sub = l_todayDate.toISOString().substring(0, 10);
	g_currentTime = new Date().getHours() + '00';

	//해당 월 1일 (요일)
	g_firstDay = new Date(g_date.getFullYear(), g_date.getMonth(), 1).getDay();
	//해달 월 말일 
	g_lastDay = new Date(g_currentYear, g_currentMonth, 0).getDate();

	//조회시 사용되는 변수 
	g_startDay = (g_ISOStr.substring(0, 8) + '01').replaceAll('-', '');
	g_endDay = (g_ISOStr.substring(0, 8) + g_lastDay).replaceAll('-', '');

	$("#currentYear").val(g_currentYear + '년');
	$("#currentMonth").val(g_currentMonth + '월');

}

/*
 *달력 tbl 생성
 *
 */
$.createCalendar = function() {

	//달력 테이블 초기화
	$("#tbl_plan tbody").children().remove();
	let l_dataDay;

	for (let i = 0; i < g_firstDay + g_lastDay; i++) {

		//매주 tr 생성
		if (i == 0 || i % 7 == 0) {
			var $tr = $("<tr>");
		}
		//전체 td 생성
		let $td = $("<td>");
		//td 공란채우기
		if (i < g_firstDay) {
			$td.addClass('tdEmpty_' + i);
		} else {

			//날짜 표출  input
			let $dayInput = $("<input>");
			$dayInput.attr({
				'class': 'inputDay',
				'type': 'text',
				'value': g_count,
			});

			//td 속성 부여
			if (g_count < 10) {

				l_dataDay = (g_ISOStr.substring(0, 7).replace('-', '')) + '0' + g_count;

			} else {
				l_dataDay = (g_ISOStr.substring(0, 7).replace('-', '')) + g_count;
			}
			$td.attr('data-day', l_dataDay);

			//전체 일정 개수 표출 input
			let $dayCountSpan = $("<span>");
			$dayCountSpan.attr({
				'class': 'dayCount',
				'readonly': 'true',
			});

			let $ul = $("<ul>");
			$ul.addClass('list-group ulDay');
			$td.addClass('tdDay_' + g_count);
			$td.append($dayInput);
			$td.append($dayCountSpan);
			$td.append($ul);
			g_count++;
		}

		//날짜 카운트 초기화
		if (g_count > g_lastDay) {
			g_count = 1;
		}

		$tr.append($td);
		$("#tbl_plan tbody").append($tr);

		//오늘날짜 css 
		$.each($("td"), function() {
			if ($(this).data('day') == g_today) {
				$(this).css('border', '2px solid orange');
			}
		})
	}
}

/*
 *일별,달별 
 *일정 개수 조회
 */
$.searchPlanCount = function() {

	//일별 카운트 초기화
	$(".dayCount").html('');


	$.ajax({
		url: '/plan_count',
		datatype: 'json',
		method: 'post',
		data: { startDay: g_startDay, endDay: g_endDay },
		success: function(data) {

			for (let i = 0; i < (data.length - 1); i++) {

				$.each($("td"), function() {
					if (data[i].DAYS == $(this).data('day')) {
						if (data[i].CONTENT_COUNT >= 3) {
							$(this).find('span').css({
								'color': 'red',
								'font-weight': 'bold'
							});

						} else {
							$(this).find('span').css({
								'color': 'black',
								'font-weight': ''
							});
						}
						$(this).find('span').html(data[i].CONTENT_COUNT + '개');
					}
				});
			}
			if (data[data.length - 1].monthCount != 0) {
				$("#plan_monthCount").html('전체일정 (' + data[data.length - 1].monthCount + '개)');
			} else {
				$("#plan_monthCount").html('전체일정 (없음)');
			}
		}

	});
}

/*
 * 현재 날짜 
 * 일정 전체 조회 
 */
$.searchPlan = function() {

	$("#tbl_plan tbody").children().children().children().children().remove();

	$.ajax({
		url: '/plan_search',
		datatype: 'json',
		method: 'post',
		data: { startDay: g_startDay, endDay: g_endDay },
		success: function(data) {
			console.log('data', data);
			if (data.length == 0) {
				/*alert('조회된 일정이 없습니다.');*/
			} else {

				for (let i = 0; i < data.length; i++) {

					let l_startDate = data[i].plan_start_date.substring(0, 8);
					let l_endDate = data[i].plan_end_date.substring(0, 8);

					let l_subStartM = data[i].plan_start_date.substring(4, 6).replaceAll("0", "");
					let l_subStartD = data[i].plan_start_date.substring(6, 8).replaceAll("0", "");
					let l_reStartDay = [l_subStartM, l_subStartD].join('/');

					let l_subEndM = data[i].plan_end_date.substring(4, 6).replaceAll("0", "");
					let l_subEndD = data[i].plan_end_date.substring(6, 8).replaceAll("0", "");
					let l_reEndDay = [l_subEndM, l_subEndD].join('/');

					let $li_dayList = $("<li></li>");

					$li_dayList.attr('data-no', data[i].plan_no);


					//이전날짜 처리
					if (data[i].days < g_today) {

						$li_dayList.addClass('pass_plan');

					}

					if (l_startDate != l_endDate) {
						$li_dayList.append(data[i].plan_title + '(' + l_reStartDay + '~' + l_reEndDay + ')');

					} else {
						$li_dayList.append(data[i].plan_title);
					}

					//일반 - 중요 체크
					if ((data[i].plan_state).trim() === 'Y') {

						$li_dayList.append(data[i].plan_title).addClass('plan_title plan_state_Y list-group-item');
					} else {

						$li_dayList.addClass('plan_title plan_state_N list-group-item');
					}


					$li_dayList.attr({
						'data-toggle': 'tooltip',
						'data-placement': 'right',
						'title': data[i].plan_title + '(' + l_reStartDay + '~' + l_reEndDay + ')'
					});
					$.each($("td"), function() {

						let l_reDataDay = $(this).data('day');

						if (l_reDataDay == data[i].days) {
							if (data[i].day_rank <= 4) {

								if ((data[i].plan_state).trim() === 'Y') {
									$(this).find('ul').prepend($li_dayList);
								} else {
									$(this).find('ul').append($li_dayList);
								}
							}
						}
					});
				}
			}
		}
	});
}

/*
 * 이전달 버튼
 * 
 */
$("#prevBtn").on('click', function() {

	if (g_currentMonth == 1) {
		g_currentMonth = 13;
		g_currentYear -= 1;
	}
	let l_prevDate = [g_currentYear, parseInt(g_currentMonth) - 1].join(',');

	$.createDate(l_prevDate);
	$.createCalendar();
	$.searchPlan();
	$.searchPlanCount();
});

/*
 * 다음달 버튼
 * 
 */
$("#nextBtn").on('click', function() {

	if (g_currentMonth == 12) {
		g_currentMonth = 0;
		g_currentYear = parseInt(g_currentYear) + 1;
	}

	let l_nextDate = [g_currentYear, parseInt(g_currentMonth) + 1].join(',');

	$.createDate(l_nextDate);
	$.createCalendar();
	$.searchPlan();
	$.searchPlanCount();
});

/*
 * 일정 등록 modal
 * 
 */
$(document).on('click', '.inputDay', function(e) {

	let l_targetVal = $(e.target).parent().data('day');
	$.ajax({
		url: '/plan_state',
		data: { searchDay: l_targetVal },
		type: 'post',
		success: function(data) {
			g_stateCount = data;
		}
	})

	//
	if (l_targetVal < g_today) {
		alert('지난 요일은 등록할 수 없습니다.');
	} else {

		$("#enrollBtn").show();
		$("#editViewBtn").hide();
		$("#delBtn").hide();
		$("#editEndBtn").hide();
		$("#plan_modal .modal-title").html('일정 등록');
		$("#plan_start_date").empty().removeAttr('disabled', 'false');
		$("#plan_end_date").val('').removeAttr('disabled', 'false');
		$("#plan_start_time").prop('selected', 'false').removeAttr('disabled', 'false');
		$("#plan_end_time").prop('selected', 'false').removeAttr('disabled', 'false');
		$("#plan_title").val('').removeAttr('disabled', 'false');
		$("#plan_state_N").prop('checked', false).removeAttr('disabled', 'false');
		$("#plan_state_Y").prop('checked', false).removeAttr('disabled', 'false');
		$("#plan_content").val('').removeAttr('disabled', 'false');
		$("#plan_modal").modal('show');
		$('.modal-backdrop').remove();
		$('#plan_modal').draggable({ handle: "#plan_modal_header" });
	}

	//현재 날짜 입력	

	let l_fmtString = String(l_targetVal);
	$("#plan_start_date").val([l_fmtString.substring(0, 4), l_fmtString.substring(4, 6), l_fmtString.substring(6, 8)].join('-'));
});


/*
 * 일정 상태값 변경 시 
 * 적용 함수 
 */
$("#plan_state_Y").click(function() {

	if (g_stateCount >= 1) {
		$("#plan_state_N").prop('checked', true);
		alert('일반 일정만 등록이 가능합니다.');
	}
});


/*
 * 일정 상세보기
 */
$(document).on('click', '.plan_title', function(e) {
	let l_searchNo = $(e.target).data('no');
	let l_selectDay = $(e.target).parent().parent().data('day');

	$.ajax({
		url: '/plan_viewDetail',
		type: 'post',
		data: { no: l_searchNo },
		success: function(data) {

			//시작일 재조합
			let l_reStart_year = data.plan_start_date.substring(0, 4);
			let l_reStart_month = data.plan_start_date.substring(4, 6);
			let l_reStart_day = data.plan_start_date.substring(6, 8);
			let l_reStart_date = [l_reStart_year, l_reStart_month, l_reStart_day].join('-');

			////마감일 재조합
			let l_reEnd_year = data.plan_end_date.substring(0, 4);
			let l_reEnd_month = data.plan_end_date.substring(4, 6);
			let l_reEnd_day = data.plan_end_date.substring(6, 8);
			let l_reEnd_date = [l_reEnd_year, l_reEnd_month, l_reEnd_day].join('-');

			//시작시간 재조합
			let l_reStartTime = data.plan_start_date.substring(9, 13);

			//마감시간 재조합
			let l_reEndTime = data.plan_end_date.substring(9, 13);

			$("#plan_modal .modal-title").html('일정 상세보기');
			if (data.plan_state == 'Y') {

				$("#plan_state_Y").prop('checked', true);
			} else {
				$("#plan_state_N").prop('checked', true);
			}

			$("#plan_start_date").val(l_reStart_date).attr('disabled', 'true');
			$("#plan_end_date").val(l_reEnd_date).attr('disabled', 'true');
			$("#plan_start_time").val(l_reStartTime).prop('selected', 'true').attr('disabled', 'true').css('background-color', 'white');
			$("#plan_end_time").val(l_reEndTime).prop('selected', 'true').attr('disabled', 'true').css('background-color', 'white');
			$(".plan_state").attr('disabled', 'true');
			$("#plan_title").val(data.plan_title).attr('disabled', 'true');
			$("#plan_content").html(data.plan_content).attr('disabled', 'true');
			$("#enrollBtn").hide();
			$("#editEndBtn").hide();
			$("#editViewBtn").show();
			$("#delBtn").show();
			$("#plan_modal").modal('show');
			$("#plan_title").attr({
				'data-no': l_searchNo,
				'data-day': l_selectDay
			});
			$('.modal-backdrop').remove();
			$('#plan_modal').draggable({ handle: "#plan_modal_header" });

		}
	})
});

/*
 * 일정 수정 modal 
 * 
 */
$("#editViewBtn").click(function() {

	$.ajax({
		url: '/plan_state',
		data: { searchDay: $("#plan_title").data('day') },
		type: 'post',
		success: function(data) {
			g_stateCount = data;
		}
	});

	$("#plan_form").attr('action', '/plan_edit');
	$("#plan_modal .modal-title").html('일정 수정');
	$(".plan_state").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_start_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_end_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_start_time").prop('selected', 'false').removeAttr('disabled', 'true');
	$("#plan_end_time").prop('selected', 'false').removeAttr('disabled', 'true');
	$("#plan_title").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_content").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#enrollBtn").hide();
	$("#editEndBtn").show();
	$("#editViewBtn").hide();
	$("#delBtn").hide();
	$("#plan_modal").modal('show');
	$('.modal-backdrop').remove();
	$('#plan_modal').draggable({ handle: "#plan_modal_header" });
	$("#plan_no").val($("#plan_title").data('no'));

})

/*
 * 일정 삭제
 * 
 */
$("#delBtn").click(function() {
	console.log('type',typeof($("#plan_title").attr('data-no')));
	if (!confirm('삭제 하시겠습니까?')) {
		return false;
	} else {
		$.ajax({
			url: '/plan_delete',
			type: 'post',
			/*data: { no: $("#plan_title").attr('data-no') },*/
			data: { no: ' ' },
			success: function(data) {

				if (data.trim() == '삭제 되었습니다.') {
					alert(data);
					$("#plan_modal").modal('hide');
				} else {
					alert(data);
				}

				$.searchPlan();
				$.searchPlanCount();
			}
		})
	}
});

/*
 * 전체 일정 보기
 * 
 */
$("#plan_monthCount").click(function() {

	$("#planList_body").children().remove();

	let l_subYear = $("#currentYear").val().substring(0, 4);
	let l_subMonth = $("#currentMonth").val().substring(0, 2);
	let l_subDate = [l_subYear, l_subMonth].join('.');

	$.ajax({
		url: '/plan_search',
		datatype: 'json',
		method: 'post',
		data: { startDay: g_startDay, endDay: g_endDay },
		success: function(data) {

			if (data.length == 0) {

				let $nullSpan = $("<span>").html('조회된 일정이 없습니다.');
				$("#planList_body").append($nullSpan);
			}
			else {

				let $listUl = $("<ul class='list-group'></ul>");

				for (let i = 0; i < data.length; i++) {

					let l_subStartM = data[i].plan_start_date.substring(4, 6).replaceAll("0", "");
					let l_subStartD = data[i].plan_start_date.substring(6, 8).replaceAll("0", "");
					let l_reStartDay = [l_subStartM, l_subStartD].join('/');

					let l_subEndM = data[i].plan_end_date.substring(4, 6).replaceAll("0", "");
					let l_subEndD = data[i].plan_end_date.substring(6, 8).replaceAll("0", "");
					let l_reEndDay = [l_subEndM, l_subEndD].join('/');
					let $listDate = $("<li class='list-group-item'></li>");

					if (data[i].plan_start_date != data[i].plan_end_date) {

						$listDate.html(data[i].plan_title + '(' + l_reStartDay + '~' + l_reEndDay + ')');
					} else {
						$listDate.html(data[i].plan_title);
					}

					if ((data[i].plan_state).trim() === 'Y') {
						$listDate.addClass('plan_state_Y list-group-item');

					} else {
						$listDate.addClass('plan_state_N list-group-item');
					}

					//이전날짜 처리
					if (data[i].plan_end_date < g_today) {
						$listDate.addClass('pass_plan');
					}
					$listUl.append($listDate);
				}

				$("#planList_body").append($listUl);
			}
			$("#planList_modal #planList_header").find('h5').html(l_subDate);;
			$("#planList_modal").modal('show');
			$('#planList_modal').draggable({ handle: "#planList_header" });
		}

	});
})

/*
 * 시작일 - 이전 날짜 처리
 * 
 */
$("#plan_start_date").change(function() {

	if ($("#plan_start_date").val().trim() < g_today_sub) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_start_date").val(g_today_sub);
	}
})

/*
 * 마감일 - 이전 날짜 처리
 *  
 */
$("#plan_end_date").change(function() {

	if ($("#plan_end_date").val().trim() < g_today_sub) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_end_date").val(g_today_sub);
	}

	if ($("#plan_end_date").val() < $("#plan_start_date").val()) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_end_date").val($("#plan_start_date").val());
	}
});

/*
 * 일별 리스트
 * 
 */
$(document).on('click', '.dayCount', function(e) {

	let l_searchDay = $(e.target).parent().data('day');
	$("#planList_body").children().remove();

	$.ajax({
		url: '/plan_dayList',
		data: { searchDay: l_searchDay },
		type: 'POST',
		success: function(data) {

			let $listTbl = $("<table class='table' id='tbl_dayList'>");

			let l_parseStr = l_searchDay.toString();
			let l_year = l_parseStr.substring(0, 4);
			let l_month = l_parseStr.substring(4, 6);
			let l_day = l_parseStr.substring(6, 8);
			let l_full = [l_year, l_month, l_day].join('.');

			for (let i = 0; i < data.length; i++) {

				//날짜 및 시간 비교 
				let l_subSd = data[i].plan_start_date.substring(0, 8);
				let l_subEd = data[i].plan_end_date.substring(0, 8);
				let l_subSt = data[i].plan_start_date.substring(9, 11);
				let l_subEt = data[i].plan_end_date.substring(9, 11);

				//테이블 관련 생성 
				let $tr = $("<tr>");
				let $tdTime;
				let $tdTitle = $("<td>");

				//시간 ox 처리
				if (l_subSt == '00' || l_subEt == '00') {
					l_subSt = '';
					l_subEt = '';
					$tdTime = $("<td>");
				} else {
					l_subSt += '시';
					l_subEt += '시';
					$tdTime = $("<td style='width:140px;'>");
				}

				if (data[i].plan_state == 'Y') {
					$tdTitle.attr('class', 'plan_state_Y');
				}

				if (l_searchDay < g_today) {
					$tdTitle.attr('class', 'pass_plan');
				}


				if (l_searchDay == l_subSd) {
					$tdTime.append(l_subSt);
					$tdTitle.append(data[i].plan_title);
					$tr.append($tdTime).append($tdTitle);
				} else if (l_searchDay == l_subEd) {
					$tdTime.append(l_subEt);
					$tdTitle.append(data[i].plan_title);
					$tr.append($tdTime).append($tdTitle);
				}

				$listTbl.append($tr);
				$("#planList_body").append($listTbl);
				$("#planList_modal #planList_header").find('h5').html(l_full);

				$('#planList_modal').draggable({ handle: "#planList_header" });
				$("#planList_modal").modal('show');
			}
		}
	});
})

/*
 * 등록,수정 modal 유효성 검사
 * 
 */
$("#plan_form").submit(

	function(e) {

		if ($("input[name=plan_state]:checked").length == 0) {
			alert('일정 구분을 선택해주세요.');
			return false;
		}
		else if ($("#plan_title").val().trim() == '') {
			alert('제목을 입력해주세요');
			$("#plan_title").focus();
			return false;
		}
		else if ($("#plan_start_date").val().trim() == '') {
			alert('시작일을 입력해주세요.');
			$("#plan_start_date").focus();
			return false;
		} else if (g_currentTime.trim() > $("#plan_start_time").val()) {
			alert('지난 시간은 지정 할 수 없습니다.');
			$("#plan_start_time").val(g_currentTime).prop('selected', 'true');
			return false;
		}
		else if ($("#plan_end_date").val().trim() == '') {
			alert('마감일을 입력해주세요');
			$("#plan_end_date").focus();
			return false;
		} else {
			return true;
		}
	}

)

/*
 * 글자수 50자 제한
 *
 */
$("#plan_content").keyup(function() {
	$("#fontLength").html("(" + $(this).val().length + "/50)");
	if ($(this).val().length >= 50) {
		alert('50글자 까지 입력가능합니다.');
		$(this).val($(this).val().substring(0, 50));
		$("#fontLength").html("(50/50)");
	}
});

$(document).on('mouseover', '.plan_title', function() {
	$(this).css('cursor', 'pointer');
	$(this).tooltip();
});

$(document).on('mouseenter', '.dayCount', function() {
	$(this).css('cursor', 'pointer');
});

$(document).on('mouseenter', '.inputDay', function() {
	$(this).css('cursor', 'pointer')
});

$(document).on('mouseenter', '#plan_monthCount', function() {
	$(this).css('cursor', 'pointer');
});
