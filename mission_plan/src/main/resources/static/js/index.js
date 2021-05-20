/**
 * 
 */

$(function() {
	dateInput();
	calendar();
	selectPlan();
	planCount();
	//validForm();
});


var count = 1;
var date;
var currentYear;
var currentMonth;
var currentDay;
var arrayObj = [];

//매달 1일 요일
var firstDay;

//매달 마지막 날짜

var lastDay;

//현재 년월일 표시
function dateInput(data, btnDate) {
	console.log('full', btnDate);
	if (data == 'P' || data == 'N') {
		date = new Date(btnDate);
	} else {
		date = new Date();
	}

	currentYear = date.getFullYear();
	currentMonth = date.getMonth() + 1;
	currentDay = date.getDate();
	console.log('일 ', currentDay);
	console.log('ㅇㅁㅅㄷ', date);
	$("#currentYear").val(currentYear + '년');
	$("#currentMonth").val(currentMonth + '월');

}

//달력 화면 생성
function calendar() {

	$("#tbl_plan tbody").children().remove();

	firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	lastDay = new Date(currentYear, currentMonth, 0).getDate();

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
			});

			if (i == 0 || i % 7 == 0) {
				dayInput.css('color', 'red');
			}

			//수정해야함
			if (i == 6 || i == 13 || i == 20 || i == 27 || i == 34) {
				dayInput.css('color', 'blue');
			}

			let dayHidden;

			if (count < 10) {
				dayHidden = $("<input>");
				dayHidden.attr({
					'type': 'hidden',
					'value': currentYear + '-0' + currentMonth + '-0' + count,
					'name': 'fullDay',
					'class': 'hiddenDay_' + count
				})
			} else {
				dayHidden = $("<input>");
				dayHidden.attr({
					'type': 'hidden',
					'value': currentYear + '-0' + currentMonth + '-' + count,
					'name': 'fullDay',
					'class': 'hiddenDay_' + count
				})
			}
			//전체 일정 개수 표출 input
			let planCountInput = $("<input>");
			planCountInput.attr({
				'class': 'planCountInput',
				'type': 'text',
				'readonly': 'true',
			}).css({
				'text-align': 'right',
				'font-size': '10px'
			});

			let ul = $("<ul>");
			ul.addClass('list-group');
			td.addClass('tdDay_' + count)
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

}

//달별,일별 일정 개수 조회
function planCount() {
	var countDate = currentYear + '/' + '0' + currentMonth;


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

						self.val(data[i].dayCount + '개');
					}
				})

			}
		}

	});
}
//현재 월 전체 일정 조회
function selectPlan() {
	$("#tbl_plan tbody").children().children().children().children().remove();
	var dayData = currentYear + '/' + '0' + currentMonth;
	var tsts = [];
	$.ajax({
		url: '/plan_select',
		datatype: 'json',
		method: 'post',
		data: { day: dayData },
		success: function(data) {

			/*		for (let i = 0  i < data.length ; i++) {
				arrayObj.push(data[i]);
			}*/



			console.log('tsts', arrayObj);

			console.log('셀렉', data);
			console.log('셀렉', data.length);

			for (let i = 0; i < data.length; i++) {
				let span = $("<span>").html(data[i].plan_title).addClass('form-control');
				$("#planView_modal .modal-body").append(span);
				let full = data[i].plan_start_date;
				let year = full.substring(0, 4);

				let month = full.substring(6, 7);
				let days = full.substring(8, 10);
				let dayStr = year + '-0' + month + '-' + days;
				let str = "Y";

				$("input[name=fullDay]").each(function(idx) {
					var self = $(this);

					var hiddenVal = $(this).val();
					if (dayStr.trim() == '2021-05-24') {
						console.log('히든발', i);
					}
					if (hiddenVal === dayStr) {

						var li = $("<li>");
						var div = $("<div>");
						var hidNo = $("<input>");
						hidNo.attr({
							'class': 'hidNo',
							'value': data[i].plan_seq_no,
							'type': 'hidden'
						})
						if ((data[i].plan_state).trim() === 'Y') {
							li.addClass('list-group-item list-group-item-danger');

						} else {
							li.addClass('list-group-item');
						}

						li.append(data[i].plan_title);
						li.append(hidNo);
						self.next().next().append(li);
					}
				})
			}

		}
	});

}

//이전달 버튼
$("#prevBtn").on('click', function() {

	if (currentMonth == 1) {
		currentMonth = 13;
		currentYear -= 1;
	}
	let fullDate = currentYear + ',' + (currentMonth - 1);


	dateInput('P', fullDate);
	calendar();
	selectPlan();
	planCount();
});

//다음달 버튼
$("#nextBtn").on('click', function() {

	if (currentMonth == 12) {
		currentMonth = 0;
		currentYear += 1;
	}
	let fullDate = currentYear + ',' + (currentMonth + 1);

	dateInput('P', fullDate);
	calendar();
	selectPlan();
	planCount();
});

//일정등록 modal
$(document).on('click', '.inputDay', function(e) {
	$("#updateBtn").hide();
	$("#deleteBtn").hide();
	$("#updateEndBtn").hide();
	$(".modal-title").html('일정 등록');
	$("#plan_state").val('N').removeAttr('disabled', 'false');
	$("#plan_start_date").val('').removeAttr('disabled', 'false');
	$("#plan_end_date").val('').removeAttr('disabled', 'false');
	$("#plan_title").val('').removeAttr('disabled', 'false');
	$("#plan_content").html('').removeAttr('disabled', 'false');
	$(".modal").modal('show');
	$('.modal-backdrop').remove();
	$('.modal').draggable({ handle: ".modal-header" });
	var target = $(e.target);
	//현재 날짜 입력
	$("#plan_start_date").val(target.next().val());
});

$("#plan_start_date").on('change', function(e) {
	let tt = $(e.target).val();
	let ttt = $(".hiddenDay_" + currentDay).val();
})

$("#enrollBtn").click(function() {
	let ajaxData = $("#plan_form").serialize();
	$(".modal").modal('hide');
	$.ajax({
		url: '/plan_enroll',
		type: 'post',
		data: ajaxData,
		success: function(data) {
			selectPlan();
		}
	})
});

$("#updateEndBtn").click(function() {
	let ajaxData = $("#plan_form").serialize();
	$(".modal").modal('hide');
	$.ajax({
		url: '/plan_update',
		type: 'post',
		data: ajaxData,
		success: function(data) {
			selectPlan();
		}
	})
});

$(document).on('click', '.list-group-item', function(e) {
	console.log('dsfsd', $(e.target).children().val());
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
			$(".modal-title").html('일정 상세보기');
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
			$(".modal").modal('show');
			$('.modal-backdrop').remove();
			$('.modal').draggable({ handle: ".modal-header" });
		}
	})



});

$("#updateBtn").click(function() {

	$(".modal-title").html('일정 수정');
	$("#plan_state").removeAttr('disabled', 'false');
	$("#plan_start_date").removeAttr('disabled', 'false');
	$("#plan_end_date").removeAttr('disabled', 'false');
	$("#plan_title").removeAttr('disabled', 'false');
	$("#plan_content").removeAttr('disabled', 'false');
	$("#enrollBtn").hide();
	$("#updateEndBtn").show();
	$("#updateBtn").hide();
	$("#deleteBtn").hide();	
	$(".modal").modal('show');
	$('.modal-backdrop').remove();
	$('.modal').draggable({ handle: ".modal-header" });

})

$("#deleteBtn").click(function() {
	if (!confirm('삭제 하시겠습니까?')) {

		return false;
	} else {

		$.ajax({
			url: '/plan_delete',
			type: 'post',
			data: { no: $("input[name=plan_seq_no]").val() },
			success: function(data) {

				$(".modal").modal('hide');
				selectPlan();

			}
		})
	}
});

$("#plan_countAll").click(function() {
$("#planView_modal").css({
	"top": '27px',
	"left": '700px'
})
	$("#planView_modal").modal();
	$('.modal-backdrop').remove();
	/*$('.modal').draggable({ handle: "#planView_header" });*/
})