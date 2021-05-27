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
				<td><c:out value="${year }" /></td>
				<td><c:out value="${month }" /></td>
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
				<c:forEach var="dayList" items="${dayList}" varStatus="status">
					<c:if test="${status.index%7==0}">
			</tr>
			<tr>
				</c:if>
				<c:choose>
					<c:when test="${dayList == 0}">
						<td></td>
					</c:when>
					<c:otherwise>
						<td>
							<span><c:out value="${dayList }" /></span> 
							<span>count</span>								
							<ul class="list-group">
							<c:if test="${dayList == 20}">
								<li class="list-group">일정1</li>
							</c:if>
								<li class="list-group">일정2</li>
							</ul></td>
					</c:otherwise>
				</c:choose>
				</c:forEach>
			</tr>
		</tbody>
	</table>
</section>

