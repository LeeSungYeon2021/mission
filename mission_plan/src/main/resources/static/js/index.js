/**
 * 
 */

$(function() {
	//날짜 구하는 함수
	dateInput();
	//달력 table 구현
	calendar();
	//일정 조회 및 구현
	selectPlan();
	//일 및 월 개수 조회
	planCount();
	//등록 form 유효성 체크
	validation();

});


var count = 1;
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

/*
 *날짜 계산 함수 
 *
 */
function dateInput(btnDate) {

	if(btnDate != null) {
		date = new Date(btnDate);
	}
	else {
		date = new Date();
	}
	let todayDate = new Date();

	currentYear = date.getFullYear();
	currentMonth = date.getMonth() + 1;
	currentDay = date.getDate();
	let qwer = date.getFullYear() + '-' + date.getMonth() + 1;

	todayYear = todayDate.getFullYear();
	todayMonth = todayDate.getMonth() + 1;
	todayDay = todayDate.getDate();

	firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	lastDay = new Date(currentYear, currentMonth, 0).getDate();

	$("#currentYear").val(currentYear + '년');
	$("#currentMonth").val(currentMonth + '월');

	if (currentMonth < 10) {
		currentMonth = '0' + currentMonth;
	}

	if (currentDay < 10) {
		currentDay = '0' + currentDay;
	}

	if (todayMonth < 10) {
		todayMonth = '0' + todayMonth;
	}

	if (todayDay < 10) {
		todayDay = '0' + todayDay;
	}
	today = [todayYear, todayMonth, todayDay].join('-');

}

/*
 *달력 tbl 생성
 *
 */
function calendar() {


	$("#tbl_plan tbody").children().remove();

	for (let i = 0; i < firstDay + lastDay; i++) {

		//매주 tr 생성
		if (i == 0 || i % 7 == 0) {
			var tr = $("<tr>");
		}
		//전체 td 생성
		let td = $("<td>");

		//td 공란채우기
		if (i < firstDay) {
			td.addClass('tdEmpty_' + i);
		} else {

			//날짜 표출  input
			let dayInput = $("<input>");
			dayInput.attr({
				'class': 'inputDay',
				'type': 'text',
				'value': count,
				/*'readonly': 'true'*/
			}).css('font-weight', 'bold');

			if (i == 0 || i % 7 == 0) {
				dayInput.css('color', 'red');
			}

			let dayHidden;

			if (count < 10) {
				dayHidden = $("<input>");
				dayHidden.attr({
					'type': 'hidden',
					'value': currentYear + '-' + currentMonth + '-0' + count,
					'name': 'fullDay',
					'class': 'hiddenDay_' + count
				})
			} else {
				dayHidden = $("<input>");
				dayHidden.attr({
					'type': 'hidden',
					'value': currentYear + '-' + currentMonth + '-' + count,
					'name': 'fullDay',
					'class': 'hiddenDay_' + count
				})
			}
			//전체 일정 개수 표출 input
			let planCountInput = $("<span>");
			planCountInput.attr({
				'class': 'planCountInput',
				/*	'type': 'text',*/
				'readonly': 'true',

			}).css({
				'text-align': 'right',
				'font-size': '10px',
				'margin-left': '70px'
			});

			let ul = $("<ul>");
			
			ul.addClass('list-group');
			td.addClass('tdDay_' + count);
			td.append(dayInput);
			td.append(dayHidden);
			td.append(planCountInput);
			td.append(ul);

			count++;

		}
		if (count > lastDay) {
			count = 1;
		}
		tr.append(td);
		$("#tbl_plan tbody").append(tr);
	}

	$("#tbl_plan tbody").find('tr').find('td:last').find('input').css('color', 'blue');
	$(".hiddenDay_" + currentDay).parent().css('border', '1px solid orange');

}

/*
 *일별,달별 
 *일정 개수 조회
 */
function planCount() {
	var countDate = [currentYear, currentMonth].join('/');

	$.ajax({
		url: '/plan_count',
		datatype: 'json',
		method: 'post',
		data: { day: countDate },
		success: function(data) {
			
			if (data[0].monthCount == 0) {
				$("#plan_countAll").html('전체일정 (없음)');
			} else {
				$("#plan_countAll").html('전체일정 (' + data[0].monthCount + '개)');
			}

			for (let i = 0; i < data.length; i++) {

				let subDay = data[i].plan_start_date.substr(0, 10);

				$(".planCountInput").each(function(idx) {
					var self = $(this);

					var hiddenVal = $(this).prev().val();

					if (hiddenVal === subDay) {

						self.html(data[i].dayCount + '개');
					} else {

						self.val('');
					}
				})

			}
		}

	});
}

/*
 * 현재 날짜 
 * 일정 전체 조회 
 */
function selectPlan() {
	
	  var tmp ="";
        tmp = tmp +"<li> It is Test </li>"

	$("#tbl_plan tbody").children().children().children().children().remove();
	$("#planView_footer").children().remove();
	$("#planView_body").children().remove();

	var fDay = [currentYear, currentMonth, '1'].join('-');
	var lDay = [currentYear, currentMonth, lastDay].join('-');

	$.ajax({
		url: '/plan_select',
		datatype: 'json',
		method: 'post',
		data: { fDay: fDay, lDay: lDay },
		success: function(data) {

			for (let i = 0; i < data.length; i++) {

				arr[i] = new Object();
				arr[i].plan_seq_no = data[i].plan_seq_no;
				arr[i].plan_enroll_date = data[i].plan_enroll_date;
				arr[i].plan_start_date = data[i].plan_start_date;
				arr[i].plan_end_date = data[i].plan_end_date;
				arr[i].plan_update_date = data[i].plan_update_date;
				arr[i].plan_title = data[i].plan_title;
				arr[i].plan_content = data[i].plan_content;
				arr[i].plan_state = data[i].plan_state;
			}

			let spanCount = 0;
			let ul =$("<ul>");
			var ttt = $("<li></li>").append('ㅎㅇㅎㅇ');
			var sspp = $("<span>").html('sdfsdf')
						ul.append(ttt);
			for (let i = 0; i < data.length; i++) {

				
				let dayStr = data[i].plan_start_date.substr(0, 10);
				let str = "Y";
				let subSm = data[i].plan_start_date.substring(6, 7);
				let subSd = data[i].plan_start_date.substring(8, 10);
				let subEm = data[i].plan_end_date.substring(6, 7);
				let subEd = data[i].plan_end_date.substring(8, 10);
				let subS = subSm + '/' + subSd;
				let subE = subEm + '/' + subEd;
				let baseData = data[0].plan_start_date.substring(8, 10);
				let hiddenVal = $(".hiddenDay_" + subSd).val();
				let $titleSpan = $("<span>").html(data[i].plan_title).addClass('form-control');
				
				
				let $startDate = $("<li></li>");
				console.log('startDate',$startDate);
				let $endDate = $("<li>");				
				let $hidNo = $("<input>");
				
				$hidNo.attr({
					'class': 'hidNo',
					'value': data[i].plan_seq_no,
					'type': 'hidden'
				});
				$startDate.append($hidNo);
				$endDate.append($hidNo);
				//일반 - 중요 체크
				if ((data[i].plan_state).trim() === 'Y') {
					$startDate.addClass('list-group-item list-group-item-danger');
					$endDate.addClass('list-group-item list-group-item-danger');

				} else {
					$startDate.addClass('list-group-item');
					$endDate.addClass('list-group-item');
				}

				//이전날짜 처리
				if (hiddenVal < today) {
					$startDate.append(data[i].plan_title + '(' + subS + '-' + subE + ')').css({
						'text-decoration': 'line-through',
						'color': 'red'
					});
					
					$endDate.append(data[i].plan_title + '(' + subS + '-' + subE + ')').css({
						'text-decoration': 'line-through',
						'color': 'red'
					});
				} else {
					$startDate.append(data[i].plan_title + '(' + subS + '-' + subE + ')');
					$endDate.append(data[i].plan_title + '(' + subS + '-' + subE + ')');
				}


				$("#planView_modal .modal-body").append($titleSpan);
				$(".tdDay_" + subSd).find('ul').append($startDate);
				$(".tdDay_" + subEd).find('ul').append($startDate);
				

				if (i % 4 == 0 && i != 0) {
					if (baseData == subSd) {
						baseData = data[i - 1].plan_start_date.substring(8, 10);
						continue;
					}
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
	let fullDate = [currentYear, (currentMonth - 1)].join(',');

	dateInput(fullDate);
	calendar();
	selectPlan();
	planCount();
});

/*
 * 다음달 버튼
 * 
 */
$("#nextBtn").on('click', function() {

	if (currentMonth == 12) {
		currentMonth = 0;
		currentYear += 1;
	}

	let fullDate = [currentYear, (parseInt(currentMonth) + 1)].join(',');

	dateInput(fullDate);
	calendar();
	selectPlan();
	planCount();
});

/*
 * 일정 등록 modal
 * 
 */
$(document).on('click', '.inputDay', function(e) {

	let targetVal = $(e.target).next().val();
	let replaceDay = targetVal.replaceAll('-', '/');
	let subDay = replaceDay.substring(2, 10);

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
	$("#plan_modal").modal('hide');

	$.ajax({
		url: '/plan_update',
		type: 'post',
		data: ajaxData,
		success: function(data) {
			selectPlan();
		}
	})
});

/*
 * 일정 상세보기
 * 
 */
$(document).on('click', '.list-group-item', function(e) {

	$.ajax({
		url: '/plan_view',
		type: 'post',
		data: { no: $(e.target).children().val() },
		success: function(data) {
			var seqNo = $("<input>");
			seqNo.attr({
				'type': 'hidden',
				'value': data.plan_seq_no,
				'name': 'plan_seq_no',
			})

			$("#plan_modal .modal-title").html('일정 상세보기');
			$("#plan_state").val(data.plan_state.trim()).prop("selected", "true").attr('disabled', 'true');
			$("#plan_start_date").val(data.plan_start_date.substr(0, 10)).attr('disabled', 'true');
			$("#plan_end_date").val(data.plan_end_date.substr(0, 10)).attr('disabled', 'true');
			$("#plan_title").val(data.plan_title).attr('disabled', 'true');
			$("#plan_content").html(data.plan_content).attr('disabled', 'true');
			$("#plan_content").after(seqNo);
			$("#enrollBtn").hide();
			$("#updateEndBtn").hide();
			$("#updateBtn").show();
			$("#deleteBtn").show();
			$("#plan_modal").modal('show');
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
			data: { no: $("input[name=plan_seq_no]").val() },
			success: function(data) {

				$("#plan_modal").modal('hide');
				selectPlan();
				planCount();
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
$(document).on('click', '.planCountInput', function(e) {

	$("#planDay_body").children().remove();

	let ol = $("<ol>").attr({
		'start': '1',
		'class': 'list-group'
	});
	for (let i = 0; i < Object.keys(arr).length; i++) {
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
	})
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