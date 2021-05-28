<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ include file="/WEB-INF/view/common/header.jsp"%>
<style>
#tbl_plan>thead>tr>td:first-child>span:first-child {
	color: red;
}

#tbl_plan>tbody>tr>td:first-child span:first-child {
	color: red;
}

#tbl_plan>thead>tr>td:last-child>span:first-child {
	color: blue;
}

#tbl_plan>tbody>tr>td:last-child>span:first-child {
	color: blue;
}
</style>
<section>
	<table id="tbl_plan" class="table">
		<thead>
			<tr>
				<td align='center'>
					<a href="/calendar?year=${parseYear}&month=${parseMonth-1}"> 
						<i class="fa fa-angle-left fa-2x"></i>
					</a>
				</td>
				<td id="cal_year"><c:out value="${parseYear }" /></td>
				<td id="cal_month"><c:out value="${parseMonth }" /></td>
				<td align='left'>
					<a href="/calendar?year=${parseYear}&month=${parseMonth+1}"> 
						<i class="fa fa-angle-right fa-2x"></i>
					</a>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>일</td>
				<td>월</td>
				<td>화</td>
				<td>수</td>
				<td>목</td>
				<td>금</td>
				<td>토</td>
			</tr>
			<tr>
				<c:forEach var="day" items="${day }" varStatus="status">
					<c:if test="${status.index%7==0}">
			</tr>
			<tr>
				</c:if>
				<c:choose>
					<c:when test="${day == 0}">
						<td></td>
					</c:when>
					<c:otherwise>
						<td date-key="${parseYear }${parseMonth }${day}" class="tdDay_${day }">
							<span><c:out value="${day }" /></span> 
							<span>count</span>
							<ul class="list-group">								
							</ul></td>
					</c:otherwise>
				</c:choose>
				</c:forEach>
			</tr>
		</tbody>
	</table>

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
								<span class="input-group-text" id="basic-addon1">구분</span>
							</div>
							<select class="form-control" id="plan_state" name="plan_state">
								<option value="N">일반</option>
								<option value="Y">중요</option>
							</select>
						</div>

						<div class="input-group mb-3">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon1">제목</span>
							</div>
							<input type="text" class="form-control" name="plan_title"
								id="plan_title" required="true">
						</div>

						<div class="input-group mb-3">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon1">일시</span>
							</div>
							<input type="date" class="form-control"
								aria-describedby="basic-addon1" id="plan_start_date" type="date"
								name="plan_start_date" required="required"> <input
								type="date" class="form-control" aria-describedby="basic-addon1"
								id="plan_end_date" type="date" name="plan_end_date"
								required="required">
						</div>
						<div class="input-group mb-3">
							<div class="">
								<span class="input-group-text" id="basic-addon1">메모</span>
							</div>
							<textarea id="plan_content" name="plan_content"
								class="form-control"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<div class="btn-group btn-group-justified" role="group"
							aria-label="...">

							<div class="btn-group" role="group">
								<button id="enrollBtn" type="submit" class="btn btn-danger">저장</button>
								<button id="updateEndBtn" type="button" class="btn btn-danger">저장</button>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	</form>

</section>
<script src="/resources/js/calendar.js"></script>
