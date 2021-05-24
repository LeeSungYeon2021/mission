<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>

<%@ include file="/WEB-INF/view/common/header.jsp"%>

<body>
	
			<span class="dropdown" data-toggle="dropdown" >
    Action
  </span>
  
	<div class="dropdown-menu"></div>
    <!-- <span class="dropdown-item">sss</span> -->

</body>
<!-- <script src="/resources/js/index.js"></script> -->

<script>
	$(".dropdown").click(function(e) {
		console.log('dfsdf?');
		let s = $("<span>");
		s.attr('class','dropdown-item').html("123123");
		$(".dropdown-menu").append(s);
		var x = e.clientX;

		var y = e.clientY;

			console.log('nxt', x, y);
			s.css({
				'left': '200px',
				'top':'200px'
			})
	})
</script>