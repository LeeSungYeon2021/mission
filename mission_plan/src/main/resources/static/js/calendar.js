/*
 *
 *
 */
//페이지 로드
$(function() {
	//날짜 구하는 함수
	$.createDate();
	//달력 table 구현
	/*$.createCalendar();*/
	//일정 조회 및 구현
	$.searchPlan();
	//일 및 월 개수 조회
	$.searchPlanCount();
	//에러 alert 처리
	$.errorCode();
	//글자수 체크 
	$.saveByte();
	//상태값 체크
	/*$.saveState();*/
	$.searchState();	
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
//제목,내용 글자수 체크용
var g_titleCnt = 0;
var g_contentCnt = 0;
var g_sDay;
var g_eDay;
//중요일정 상태 체크용
var g_flag = false;
var arr_state = [];

$.searchState = function() {
	$.ajax({
		url: '/plan_state',
		data: { startDay: g_startDay, endDay: g_endDay },
		type: 'post',
		success: function(data) {

			for (let i = 0; i < data.length; i++) {
				arr_state[i] = {
					day: data[i].DAYS,
					cnt: data[i].STATE_COUNT
				}

			}

		},
		error: function(req) {
			if (req.status == 500) {
				alert('상태값 조회실패!');
			}
		}
	});
}

$.saveByte = function(str) {
	let sss = $("#plan_end_date").val();

	let byteCnt = 0;
	if (str != null) {
		for (let i = 0; i < str.length; i++) {
			if (escape(str.charAt(i)).length == 1) {
				byteCnt++;
			} else if (escape(str.charAt(i)).indexOf("%u") != -1) {
				byteCnt += 3;
			}
			else if (escape(str.charAt(i)).indexOf("%") != -1) {
				byteCnt++;
			}
		}
		return byteCnt;
	}
}

/*
 *등록,수정 - 성공/실패 alert처리
 *
 */
$.errorCode = function() {

	let l_msg = $("#error_code").val();

	switch (l_msg) {
		case 'enrollsuccess': swal('ENROLL SUCCESS ', '등록 성공!', 'success'); $("#error_code").val('');
			break;
		case 'updatesuccess': swal('UPDATE SUCCESS', '수정 성공!', 'success'); $("#error_code").val('');
			break;
		case 'enrollfail': swal('ENROLL FAIL ', '등록 실패!', 'error'); $("#error_code").val('');
			break;
		case 'updatefail': swal('UPDATE FAIL', '수정 실패!', 'error'); $("#error_code").val('');
			break;
	}
}
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
	console.log('g_today',g_today);

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
		let $td = $("<td>").css({
			'width': '150px',
			'word-break': 'break-all',
			'padding': '0',
		});
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
				'readonly': 'true'
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

		//tbl 최종생성
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
			console.log('count', data);
			for (let i = 0; i < (data.length - 1); i++) {

				$.each($("td"), function() {

					//td와 날짜비교
					if (data[i].DAYS == $(this).data('day')) {

						//일별 3개이상 시 color 처리
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

			//전체 일정 span 분기처리
			if (data[data.length - 1].monthCount != 0) {
				$("#plan_monthCount").html('전체일정 (' + data[data.length - 1].monthCount + '개)');
			} else {
				$("#plan_monthCount").html('전체일정 (없음)');
			}
		}, error: function(req) {

			if (req.status == 500) {
				swal('SERVER ERROR ', '조회 실패!', 'error');
			}

		}

	});
}

/*
 * 현재 날짜 
 * 일정 전체 조회 
 */
$.searchPlan = function() {

	//tbl 초기화
	$("#tbl_plan tbody").children().children().children().children().remove();

	//한달 전체 일정 조회
	$.ajax({
		url: '/plan_search',
		datatype: 'json',
		method: 'post',
		data: { startDay: g_startDay, endDay: g_endDay },
		success: function(data) {

			if (data.length == 0) {
				/*swal('', '조회 된 일정이 없습니다.', 'info');*/
			} else {

				for (let i = 0; i < data.length; i++) {

					//시작,마감 날짜 substr
					let l_startDate = data[i].plan_start_date.substring(0, 8);
					let l_endDate = data[i].plan_end_date.substring(0, 8);


					//시작,마감 - 월,일 재조합
					let l_subStartM = data[i].plan_start_date.substring(4, 6).replaceAll("0", "");
					let l_subStartD = data[i].plan_start_date.substring(6, 8).replaceAll("0", "");
					let l_reStartDay = [l_subStartM, l_subStartD].join('/');

					let l_subEndM = data[i].plan_end_date.substring(4, 6).replaceAll("0", "");
					let l_subEndD = data[i].plan_end_date.substring(6, 8).replaceAll("0", "");
					let l_reEndDay = [l_subEndM, l_subEndD].join('/');

					let $li_dayList = $("<li></li>");
					//data속성부여(기본키값)
					$li_dayList.attr('data-no', data[i].plan_no);


					//이전날짜 처리
					if (data[i].days < g_today) {

						$li_dayList.addClass('pass_plan');

					}

					//하루 일정 아닐 시 중복처리
					if (l_startDate != l_endDate) {
						$li_dayList.append(data[i].plan_title + '(' + l_reStartDay + '~' + l_reEndDay + ')');

					} else {

						$li_dayList.append(data[i].plan_title);
					}

					//일반 - 중요 체크
					if ((data[i].plan_state).trim() === 'Y') {

						$li_dayList.addClass('plan_title plan_state_Y list-group-item');
					} else {

						$li_dayList.addClass('plan_title plan_state_N list-group-item');
					}

					//일정제목 tooltip 생성
					$li_dayList.attr({
						'data-toggle': 'tooltip',
						'data-placement': 'right',
						'title': data[i].plan_title + '(' + l_reStartDay + '~' + l_reEndDay + ')'
					});

					$.each($("td"), function() {

						let l_reDataDay = $(this).data('day');

						//td 날짜비교
						if (l_reDataDay == data[i].days) {

							//일별 4개 표출 처리
							if (data[i].day_rank <= 4) {

								//상태값 분기처리
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
		},
		error: function(req) {
			if (req.status == '500') {
				swal('SERVER ERROR ', '조회 실패!', 'error');
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
	console.log('modalStatus', $("#modalVal").val());
	//오늘자 기준 처리
	if (l_targetVal < g_today) {
		swal('', '지난 요일은 등록 할 수 없습니다.', 'warning');
	} else {

		$("#plan_start_date").empty().removeAttr('disabled', 'false');
		$("#plan_end_date").val('').removeAttr('disabled', 'false');

		$("#plan_start_time").removeAttr('disabled', 'false').val(g_currentTime).prop('selected', 'true');
		$("#plan_end_time").removeAttr('disabled', 'false').val(g_currentTime).prop('selected', 'true');
		$("#plan_start_time").show();
		$("#plan_end_time").show();

		$("#enrollBtn").show();

		$("#delBtn").hide();
		$("#editViewBtn").hide();
		$("#editEndBtn").hide();

		$(".timeCheked").hide();
		$("#timeChk").prop('checked', false);
		$(".timeChk").show();

		$("#plan_title").val('').removeAttr('disabled', 'false');

		$("#plan_state_N").prop('checked', false).removeAttr('disabled', 'false');
		$("#plan_state_Y").prop('checked', false).removeAttr('disabled', 'false');

		$("#plan_modal .modal-title").html('일정 등록');
		$("#plan_content").val('').removeAttr('disabled', 'false');
		$("#modalStatus").val('e');
		$("#plan_modal").modal('show');
		$('.modal-backdrop').remove();
		/*$('#plan_modal').draggable({ handle: "#plan_modal_header" });*/
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
	console.log('스테이트', g_stateCount);
	if (g_stateCount >= 1) {

		/*$("#plan_state_N").prop('checked', true);
		swal('', '일반 일정만 등록이 가능합니다.', 'warning');*/
	}
});


/*
 * 일정 상세보기
 */
$(document).on('click', '.plan_title', function(e) {
	let l_searchNo = $(e.target).data('no');
	let l_selectDay = $(e.target).parent().parent().data('day');

	//해당일정 조회
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

			//상태값 chk 처리
			if (data.plan_state == 'Y') {
				$("#plan_state_Y").prop('checked', true);
			} else {
				$("#plan_state_N").prop('checked', true);
			}

			$("#plan_start_date").val(l_reStart_date).attr('disabled', 'true');
			$("#plan_end_date").val(l_reEnd_date).attr('disabled', 'true');

			//일정 시간 존재여부 처리
			if (l_reStartTime == '0001' || l_reEndTime == '0001') {
				$("#plan_start_time").hide();
				$("#plan_end_time").hide();
				$(".timeChk").hide();
				$(".timeCheked").show();
			} else {
				$("#plan_start_time").val(l_reStartTime).prop('selected', 'true').attr('disabled', 'true').css('background-color', 'white');
				$("#plan_end_time").val(l_reEndTime).prop('selected', 'true').attr('disabled', 'true').css('background-color', 'white');
				$("#plan_start_time").show();
				$("#plan_end_time").show();
				$(".timeCheked").hide();
				$(".timeChk").hide();
			}
			$("#modalVal").val(l_selectDay);
			$("#modalStatus").val('u');
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
			/*$('#plan_modal').draggable({ handle: "#plan_modal_header" });*/

		}
	})
});

/*
 * 일정 수정 modal 
 * 
 */
$("#editViewBtn").click(function(e) {

	$("#plan_form").attr('action', '/plan_edit');

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
	$(".timeChk").show();
	$(".timeCheked").hide();

	$("#plan_start_time").show();
	$("#plan_end_time").show();
	$("#plan_modal .modal-title").html('일정 수정');
	$("#plan_modal").modal('show');
	$('.modal-backdrop').remove();
	/*$('#plan_modal').draggable({ handle: "#plan_modal_header" });*/
	$("#plan_no").val($("#plan_title").data('no'));
});

/*
 * 일정 삭제
 * 
 */
$("#delBtn").click(function() {
	swal({
		title: '삭제 하시겠습니까?',
		text: '',
		icon: 'info',
		buttons: ["YES", "NO"]
	}).then((result) => {

		if (!result) {

			$.ajax({
				url: '/plan_delete',
				type: 'post',
				data: { no: $("#plan_title").attr('data-no') },
				success: function(data) {

					swal('DELETE SUCCESS', '삭제 완료!', 'success');
					$("#plan_modal").modal('hide');
					$.searchPlan();
					$.searchPlanCount();
				},
				error: function(req, status, error) {
					if (req.status == 500) {
						swal('SERVER ERROR ', '삭제 실패!', 'error');
					}
				}
			})
		}
	})
})



/*
 * 전체 일정 보기
 * 
 */
$("#plan_monthCount").click(function(e) {

	$("#planList_body").children().remove();

	let l_subYear = $("#currentYear").val().substring(0, 4);
	let l_subMonth = $("#currentMonth").val().substring(0, 2);
	let l_subDate = [l_subYear, l_subMonth].join('.');
	let l_subCnt = 0;
	//전체 일정 조회 
	$.ajax({
		url: '/plan_search',
		datatype: 'json',
		method: 'post',
		data: { startDay: g_startDay, endDay: g_endDay },
		success: function(data) {
			console.log('all', data);
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

					if (l_subCnt != data[i].plan_no) {
						l_subCnt = data[i].plan_no;
					} else {
						continue;
					}

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
			$("#planList_modal #planList_header").find('h5').html(l_subDate);
			$("#planList_modal").css({
				'top': (e.clientY - 20) + 'px',
				'left': (e.clientX + 60) + 'px'
			})
			$("#planList_modal").modal('show');
			/*$('#planList_modal').draggable({ handle: "#planList_header" });*/
		}

	});
})

/*
 * 시작일 - 이전 날짜 처리
 * 
 */
$("#plan_start_date").change(function() {

	if ($("#plan_start_date").val().trim() < g_today_sub) {
		swal('', '이전 날짜는 등록 할 수 없습니다.', 'warning');
		$("#plan_start_date").val(g_today_sub);
	}
})

/*
 * 마감일 - 이전 날짜 처리
 *  
 */
$("#plan_end_date").change(function() {



	if ($("#plan_end_date").val().trim() < g_today_sub) {
		swal('', '이전 날짜는 등록 할 수 없습니다.', 'warning');
		$("#plan_end_date").val(g_today_sub);
	}

	if ($("#plan_end_date").val() < $("#plan_start_date").val()) {
		swal('', '시작일 이전 날짜는 등록 할 수 없습니다.', 'warning');
		$("#plan_end_date").val($("#plan_start_date").val());
	}

	$.saveState();
});


$.saveState = function() {
	let endVal = $("#plan_end_date").val().replaceAll('-', '');
	console.log('endVal', endVal);
	console.log('g_eDay', g_eDay);
	if ((endVal == g_eDay || endVal == g_sDay) && g_stateCount != 0) {
		if ($("#plan_state_Y").is(':checked') == true) {
			g_flag = true;
		}
	} else {
		g_flag = false;
	}
	console.log('g_flag', g_flag);
}



/*
 * 일별 리스트
 * 
 */
$(document).on('click', '.dayCount', function(e) {

	let l_searchDay = $(e.target).parent().data('day');
	$("#planList_body").children().remove();

	console.log('this', $("#plan_start_time").val());

	$.ajax({
		url: '/plan_dayList',
		data: { searchDay: l_searchDay },
		type: 'POST',
		success: function(data) {
			console.log('datddd', data);
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
				let $tdTitle = $("<td class='list_title'>");

				//시간 ox 처리
				if (l_subSt == '00' || l_subEt == '00') {
					l_subSt = '';
					l_subEt = '';
					$tdTime = $("<td>");
				} else {
					l_subSt += '시';
					l_subEt += '시';
					$tdTime = $("<td>");
				}
				$tdTime.addClass('list_time');
				//상태값 Y처리
				if (data[i].plan_state == 'Y') {
					$tdTitle.attr('class', 'plan_state_Y');
				}

				//오늘자 기준 지난 일정처리
				if (l_searchDay < g_today) {
					$tdTitle.attr('class', 'pass_plan');
				}

				//시작,마감 날짜 비교 후 append 처리
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
				$("#planList_modal").css({
					'top': (e.clientY - 20) + 'px',
					'left': (e.clientX + 30) + 'px'
				})
				$("#planList_modal").modal('show');
			}
		},
		error: function(req) {

			if (req.status == '500') {
				swal('SERVER ERROR ', '조회 실패!', 'error');
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
		//상태값 공란처리
		if ($("input[name=plan_state]:checked").length == 0) {
			swal('', '일정 구분을 선택해주세요!', 'info');
			return false;
		}
		//제목 공란처리
		else if ($("#plan_title").val().trim() == '') {
			swal('', '제목을 입력해주세요!', 'warning');
			$("#plan_title").focus();
			return false;
		} else if (g_titleCnt > 50) {
			swal('제목', '50글자 까지만 입력해주세요!', 'warning');
			$("#plan_title").focus();
			return false;
		}
		//시작일 공란 처리
		else if ($("#plan_start_date").val().trim() == '') {
			swal('시작', '일정을 입력해주세요!', 'warning');
			$("#plan_start_date").focus();
			return false;
		}
		//현시간 기준 시작시간 처리
		else if (($("#plan_start_date").val().trim() == g_today_sub) &&
			(g_currentTime.trim() > $("#plan_start_time").val()) &&
			($("#timeChk").is(':checked') == false)) {
			swal('시작', '시간을 지켜주세요!', 'warning');
			$("#plan_start_time").val(g_currentTime).prop('selected', 'true');
			return false;
		}
		//마감일 공란 처리
		else if ($("#plan_end_date").val().trim() == '') {
			swal('마감', '일정을 입력해주세요!', 'warning');
			$("#plan_end_date").focus();
			return false;
		}
		//현시간 기준 마감시간 처리
		else if (($("#plan_end_date").val().trim() == g_today_sub) &&
			($("#plan_start_time").val() > $("#plan_end_time").val()) &&
			($("#timeChk").is(':checked') == false)) {
			swal('마감', '시간을 지켜주세요!', 'warning');
			$("#plan_end_time").val(g_currentTime).prop('selected', 'true');
			return false;
		}
		//내용 50자 제한 처리 
		else if (g_contentCnt > 50) {
			swal('메모', '50글자 까지만 입력해주세요!', 'warning');
			$("#plan_content").val($("#plan_content").val().substring(0, 50));
			return false;
		}
		else if (arr_state.length != 0) {
			let reSd = $("#plan_start_date").val().replaceAll('-', '');
			let reEd = $("#plan_end_date").val().replaceAll('-', '');
			console.log('reSd', reSd);
			console.log('reEd', reEd);
			console.log('상태값');	
			 for (let i = 0; i < arr_state.length; i++) {
            if ($("#plan_state_Y").is(':checked') == true) {
               if($("#modalStatus").val() == 'e') {
            if (reSd == arr_state[i].day && arr_state[i].cnt != 0) {
               $("#plan_state_N").prop('checked', true);
               swal('', '일반 일정만 등록이 가능합니다.', 'warning');
               return false;               
            }
            
            if(reEd == arr_state[i].day && arr_state[i].cnt != 0) {
               $("#plan_state_N").prop('checked', true);
               swal('', '일반 일정만 등록이 가능합니다.', 'warning');
               console.log('else if문');
               return false;               
            }
            }else {
				if(arr_state[i].day == $("#modalVal").val() && arr_state[i].cnt != 0) {
					return true;
				}
}
         } 
         }      	
		}
		else {
			return true;
}   
	}
)

/*
 * 시간chk disabled 처리
 * 
 */
$("#timeChk").click(function() {
	if ($("#timeChk").prop('checked')) {
		$("#plan_start_time").attr('disabled', 'true');
		$("#plan_end_time").attr('disabled', 'true');
	} else {
		$("#plan_start_time").removeAttr('disabled');
		$("#plan_end_time").removeAttr('disabled');
	}
})

/*
 * 제목,내용 글자수 체크 
 * 
 */
$("#plan_content").blur(function() {
	let l_contentVal = $("#plan_content").val();
	let l_contentByte = $.saveByte(l_contentVal);
	g_contentCnt = l_contentByte;
	console.log('g_contentCnt', g_contentCnt);
});

$("#plan_title").blur(function() {
	let l_titleVal = $("#plan_title").val();
	let l_titleByte = $.saveByte(l_titleVal);
	g_titleCnt = l_titleByte;
	console.log('g_titleCnt', g_titleCnt);
});

 /*
 * cursor 처리
 * 
 */
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