<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<%@ include file="/WEB-INF/view/common/header.jsp"%>
<section>
	<div class="container">

		<table class="table " id="tbl_plan">
			<thead>
				<tr>
					<td></td>
					<td></td>
					<td align='center'>
						<button type="button" id="prevBtn">
							<i class="fa fa-angle-left fa-2x"></i>
						</button>
					</td>
					<td align='center'><input type="text" id="currentYear"
						readonly></td>
					<td align='left'><input type="text" id="currentMonth" readonly>
					</td>
					<td align='left'>
						<button type="button" id="nextBtn">
							<i class="fa fa-angle-right fa-2x"></i>
						</button>
					</td>
					<td></td>
					<td></td>
				</tr>

				<tr>

					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td><span id="plan_countAll"></span></td>

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
		<form id="plan_form" method="post">
			<div class="modal" id="plan_modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header" id="plan_modal_header">
							<h5 class="modal-title">일정 등록</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div>
								<span>구분</span> <select id="plan_state" name="plan_state">
									<option value="N">일반</option>
									<option value="Y">중요</option>
								</select>
							</div>
							<div>
								<input id="plan_start_date" type="date" name="plan_start_date">
								<input id="plan_end_date" type="date" name="plan_end_date">
							</div>
							<div>
								<input name="plan_title" class="form-conrol" id="plan_title"
									type="text" placeholder="일정 제목을 입력해주세요"> <br /> <br />
							</div>
							<div>
								<textarea id="plan_content" name="plan_content"></textarea>
							</div>
						</div>
						<div class="modal-footer">
							<!-- <button id="enrollBtn" type="submit" class="btn btn-primary">등록</button> -->
							<input type="button" id="enrollBtn" value="저장">
							<!-- <input type="button" id="updateBtn" value="수정"> -->
							<button type="button" id="updateBtn">
								<i class="fas fa-pen"></i>
							</button>
							<input type="button" id="updateEndBtn" value="저장">
							
							<button type="button" id="deleteBtn">
								<i class="fas fa-trash-alt"></i>
							</button>
							
							<!-- <button id="enrollBtn" type="button" class="btn btn-primary">등록</button> -->
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