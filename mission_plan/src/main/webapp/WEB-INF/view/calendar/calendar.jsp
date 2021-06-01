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
		<table class="table " id="tbl_plan">
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
					<td align='center'><input type="text" id="currentMonth" readonly>
					</td>
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
					<td><span id="plan_countAll">전체일정</span></td>

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
		<!-- 일별 일정 리스트 -->
			<div class="modal" data-backdrop="false" id="planDay_modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header" id="planDay_header">
						
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="planDay_body"></div>
					<div class="modal_footer" id="planDay_footer"></div>
				</div>
			</div>
		</div>
		
		<!-- 일정상세 modal -->
		<div class="modal" id="planView_modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content1">
					<div class="modal-header" id="planView_header">
						<h5>전체 일정</h5>
						<button type="button" class="close" data-dismiss="modal1"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="planView_body"></div>
					<div class="modal_footer" id="planView_footer"></div>
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
							<button type="button" id="updateBtn">
								<i class="fas fa-pen"></i>
							</button>
							<button type="button" id="deleteBtn">
								<i class="fas fa-trash-alt"></i>
							</button>
							<button type="button" class="" data-dismiss="modal"
								aria-label="Close">
								<i class="fas fa-times"></i>
							</button>
						</div>
						<div class="modal-body">

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">구분</span>									
								</div>
								<select class="form-control" id="plan_state" name="plan_state">
									<option value="N">일반</option>
									<option value="Y">중요</option>
								</select>
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">제목</span>
								</div>
								<input type="text" class="form-control" name="plan_title" id="plan_title">
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">일시</span>
								</div>
								<input type="date" class="form-control" id="plan_start_date" type="date" name="plan_start_date"> 
								
								<input type="date" class="form-control" id="plan_end_date" type="date" name="plan_end_date">

							</div>
							
							<div class="input-group mb-3">
								<div class="">
									<span class="input-group-text">메모</span>
								</div>
								<textarea id="plan_content" name="plan_content" class="form-control"></textarea>								
							</div>
						</div>
						<div class="modal-footer">
							<div class="btn-group btn-group-justified" role="group" aria-label="...">

								<div class="btn-group" role="group">
									<button id="enrollBtn" type="submit" class="btn btn-dark">저장</button>
									<button id="updateEndBtn" type="button" class="btn btn-danger">저장</button>									
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
<script src="/resources/js/index.js"></script>