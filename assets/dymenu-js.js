/*jQuery(document).on('click', '.item-edit', function(e){
		e.preventDefault();

		var menuItem = jQuery(this).closest('.menu-item');

		menuItem
			.toggleClass('menu-item-edit-active')
			.toggleClass('menu-item-edit-inactive');

		menuItem
			.find('.menu-item-settings')
			.slideToggle();
		});*/

jQuery(document).ready(function($) {
	
	
	
	
	$('.bbwd_d_m_select').change(function(){
		let bbwdSelVals = $(this).val();
		let bbwdHidSelAtt = $(this).attr('data-hide-target');
		let bbwdHidSel = $('#'+bbwdHidSelAtt);
		let bbwdNewValS = '- ';
		$(bbwdSelVals).each(function(i){
			let bbwdSeper = '';
			if(i != 0){
				bbwdSeper = ',';
			}
			bbwdNewValS = bbwdSelVals;
		});
		
		bbwdSelVals = bbwdSelVals == '' ? 'all' : bbwdSelVals;
		$(bbwdHidSel).val(bbwdSelVals);
	});
	
	$('#add-custom-menu-item').on('click', function() {
		var postType = $('#custom_menu_item_type').val();
		var postTax = $('#custom_menu_item_tax').val();
		var menuId = $(this).attr('data-menu-id'); // The menu ID (in this case, dynamic menu ID)
		var nonce = $(this).attr('data-bbwd-gib');
		var nonceColumn = $('#menu-settings-column-nonce').val();
		var theMenuItems = $('menu-to-edit li.menu-item');
		
		/*var test = {
						action: 'bbwd_add_dm_menu_item', 
						menu_id: menuId,
						post_type: postType,
						post_tax: postTax,
						menuSettingsColumnNonce: nonceColumn,
						nonce: nonce,
						bbwd_gib_checker: nonce,
						_ajax_nonce: bbwdDymenuJSObj.nonce,
					};
		console.log(test);*/
		
		
		if (postType !== 'none') {
			$.ajax({
				url: bbwdDymenuJSObj.ajaxurl,
				type: 'POST',
				data: {
					action: 'bbwd_add_dm_menu_item', 
					menu_id: menuId,
					post_type: postType,
					post_tax: postTax,
					menuSettingsColumnNonce: nonceColumn,
					nonce: nonce,
					bbwd_gib_checker: nonce,
					_ajax_nonce: bbwdDymenuJSObj.nonce,
				},
				success: function(response) {
					console.log(response);
					if (response.success) {
						$('#menu-to-edit').append(response.data.menu_html);
						$(document).trigger('menu-item-added');
						//window.location.reload();
					} else {
						alert('Failed to add custom menu item. Error message: '+response.data);
					}
				}
			});
		}else{
			alert("Please select the post type to add to the menu.");
		}
	});
	
	$('a[data-bbwd-remove-item]').each(function(){
		$(this).click(function(){
			bbwdDMRemoveItem($(this));
		});
	});
});


function bbwdDMRemoveItem(ele){
	let bbwdIDForDel = jQuery(ele).attr('data-bbwd-remove-item');
	let bbwdDMLiForDel = jQuery('li#menu-item-checkbox-'+bbwdIDForDel);
	jQuery(bbwdDMLiForDel).find('.menu-item-handle').css('background', 'red');
	console.log(jQuery(bbwdDMLiForDel).children('.menu-item-handle'));
	jQuery(bbwdDMLiForDel).fadeOut(500,'linear',function(){jQuery(bbwdDMLiForDel).remove();});
	
}
