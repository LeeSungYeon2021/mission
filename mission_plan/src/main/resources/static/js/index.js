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
var count = 1;
//날짜 년월일 파싱(string)
var ISOStr;
//날짜
var date;
//현재년도
var currentYear;
//현재 월
var currentMonth;
//현재 일
var currentDay;
//오늘날짜
var today;
//테스트 arr
var arr = {};
//일정 중요도 조회 count
var stateCount = 0;
//매달 1일 요일
var firstDay;
//매달 마지막 날짜
var lastDay;

//조회 시작날짜 
var startDay;
//조회 마감날짜 
var endDay;


/*
 *날짜 계산 함수 
 *
 */
$.createDate = function(changeDate) {

	if (changeDate != null) {
		date = new Date(changeDate);
		ISOStr =
			new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
	}
	else {
		date = new Date();
		ISOStr = date.toISOString();
	}

	currentYear = ISOStr.substring(0, 4);
	currentMonth = ISOStr.substring(5, 7);
	currentDay = ISOStr.substring(8, 10);


	let todayDate = new Date();
	today = todayDate.toISOString().substring(0, 10);


	firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	lastDay = new Date(currentYear, currentMonth, 0).getDate();

	startDay = ISOStr.substring(0, 10);
	endDay = ISOStr.substring(0, 8) + lastDay;

	$("#currentYear").val(currentYear + '년');
	$("#currentMonth").val(currentMonth + '월');

}

/*
 *달력 tbl 생성
 *
 */
$.createCalendar = function() {

	//달력 테이블 초기화
	$("#tbl_plan tbody").children().remove();

	for (let i = 0; i < firstDay + lastDay; i++) {

		//매주 tr 생성
		if (i == 0 || i % 7 == 0) {
			var $tr = $("<tr>");
		}
		//전체 td 생성
		let $td = $("<td>");

		//td 공란채우기
		if (i < firstDay) {
			$td.addClass('tdEmpty_' + i);
		} else {

			//날짜 표출  input
			let $dayInput = $("<input>");
			$dayInput.attr({
				'class': 'inputDay',
				'type': 'text',
				'value': count,
			});

			if (count < 10) {

				$td.attr('data-day', ISOStr.substring(0, 8) + '0' + count);
			} else {

				$td.attr('data-day', ISOStr.substring(0, 8) + count);
			}
			//전체 일정 개수 표출 input
			let $dayCountSpan = $("<span>");
			$dayCountSpan.attr({
				'class': 'dayCount',
				'readonly': 'true',
			})
			let $ul = $("<ul>");
			$ul.addClass('list-group');
			$td.addClass('tdDay_' + count);
			$td.append($dayInput);
			$td.append($dayCountSpan);
			$td.append($ul);

			count++;

		}
		//날짜 카운트
		if (count > lastDay) {
			count = 1;
		}
		$tr.append($td);
		$("#tbl_plan tbody").append($tr);

		$.each($("td"), function() {
			if ($(this).data('day') == today) {
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

	$.ajax({
		url: '/plan_count',
		datatype: 'json',
		method: 'post',
		data: { startDay: startDay, endDay: endDay },
		success: function(data) {
			console.log('plan_count',  data.monthCount);
			if (data.monthCount != 0) {
				$("#plan_monthCount").html('전체일정 (' + data.monthCount + '개)');
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

	let $startDate;
	let $endDate;

	$("#tbl_plan tbody").children().children().children().children().remove();

	$.ajax({
		url: '/plan_search',
		datatype: 'json',
		method: 'post',
		data: { startDay: startDay, endDay: endDay },
		success: function(data) {
			console.log('data', data);
			if (data.length == 0) {
				alert('조회된 일정이 없습니다.');
			} else {

				for (let i = 0; i < data.length; i++) {

					let subStart = data[i].plan_start_date.substring(5, 10).replace("-", "/").replaceAll("0", "");


					let subEnd = data[i].plan_end_date.substring(6, 10).replace("-", "/").replaceAll("0", "");

					$startDate = $("<li></li>");
					$startDate.attr('data-no', data[i].plan_seq_no);

					$endDate = $("<li></li>");
					$endDate.attr('data-no', data[i].plan_seq_no);


					//일반 - 중요 체크
					if ((data[i].plan_state).trim() === 'Y') {

						$startDate.addClass('plan_title plan_state_Y list-group-item');
						$endDate.addClass('plan_title plan_state_Y list-group-item');

					} else {

						$startDate.addClass('plan_title plan_state_N list-group-item');
						$endDate.addClass('plan_title plan_state_N list-group-item');
					}

					//이전날짜 처리
					if (data[i].plan_end_date < today) {

						$startDate.addClass('pass_plan');
						$endDate.addClass('pass_plan');
					}

					if (data[i].plan_start_date != data[i].plan_end_date) {
						$startDate.append(data[i].plan_title + '(' + subStart + '~' + subEnd + ')');
						$endDate.append(data[i].plan_title + '(' + subStart + '~' + subEnd + ')');
					}else {
						$startDate.append(data[i].plan_title);
						$endDate.append(data[i].plan_title);
					}


					$.each($("td"), function() {
						if (data[i].count <= 4) {

							//시작일 == td 'data-day' 비교
							if ($(this).data('day') == data[i].plan_start_date) {
								$(this).find('ul').append($startDate);
							}

							//하루 일정 중복 제거 조건
							if (data[i].plan_start_date != data[i].plan_end_date) {

								//마감일 == td 'data-day' 비교
								if ($(this).data('day') == data[i].plan_end_date) {
									$(this).find('ul').append($endDate);
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

	if (currentMonth == 1) {
		currentMonth = 13;
		currentYear -= 1;
	}
	let prevDate = [currentYear, parseInt(currentMonth) - 1].join(',');

	$.createDate(prevDate);
	$.createCalendar();
	$.searchPlan();
	$.searchPlanCount();
});

/*
 * 다음달 버튼
 * 
 */
$("#nextBtn").on('click', function() {

	if (currentMonth == 12) {
		currentMonth = 0;
		currentYear = parseInt(currentYear) + 1;
	}

	let nextDate = [currentYear, parseInt(currentMonth) + 1].join(',');

	$.createDate(nextDate);
	$.createCalendar();
	$.searchPlan();
	$.searchPlanCount();
});

/*
 * 일정 등록 modal
 * 
 */
$(document).on('click', '.inputDay', function(e) {

	let targetVal = $(e.target).parent().data('day');
	let replaceDay = targetVal.replaceAll('-', '/');
	let subDay = replaceDay.substring(2, 10);
	console.log('tv', targetVal);
	$.ajax({
		url: '/plan_state',
		data: { subDay: subDay },
		type: 'post',
		success: function(data) {
			stateCount = data;
		}
	})

	//
	if (targetVal.trim() < today) {
		alert('지난 요일은 등록할 수 없습니다.');
	} else {
		$("#enrollBtn").show();
		$("#editViewBtn").hide();
		$("#delBtn").hide();
		$("#editEndBtn").hide();
		$("#plan_modal .modal-title").html('일정 등록');
		$("#plan_state").val('N').removeAttr('disabled', 'false');
		$("#plan_start_date").empty().removeAttr('disabled', 'false');
		$("#plan_end_date").val('').removeAttr('disabled', 'false');
		$("#plan_title").val('').removeAttr('disabled', 'false');
		$("#plan_content").val('').removeAttr('disabled', 'false');
		$("#plan_modal").modal('show');
		$('.modal-backdrop').remove();
		$('#plan_modal').draggable({ handle: "#plan_modal_header" });
	}
	//현재 날짜 입력
	$("#plan_start_date").val(targetVal);
});


/*
 * 일정 상태값 변경 시 
 * 적용 함수 
 */
$("#plan_state").change(function() {

	if (stateCount >= 1 && ($("#plan_state").val() == 'Y')) {
		$("#plan_state option[value='N']").prop('selected', 'true');
		alert('일반 일정만 등록이 가능합니다.');
	}
});


$("#editEndBtn").click(function() {

	let ajaxData = $("#plan_form").serialize();
	ajaxData += "&plan_seq_no=" + $("#plan_title").data('no');

	let validRe = $("#plan_title").formnovalidate();
	console.log('validRe', validRe);
	console.log('sdfsdf?');

	/*
		$("#plan_modal").modal('hide');
		console.log('ajaxData', $("#plan_title").data('no'));
		$.ajax({
			url: '/plan_update',
			type: 'post',
			data: ajaxData,
			success: function(data) {
				$.selectPlan();
			}
		})*/
});

/*
 * 일정 상세보기
 * 
 */
$(document).on('click', '.plan_title', function(e) {
	let selectNo = $(e.target).data('no');
	$.ajax({
		url: '/plan_viewDetail',
		type: 'post',
		data: { no: selectNo },
		success: function(data) {


			$("#plan_modal .modal-title").html('일정 상세보기');
			$("#plan_state").val(data.plan_state.trim()).prop("selected", "true").attr('disabled', 'true');
			$("#plan_start_date").val(data.plan_start_date.substr(0, 10)).attr('disabled', 'true');
			$("#plan_end_date").val(data.plan_end_date.substr(0, 10)).attr('disabled', 'true');
			$("#plan_title").val(data.plan_title).attr('disabled', 'true');
			$("#plan_content").html(data.plan_content).attr('disabled', 'true');
			$("#enrollBtn").hide();
			$("#editEndBtn").hide();
			$("#editViewBtn").show();
			$("#delBtn").show();
			$("#plan_modal").modal('show');
			$("#plan_modal #plan_title").attr('data-no', selectNo);
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

	$("#plan_form").attr('action', '/plan_edit');
	$("#plan_modal .modal-title").html('일정 수정');
	$("#plan_state").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_start_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_end_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_title").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_content").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#enrollBtn").hide();
	$("#editEndBtn").show();
	$("#editViewBtn").hide();
	$("#delBtn").hide();
	$("#plan_modal").modal('show');
	$('.modal-backdrop').remove();
	$('#plan_modal').draggable({ handle: "#plan_modal_header" });
	$("#plan_seq_no").val($("#plan_title").data('no'));

})

/*
 * 일정 삭제
 * 
 */
$("#delBtn").click(function() {
	if (!confirm('삭제 하시겠습니까?')) {

		return false;
	} else {

		$.ajax({
			url: '/plan_delete',
			type: 'post',
			data: { no: $("#plan_title").data('no') },
			success: function(data) {
				alert(data);
				$("#plan_modal").modal('hide');
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
	let $listUl = $("<ul class='list-group'></ul>");

	$.each($(".plan_title"), function() {

		let $listDate = $("<li class='list-group-item'></li>");

		$listDate.html($(this).html());
		$listUl.append($listDate);
		$("#planList_body").append($listUl);
	})
	$("#planList_modal").css({
		"top": '27px',
		"left": '700px'
	})
	$("#planList_modal").modal('show');
	$('.modal-backdrop').remove();
	$('#planList_modal').draggable({ handle: "#planList_header" });

})

/*
 * 시작일 - 이전 날짜 처리
 * 
 */
$("#plan_start_date").change(function() {

	if ($("#plan_start_date").val().trim() < today) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_start_date").val(today);
	}
})

/*
 * 마감일 - 이전 날짜 처리
 *  
 */
$("#plan_end_date").change(function() {

	if ($("#plan_end_date").val().trim() < today) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_end_date").val(today);
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
$(document).on('click', '.dayCountSpan', function(e) {

	$("#planDay_body").children().remove();
	$.ajax({
		url: '/plan_dayList',
		data: { day: $(e.target).prev().val() },
		success: function(data) {
			console.log('dayList', data);
		}
	})
})

/*
 * 등록 modal 유효성 검사
 * 
 */
$("#plan_form").submit(
	function(e) {
		if ($("#plan_title").val().trim() == '') {
			alert('제목을 입력해주세요');
			$("#plan_title").focus();
			return false;
		}
		else if ($("#plan_start_date").val().trim() == '') {
			alert('시작일을 입력해주세요.');
			$("#plan_start_date").focus();
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

