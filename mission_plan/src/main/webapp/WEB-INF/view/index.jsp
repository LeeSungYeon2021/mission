<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">

<%@ include file="/WEB-INF/view/common/header.jsp"%>
<style>
	#gg input[type=checkbox]:checked {
	color:red;
	background-color:black;
	}
</style>
<section>
	<a style="font-size:30px; font-weight:bold;"href="/calendar">달력보기</a>
	<input type="checkbox" id="gg">
</section>
<script>
	/* $("#gg").click(function() {
		if($("input[type=checkbox]:checked")) {
			$("#gg").css('background-color','red');	
		}
		console.log('dfsdf?');
		
	}) */
</script>
<%@ include file="/WEB-INF/view/common/footer.jsp"%>
