$(function(){
if (localStorage.getItem('firstNotTime') == null){
	localStorage.setItem('firstNotTime',Date.now());
}
var firstNotTime = localStorage.getItem('firstNotTime');
$(".ft_nti_chk").each(function(){
	if (parseInt($(this).data("time"))<parseInt(firstNotTime)){
		$(this).addClass("iv");
	}
});
$.fn.inputFilter = function(callback, errMsg) {
  return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function(e) {
    if (callback(this.value)) {
      // Accepted value
      if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
        $(this).removeClass("input-error");
        this.setCustomValidity("");
      }
      this.oldValue = this.value;
      this.oldSelectionStart = this.selectionStart;
      this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty("oldValue")) {
      // Rejected value - restore the previous one
      $(this).addClass("input-error");
      this.setCustomValidity(errMsg);
      this.reportValidity();
      this.value = this.oldValue;
      this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    } else {
      // Rejected value - nothing to restore
      this.value = "";
    }
  });
};
	
	if (localStorage.getItem('notTime') == null){
		localStorage.setItem('notTime',Date.now());
	}
	$('body').addClass("init_ani");

	$(document).mouseup(function (e) {
	/*
	if ($("body").hasClass("show_menu")){
		if ($(e.target).closest(".header_nav").length=== 0){
			$("body").removeClass("show_menu");			
			$("body").removeClass("show_submenu");			
			$(".show_submenu").removeClass("show_submenu");		 	
			$("body").removeClass("show_mem_menu");	
		}
	}
	*/
	if ($(e.target).closest(".search_section").length=== 0) {
		$(".search_section").slideUp();
		return;
	}
	});

var gfiRead = localStorage.getItem('gfiRead');
if (gfiRead==null){gfiRead = "[]";}
gfiRead = JSON.parse(gfiRead);	
notBadgeCheck();
function notBadgeCheck(){
	var lastReadTime = localStorage.getItem('notTime');
	if (lastReadTime!= null && lastReadTime!=""){
		var badgeNo = 0;
		$(".noti_item").each(function(){
			if (parseInt($(this).data("time"))>=parseInt(lastReadTime)){
				$(this).addClass("is_new_msg");
				badgeNo++;
			}
		});
		jQuery(".noti_badge").html(badgeNo);
		if (badgeNo == 0){ 
			jQuery(".noti_badge").fadeOut();
		} else {
			jQuery(".noti_badge").fadeIn();			
		}
		
	}
}

$(".cancer-body a").each(function(){
	var link = $(this).attr("href");
	if (gfiRead.includes(link)){
		$(this).find(".cancer_item").addClass("rainbow_item");
	}	
});
$(".cm_list_item").click(function(){
	$(this).addClass("active");

});
$(".cm_list_item").each(function(){
	var link = $(this).parent().attr("href");
	if (gfiRead.includes(link)){
		$(this).addClass("rainbow_item");
	}	
});

	$('#search_form').submit(function(e){		e.preventDefault();$('.search_field_ic').click();});
	$('.pw_tog').click(function(){
		jQuery(this).toggleClass("show_pw");
		if (jQuery(this).hasClass("show_pw")){
			jQuery(this).parent().find("input").attr("type","text");
		} else {
			jQuery(this).parent().find("input").attr("type","password");
		}
	});
	$('.search_field_ic').click(function(){
		$(".show_submenu").removeClass("show_submenu");		 	
		$("body").removeClass("show_submenu");			
		$("body").removeClass("show_mem_menu");			
		var datastring = $("#search_form").serialize();
		$.ajax({
			type: "POST",
			data: datastring, 
			dataType: "json",
			success: function(data) {
				$("#search_results_wrp .search_inner").html("");
				$("#search_results_wrp").removeClass("hasResult");
				var searchHtml = "";
				if (data.data.length>0){
					data.data.forEach(function(v){
						searchHtml += "<a href='"+v.link+"' class='search_itm'>"+v.label+"</a>";
					});
					$("#search_results_wrp").addClass("hasResult");
				}
				$("#search_results_wrp .search_inner").append(searchHtml);
			},
			error: function(data) {
			    console.log("===error===");
			    console.log(data);
			    console.log("===error===");
			}
		});		
	});
	$('.mobile_side_menu_toggle').click(function(){
		jQuery("body").toggleClass("show_smart_dropdown");

	});
	$('.guest_mode .jsfill').each(function(){
		console.log("loaded3");
		var tar = jQuery(this).attr("jtar");
		console.log(tar);
		var ls_fieldName = "spp_"+tar;
		var fillVal = localStorage.getItem(ls_fieldName);
		if (jQuery(this).is("select")){
			jQuery(this).val(fillVal);
		} else if (jQuery(this).is("input")){
			jQuery(this).val(fillVal);
		} else {
			jQuery(this).html(fillVal);
		}
	});
	$('.ft_mem_menu_toggle').click(function(){
		$(".show_submenu").removeClass("show_submenu");			
		$("body").addClass("show_mem_menu");
	});
	$('.ft_show_noti').click(function(){
		localStorage.setItem('notTime',Date.now());
		notBadgeCheck();
		$('body').toggleClass("show_noti");
	});
	$('.search_field_clear').click(function(){
		$('#header_search_field').val("");
	});	
	$('.search_toggle').click(function(){
		$(".show_submenu").removeClass("show_submenu");		 	
		$("body").removeClass("show_submenu");			
		$("body").removeClass("show_mem_menu");			
		jQuery(".search_section").slideToggle();
	});
	$('.mcard_quote_btn').click(function(){
		if ($(this).hasClass("show")){
			$(this).removeClass("show");
		} else {
			$('.mcard_quote_btn').removeClass("show");
			$(this).addClass("show");			
		}
	});
	$('.cm_pop_msg').click(function(){
		$(this).fadeOut();
	});
	setTimeout(function(){$('.cm_pop_msg').fadeOut();},5000);
	$('#lang_switch').change(function(){
		var url = $(this).val();
		
		window.location.replace(url);
	});
	$('#resource_filter').change(function(){
		var currentCate = $(this).val();
		if (currentCate!=""){
			var html = $(".subfilter_blueprint[tar="+currentCate+"]").html();
			$("#subfilter_html_wrapper").html(html);
		} else {
			$("#subfilter_html_wrapper").html("");			
		}
	});	






	$('.filter_wrapper').on("change",".resource_subcategory",function(){
		if ($(this).val()!=""){
			$("#resource_cate_id").val($(this).val());
			$("#resource_form").submit(); 			
		}
	});
	$('.mobile_menu_toggle').click(function(){
		$("#header_search_field").val("");
		$("#search_results_wrp").removeClass("hasResult");
		$("body").toggleClass("show_menu");
		jQuery(".show_noti").removeClass("show_noti");
		$(".show_submenu").removeClass("show_submenu");			
		$("body").removeClass("show_submenu");			
		$("body").removeClass("show_mem_menu");			
	});
	$('.section_sm_item').click(function(){
		var tar = $(this).attr("tar");
		
		$('html, body').animate({
		    scrollTop: $(".content_row[tar='"+tar+"']").offset().top-120
		}, 500);
		$("body").removeClass("show_smart_dropdown");
	});
	$('.close_submenu_btn').click(function(){
		$(".show_submenu").removeClass("show_submenu");			
		$(".show_mem_menu").removeClass("show_mem_menu");			
		jQuery(".show_noti").removeClass("show_noti");
	});


	$('.submenu_toggle').click(function(){
		$(this).parent().toggleClass("show_submenu");
		if ($(this).parent().hasClass("show_submenu")){
			$("body").addClass("show_submenu");
		} else {
			$("body").removeClass("show_submenu");			
		}
	});
	$('.hp_slider ul').slick({
		dots:true,arrows:true,autoplay: true,  autoplaySpeed: 3000,adaptiveHeight:true,nextArrow:"<div class=\'hp_mgtb_text_narrow\'><i class=\'fa-solid fa-arrow-right-long\'></i></div>",prevArrow:"",
	});

	if ($('.popup_slide_wrapper').length>0){
		$("body").addClass("showing_popup");
		$('.popup_slide_wrapper').slick({
			dots:true,arrows:true,autoplay: false,  autoplaySpeed: 3000,adaptiveHeight:true,nextArrow:"<div class=\'hp_mgtb_text_narrow\'><i class=\'fa-solid fa-arrow-right-long\'></i></div>",prevArrow:"<div class=\'hp_mgtb_text_parrow\'><i class=\'fa-solid fa-arrow-left-long\'></i></div>",
		});
		$(".popup_slide_wrapper a").on("click", function (){
			$('.popup_slide_wrapper video').each(function() {
			    $(this).get(0).pause();
			});
		});
		$(".popup_slide_wrapper").on("beforeChange", function (){
			$('.popup_slide_wrapper video').each(function() {
			    $(this).get(0).pause();
			});
		});	

		$(document).on("click",".popklink", function (event) {
			var vdoDom = $(this).parent().find("video");
			if (vdoDom.length>0){
				event.preventDefault();
				vdoDom.get(0).pause();
				var secC = vdoDom.get(0).currentTime;
				var lnk = $(this).attr("href");
				lnk += "&t="+secC+"s";
				window.open(lnk, '_blank');
			}
		});
		$(document).on("click",".popup_close", function (event) {
			$("body").removeClass("showing_popup");
			if($("#dontShowSelect").is(':checked')){
				localStorage.setItem("dontShow", $.now());
			}
			jQuery(".popup_outer_wrapper").fadeOut(500,function(){
				jQuery(".popup_outer_wrapper").remove();
			});
		});
		if(localStorage.getItem("dontShow")) {
			var tt = localStorage.getItem("dontShow");
			if (($.now() - tt) <= 86400000){
		    $(".popup_close").click();
				// $(".popup_outer_wrapper").addClass("show");
			}	else {
				$(".popup_outer_wrapper").addClass("show");
			}	
		}	else {
			$(".popup_outer_wrapper").addClass("show");
		}	

		$(window).resize(function(){
			console.log("resize loaded");
			$('.popup_slide_wrapper')[0].slick.refresh();
		});
		if (jQuery(".popup_slide").length<=1){
			jQuery(".popup_slide_wrapper .slick-dots").hide();
		}
	}

	$(window).scroll(function (event) {
		scrollTrigger();
	});
	function scrollTrigger(){
	    var scrollTop = $(window).scrollTop();
	    var fintar;
	    $(".content_row").each(function(){
	    	if ($(this).attr("tar")!=""){
		    	if (scrollTop >= $(this).offset().top-($(window).height()/2)){
		    		var tar = $(this).attr("tar");
		    		$(".section_sm_item.active").not(".without_scroll_trigger").removeClass("active");
		    		$(".section_sm_item[tar='"+tar+"']").addClass("active");
		    		$(".mobile_side_menu_toggle_inner").html($(".section_sm_item[tar='"+tar+"']").html());
		    		fintar = $(".section_sm_item.active").position().top;
		    	}	    		
	    	}
	    });
	    $('.cm_pg_content_lcol').animate({scrollTop: fintar}, 10);
	    if ($(".section_side_menu").length>0){

					var deltaBottom = $(".footer_dm").outerHeight()-($(".footer_dm").offset().top + $(".footer_dm").outerHeight() - (scrollTop+$(window).height()))+10;
					if (deltaBottom <= 10){
						deltaBottom = 10;
					}
		   		$(".cm_pg_content_lcol").css("bottom",deltaBottom);
		   	
	    	
	    }
	   	if (jQuery(".cm_pg_content_lcol").length>0){
//			var bannerPosDelta = jQuery("#detail_banner").offset().top + jQuery("#detail_banner").height()-8;
			var bannerPosDelta = 0;
			if (jQuery("#detail_banner").length==0){
				bannerPosDelta = 140;
			}	
			if (jQuery(".breadcrumb").length > 0){
				if (jQuery(".cm_pg_title").hasClass("iv")){
					bannerPosDelta = 90;
				} else {
					bannerPosDelta = 170;
				}
			}

			var menuPosY = bannerPosDelta - $(window).scrollTop()+10;
			if (menuPosY<60){menuPosY = 60;}


			if (jQuery(window).width()<900){
				if (menuPosY<70){menuPosY = 70;}
				$(".mobile_side_menu_toggle").css("top",menuPosY);	   		
				$(".cm_pg_content_lcol ").css("top",(menuPosY+$(".mobile_side_menu_toggle").height()+24));
			} else {
				$(".cm_pg_content_lcol").css("top",menuPosY);
			}
	   	}
	}
	scrollTrigger();

	jQuery(".ft_copy_url").click(function(e){
		navigator.clipboard.writeText(jQuery("#share_url_full").val());
		jQuery(this).attr("class","fa-solid fa-check copied");
	});
	jQuery(".content_row img").click(function(e){
		var src = jQuery(this).attr("src");
		var appendHtml = "<div class='pop_img_wrp'><div class='pop_close'><span><i class='fa-solid fa-xmark'></i></span></div><div class='pop_img_inner'><img src='"+src+"'/></div></div>";
		jQuery("body").append(appendHtml);
		jQuery(".pop_img_wrp").fadeIn();
	});
	jQuery("a.ft_show_overlay").click(function(e){
		e.preventDefault();
		var tar = jQuery(this).attr("tar");
		jQuery(".over_study_overlay[tar='"+tar+"']").fadeIn();
	});
	jQuery(".ft_close_over_study").click(function(){
		jQuery(".over_study_overlay").fadeOut();
	});

$(document).on("click","body.show_submenu", function (event) {
  if ($(event.target).closest(".submenu,.have_submenu").length === 0) {
    jQuery(".show_submenu").removeClass("show_submenu");
  }
});
$(document).on("click",".pop_close", function (event) {
	jQuery(".pop_img_wrp").fadeOut(500,function(){
		jQuery(".pop_img_wrp").remove();
	});
});

$(document).on("click","body.show_menu", function (event) {
  if ($(event.target).closest(".main_header .inner_wrapper,.search_section").length === 0) {
    jQuery(".show_noti").removeClass("show_noti");
    jQuery(".show_menu").removeClass("show_menu");
    jQuery(".show_mem_menu").removeClass("show_mem_menu");
  }
});
jQuery(".cm_pg_content").css("min-height",jQuery(window).height()-jQuery(".main_header").height()-jQuery(".footer_dm").height()-278);


jQuery(".ga_click_trigger").click(function(){
	var clickEventName = jQuery(this).data("click");
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});
jQuery(".add_symrpt_btn").click(function(){
	var clickEventName = "symptom_diary_record_button_click";
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});
jQuery(".ft_submit_phy_report").click(function(){
	var clickEventName = "symptom_diary_physical_submit";
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});
jQuery("#cont_questionaire").click(function(){
	var clickEventName = "symptom_diary_continue_button_click";
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});
jQuery("#skip_questionaire").click(function(){
	var clickEventName = "symptom_diary_skip_button_click";
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});
jQuery(".ft_submit_report").click(function(){
	var clickEventName = "symptom_diary_mental_submit";
	console.log("clickEventName: "+clickEventName);
	var isLogin = "true";
	if (jQuery("body").hasClass("guest_mode")){
		isLogin = "false"; 
	} 
	gtag('set', 'user_properties', { 'is_logged_in_user': isLogin });	
	gtag("event", clickEventName, {
	  is_logged_in_user: isLogin,
	});
});


})
