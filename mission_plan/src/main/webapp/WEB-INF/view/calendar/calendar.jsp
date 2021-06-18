<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<%@ include file="/WEB-INF/view/common/header.jsp"%>
<section style="">
	<div class="container">
		<div class="tbl_div">
			<!-- 달력 tbl -->
			<table class="table " id="tbl_plan">
				<colgroup>
					<col width="13%">
					<col width="13%">
					<col width="13%">
					<col width="13%">
					<col width="13%">
					<col width="13%">
					<col width="13%">
				</colgroup>
				<thead>
					<tr align='right'>
						<td></td>
						<td align='right'>
							<button type="button" id="prevBtn">
								<i class="fa fa-angle-left fa-2x"></i>
							</button>
						</td>
						<td align='center'><input type="text" id="currentYear"
							readonly></td>
						<td align='center'><input type="text" id="currentMonth"
							readonly></td>
						<td align='left'>
							<button type="button" id="nextBtn">
								<i class="fa fa-angle-right fa-2x"></i>
							</button>
						</td>
					</tr>

					<tr>

						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td><span id="plan_monthCount"></span></td>

					</tr>
					<tr>
						<td style="color: red;">일</td>
						<td>월</td>
						<td>화</td>
						<td>수</td>
						<td>목</td>
						<td>금</td>
						<td style="color: blue;">토</td>
					</tr>
				</thead>

				<tbody>

				</tbody>
			</table>

		</div>

		<!-- 일정 리스트 modal -->
		<div class="modal" id="planList_modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div style="background-color:lightgray;" class="modal-header" id="planList_header">
						<h5></h5>											
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="planList_body"></div>					
					<div class="modal_footer" id="planList_footer"></div>
				</div>
			</div>
		</div>

		<!-- 일정 modal -->
		<form action="/plan_enroll" id="plan_form" method="post">
			<div class="modal" id="plan_modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header" id="plan_modal_header">
							<h5 class="modal-title">일정 등록</h5>
							<button type="button" id="editViewBtn">
								<i class="fas fa-pen"></i>
							</button>
							<button type="button" id="delBtn">
								<i class="fas fa-trash-alt"></i>
							</button>
							<button type="button" class="" data-dismiss="modal"
								aria-label="Close">
								<i class="fas fa-times"></i>
							</button>
						</div>
						<div class="modal-body" id="plan_modal_body">

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">구분</span>
								</div>
							
								<div style="margin-top:10px;margin-left:30px;">
									<label><input class="plan_state" id="plan_state_N" style="width:20px;height:15px;margin-top:5px;" type="radio" name="plan_state" value="N">일반</label>
								</div>
								
								<div style="margin-top:10px;margin-left:30px;">
									<label><input class="plan_state" id="plan_state_Y" style="width:20px;height:15px;margin-top:5px;" type="radio" name="plan_state" value="Y">중요</label>
								</div>
								
								
								
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">제목</span>
								</div>
								<input type="hidden" name="plan_no" id="plan_no"
									value="0"> <input type="text" class="form-control"
									name="" id="plan_title">
							</div>



							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">일시</span>
								</div>
								<div>
									<input type="date" class="form-control" id="plan_start_date"
										type="date" name="plan_start_date"> <input type="date"
										class="form-control" id="plan_end_date" type="date"
										name="plan_end_date">
								</div>
								<div>
									<select id="plan_start_time" class="form-control" name="startTime">
										<option value="0000">해당없음</option>
										<option value="2400">오전 12:00</option>
										<option value="0100">오전 1:00</option>
										<option value="0200">오전 2:00</option>
										<option value="0300">오전 3:00</option>
										<option value="0400">오전 4:00</option>
										<option value="0500">오전 5:00</option>
										<option value="0600">오전 6:00</option>
										<option value="0700">오전 7:00</option>
										<option value="0800">오전 8:00</option>
										<option value="0900">오전 9:00</option>
										<option value="1000">오전 10:00</option>
										<option value="1100">오전 11:00</option>
										<option value="1200">오후 12:00</option>
										<option value="1300">오후 1:00</option>
										<option value="1400">오후 2:00</option>
										<option value="1500">오후 3:00</option>
										<option value="1600">오후 4:00</option>
										<option value="1700">오후 5:00</option>
										<option value="1800">오후 6:00</option>
										<option value="1900">오후 7:00</option>
										<option value="2000">오후 8:00</option>
										<option value="2100">오후 9:00</option>
										<option value="2200">오후 10:00</option>
										<option value="2300">오후 11:00</option>										
									</select> 

									<select id="plan_end_time" class="form-control" name="endTime">
										<option value="0000">해당없음</option>
										<option value="2400">오전 12:00</option>
										<option value="0100">오전 1:00</option>
										<option value="0200">오전 2:00</option>
										<option value="0300">오전 3:00</option>
										<option value="0400">오전 4:00</option>
										<option value="0500">오전 5:00</option>
										<option value="0600">오전 6:00</option>
										<option value="0700">오전 7:00</option>
										<option value="0800">오전 8:00</option>
										<option value="0900">오전 9:00</option>
										<option value="1000">오전 10:00</option>
										<option value="1100">오전 11:00</option>
										<option value="1200">오후 12:00</option>
										<option value="1300">오후 1:00</option>
										<option value="1400">오후 2:00</option>
										<option value="1500">오후 3:00</option>
										<option value="1600">오후 4:00</option>
										<option value="1700">오후 5:00</option>
										<option value="1800">오후 6:00</option>
										<option value="1900">오후 7:00</option>
										<option value="2000">오후 8:00</option>
										<option value="2100">오후 9:00</option>
										<option value="2200">오후 10:00</option>
										<option value="2300">오후 11:00</option>										
									</select>
								</div>
							</div>

							<div class="input-group mb-3">
								<div class="">
									<span class="input-group-text">메모</span>
								</div>
								<textarea id="plan_content" name="plan_content"
									class="form-control"></textarea>									
							</div>
								<span style="margin-left:60px;" id="fontLength">(0/50)</span>	
						</div>
						<div class="modal-footer" id="plan_modal_footer">
							<div class="btn-group btn-group-justified" role="group"
								aria-label="...">

								<div class="btn-group" role="group">
									<button id="enrollBtn" type="submit" class="btn btn-dark">저장</button>
									<button id="editEndBtn" type="submit" class="btn btn-danger">저장</button>
								</div>

							</div>

						</div>
					</div>
				</div>
			</div>
		</form>		

		<!-- 컨테이너 -->
	</div>
</section>

<%@ include file="/WEB-INF/view/common/footer.jsp"%>
<script src="/resources/js/calendar.js"></script>