<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<%@ include file="/WEB-INF/view/common/header.jsp"%>

<section>
	<table class="table" id="tbl_plan">
		<thead>		
			<tr align='right'>
						<td></td>
						<td>
							<button type="button" id="prevBtn">
								<i class="fa fa-angle-left fa-2x"></i>
							</button>
						</td>
						<td><input type="text" id="currentYear" readonly></td>
						<td><input type="text" id="currentMonth" readonly></td>
						<td align='center'>
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
						<th>sun</th>
						<th>mon</th>
						<th>the</th>
						<th>wed</th>
						<th>thu</th>
						<th>fri</th>
						<th>sat</th>
					</tr>
		</thead>		
		<tbody>
			<c:forEach items="${list }" var="list" varStatus="str">
				
					<tr>
						<td data-day="${list.date}${list.sun }">
							<input class="inputDay" type="text" value="${list.sun }"readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.mon }">
							<input class="inputDay" type="text" value="${list.mon }" readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.the }">
							<input class="inputDay" type="text" value="${list.the }" readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.wed }">
							<input class="inputDay" type="text" value="${list.wed }" readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.thu }">
							<input class="inputDay" type="text" value="${list.thu }" readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.fri }">
							<input class="inputDay" type="text" value="${list.fri }" readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>
						<td data-day="${list.date}${list.sat }">
							<input class="inputDay" type="text" value="${list.sat }"readonly/>
							<span class="dayCount" readonly></span>
							<ul class="list-group ulDay"></ul>
						</td>						
					</tr>
					
					
								
			</c:forEach>			
		</tbody>		
	</table>
	
	<!-- 일정 리스트 modal -->
		<div class="modal" id="planList_modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header" id="planList_header">
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
				<div class="modal-dialog modal-dialog-centered" role="document">
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
								<div class="input-group-prepend required">
									<span class="input-group-text">구분</span>
								</div>

								<div style="margin-top: 10px; margin-left: 30px;">

									<input class="plan_state" id="plan_state_N"
										style="width: 20px; height: 15px; margin-top: 5px;"
										type="radio" name="plan_state" value="N"> <label
										for="plan_state_N">일반</label>
								</div>

								<div style="margin-top: 10px; margin-left: 30px;">

									<input class="plan_state" id="plan_state_Y"
										style="width: 20px; height: 15px; margin-top: 5px;"
										type="radio" name="plan_state" value="Y"> <label
										for="plan_state_Y">중요</label>

								</div>

							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">제목</span>
								</div>

								<input type="hidden" name="plan_no" id="plan_no" value="0">
								<input type="text" class="form-control" name="plan_title" id="plan_title" placeholder="">
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
									<select id="plan_start_time" class="form-control"
										name="startTime">										
										<option value="0000">오전 12:00</option>
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
										
									</select> <select id="plan_end_time" class="form-control" name="endTime">										
										<option value="0000">오전 12:00</option>
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
								<div class="timeChk">
									<input type="checkbox" id="timeChk" name="timeChk" value="0001">
									<label for="timeChk">종일</label>																	
								</div>
								<div class="timeCheked">
									<span id="timeChked"><i class="fas fa-check-square fa-2x"></i></span>
									<label for="timeChked">종일</label>			
								</div>
							</div>

							<div class="input-group mb-3">
								<div class="">
									<span class="input-group-text">메모</span>
								</div>
								<textarea id="plan_content" name="plan_content"
									class="form-control"></textarea>
							</div>
							<div>
								<input type="hidden" id="modalStatus">
								<input type="hidden" id="modalVal">
							</div>
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
		<div>
			<input type="hidden" id="error_code" value="${msg }" />			
		</div>		
</section>

<%@ include file="/WEB-INF/view/common/footer.jsp"%>
<script src="/resources/js/cal.js"></script>
<script src="/resources/js/calendar.js"></script>
