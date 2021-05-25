<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>

<%@ include file="/WEB-INF/view/common/header.jsp"%>

<body>
	<input type="text" value="test" id = "test" j-sname="tt">
	<ul>
		<li class="tsts" data-tsts="dddd">ddd</li>
	</ul>
</body>
<!-- <script src="/resources/js/index.js"></script> -->

<script>
/* console.log($(".tsts").j('sname')); */
$("#test").setAttribute('ddd');
</script>