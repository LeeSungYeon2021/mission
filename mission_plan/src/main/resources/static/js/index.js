/**
 * 
 */

$(function() {
	//날짜 구하는 함수
	$.createDate();
	//달력 table 구현
	$.createCalendar();
	//일정 조회 및 구현
	$.selectPlan();
	//일 및 월 개수 조회
	$.selectPlanCount();
	//등록 form 유효성 체크
	//validation();

});


var count = 1;
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
var startDay;
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
				/*	'type': 'text',*/
				'readonly': 'true',

			}).css({
				'text-align': 'right',
				'font-size': '10px',
				'margin-left': '70px'
			});

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
		
		$.each($("td"),function() {
			if($(this).data('day') == today) {				
				$(this).css('border','2px solid orange');
			}
		})
	}
}

/*
 *일별,달별 
 *일정 개수 조회
 */
$.selectPlanCount = function() {

	$.ajax({
		url: '/plan_count',
		datatype: 'json',
		method: 'post',
		data: { startDay: startDay, endDay: endDay },
		success: function(data) {
			
		}

	});
}

/*
 * 현재 날짜 
 * 일정 전체 조회 
 */
$.selectPlan = function() {

	let $startDate;
	let $endDate;

	$("#tbl_plan tbody").children().children().children().children().remove();
	$("#planView_footer").children().remove();
	$("#planView_body").children().remove();

	$.ajax({
		url: '/plan_select',
		datatype: 'json',
		method: 'post',
		data: { startDay: startDay, endDay: endDay },
		success: function(data) {
			
			if (data.length == 0) {
				alert('조회된 일정이 없습니다.');
			}
			for (let i = 0; i < data.length; i++) {

				$startDate = $("<li></li>");
				$startDate.attr('data-no', data[i].plan_seq_no);

				$endDate = $("<li></li>");
				$endDate.attr('data-no', data[i].plan_seq_no);


				//일반 - 중요 체크
				if ((data[i].plan_state).trim() === 'Y') {
					$startDate.addClass('plan_title list-group-item list-group-item-danger');
					$endDate.addClass('plan_title list-group-item list-group-item-danger');

				} else {
					$startDate.addClass('plan_title list-group-item');
					$endDate.addClass('plan_title list-group-item');
				}

				//이전날짜 처리
				if (data[i].plan_end_date < today) {
					$startDate.append(data[i].plan_title).css({
						'text-decoration': 'line-through',
						'color': 'red'
					});

					$endDate.append(data[i].plan_title).css({
						'text-decoration': 'line-through',
						'color': 'red'
					});
				} else {
					$startDate.append(data[i].plan_title);
					$endDate.append(data[i].plan_title);
				}

				/*$("#planView_modal .modal-body").append($titleSpan);*/

				$.each($("td"), function() {
					if (data[i].rank <= 4) {

						if ($(this).data('day') == data[i].plan_start_date) {
							$(this).find('ul').append($startDate);
						}
						if (data[i].plan_start_date != data[i].plan_end_date) {

							if ($(this).data('day') == data[i].plan_end_date) {
								$(this).find('ul').append($endDate);
							}
						}
					}
				});
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
	$.selectPlan();
	$.selectPlanCount();
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
	$.selectPlan();
	$.selectPlanCount();
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
		$("#updateBtn").hide();
		$("#deleteBtn").hide();
		$("#updateEndBtn").hide();
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


$("#updateEndBtn").click(function() {

	let ajaxData = $("#plan_form").serialize();
	ajaxData += "&plan_seq_no=" + $("#plan_title").data('no');


	$("#plan_modal").modal('hide');
	console.log('ajaxData', $("#plan_title").data('no'));
	$.ajax({
		url: '/plan_update',
		type: 'post',
		data: ajaxData,
		success: function(data) {
			$.selectPlan();
		}
	})
});

/*
 * 일정 상세보기
 * 
 */
$(document).on('click', '.plan_title', function(e) {
	let selectNo = $(e.target).data('no');
	$.ajax({
		url: '/plan_view',
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
			$("#updateEndBtn").hide();
			$("#updateBtn").show();
			$("#deleteBtn").show();
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
$("#updateBtn").click(function() {

	$("#plan_modal .modal-title").html('일정 수정');
	$("#plan_state").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_start_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_end_date").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_title").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#plan_content").removeAttr('disabled', 'false').css('background-color', 'white');
	$("#enrollBtn").hide();
	$("#updateEndBtn").show();
	$("#updateBtn").hide();
	$("#deleteBtn").hide();
	$("#plan_modal").modal('show');
	$('.modal-backdrop').remove();
	$('#plan_modal').draggable({ handle: "#plan_modal_header" });

})

/*
 * 일정 삭제
 * 
 */
$("#deleteBtn").click(function() {
	if (!confirm('삭제 하시겠습니까?')) {

		return false;
	} else {

		$.ajax({
			url: '/plan_delete',
			type: 'post',
			data: { no: $("#plan_title").data('no') },
			success: function(data) {

				$("#plan_modal").modal('hide');
				$.selectPlan();
				$.selectPlanCount();
			}
		})
	}
});

/*
 * 전체 일정 보기
 * 
 */
$("#plan_countAll").click(function() {
	$("#planView_modal").css({
		"top": '27px',
		"left": '700px'
	})
	$("#planView_modal").modal();
	$('.modal-backdrop').remove();
	$('#planView_modal').draggable({ handle: "#planView_header" });

})

/*
 * 일정 등록 modal
 * 
 */
$("#plan_start_date").change(function() {

	if ($("#plan_start_date").val().trim() < today) {
		alert('이전 날짜는 등록 할 수 없습니다.');
		$("#plan_start_date").val(today);
	}
})

/*
 * 마감일 
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
	/*	let ol = $("<ol>").attr({
			'start': '1',
			'class': 'list-group'
		});
			
			if ((arr[i].plan_start_date.substr(0, 10)) == $(e.target).prev().val()) {
	
				let li = $("<li>")
				let span = $("<span>");
				span.html(arr[i].plan_title).css('font-size', '12px');
				if (arr[i].plan_state.trim() == 'Y') {
					li.append(span).attr('class', 'list-group-item list-group-item-danger');
				} else {
					li.append(span).attr('class', 'list-group-item');
				}
				ol.append(li);
				$("#planDay_body").append(ol);
				$('#planDay_modal').draggable({ handle: "#planDay_header" });
				$("#planDay_modal").modal('show');
			}
		}
		var x = e.clientX;
		var y = e.clientY;
		$("#planDay_modal").css({
			'left': (x + 10) + 'px',
			'top': (y - 60) + 'px'
		})*/
})

/*
 * 등록 modal 유효성 검사
 * 
 */
function validation() {
	$("#plan_form").validate({
		//규칙
		rules: {
			plan_title: {
				required: true,
			}

		},
		//규칙체크 실패시 출력될 메시지
		messages: {
			plan_title: {
				required: "필수로입력하세요",
			},
			plan_start_date: {
				required: "시작일을 골라주세요."
			},
			plan_end_date: {
				required: "마감일을 골라주세요."
			}
		},
		submitHandler: function(form) {
			form.submit();
		}
	});
}