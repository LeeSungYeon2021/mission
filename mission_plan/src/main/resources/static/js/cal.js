/**
 * 
 */
 
 $(function() {

});

$("#cal").click(function() {
	let l_date = new Date();
	let l_subDate = l_date.toISOString().substring(0, 8).replaceAll('-', '');	
	let url = '/cal?day='+l_subDate;
	$("#cal").attr('action',url);
})


