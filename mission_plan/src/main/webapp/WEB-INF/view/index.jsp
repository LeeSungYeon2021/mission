<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">

<%@ include file="/WEB-INF/view/common/header.jsp"%>
<section>
	<div class="container">

		<table id="header_tbl">
			<thead>
				<tr>
					<th>

						<button type="button" id="prevBtn">
							<i class="fa fa-angle-left fa-2x"></i>
						</button> <input type="text" id="currentYear" readonly> <input
						type="text" id="currentMonth" readonly>
						<button type="button" id="nextBtn">
							<i class="fa fa-angle-right fa-2x"></i>
						</button>

					</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<th><span id="plan_countAll"></span></th>
				</tr>
			</tbody>
		</table>

		<table class="table table-bordered" id="body_table">
			<thead>
				<tr>
					<td style="color: red;">일</td>
					<td>월</td>
					<td>화</td>
					<td>수</td>
					<td>목</td>
					<td>금</td>
					<td style="color: skyblue;">토</td>
				</tr>
			</thead>

			<tbody>

			</tbody>
		</table>



		<!-- 일정 modal -->
		<form action="${path }/plan_enroll" method="post">
			<div class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">일정 등록</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div>
								<span>구분</span>
								<select id="plan_select" name="plan_select">
									<option value="일반">일반</option>
									<option value="중요">중요</option>
								</select>
							</div>
							<div>
								<input id="plan_startDate" type="date" name="plan_startDate">
								<input id="plan_endDate" type="date" name="plan_endDate">
							</div>
							<div>
								<input name="plan_title" class="form-conrol" id="plan-title" type="text"
									placeholder="일정 제목을 입력해주세요"> <br /> <br />
							</div>
							<div id="plan_content">
								<textarea name="plan_content"></textarea>
							</div>
						</div>
						<div class="modal-footer">
							<button id="enrollBtn" type="submit" class="btn btn-primary">등록</button>
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