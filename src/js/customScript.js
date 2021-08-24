jQuery(document).ready(function() {
	 $('.res_menu_icon').on('click', function (e) {
		 console.log('This is working');
	$('.res_menu_icon').toggleClass('active res_menu_icon_n');
	$('body').toggleClass('show_menu_body');
	$('body').removeClass('show_user_menu_body');
	
	if($('.left_main').hasClass('show_menu')){
		$('.left_main').removeClass('show_menu');
		}else{
			$('.left_main').addClass('show_menu');
	}

	$('.navbar-collapse.left_main').removeClass('in');
	 $('a[aria-expanded=true]').attr('aria-expanded', 'false');
	 
	 e.preventDefault();
	 });
	 
	 $('.responsive_user_icon').on('click', function (e) {
	$(this).addClass('responsive_user_icon_active');
	$('body').addClass('show_user_menu_body');
	$('body').removeClass('show_menu_body');
	$('.res_menu_icon').removeClass('active');
	$('.res_menu_icon').addClass('res_menu_icon_n');
	$('.top_search_area').slideUp(100);
	e.preventDefault();
	});
	 $('.r_user_close').on('click', function (e) {
	$('.responsive_user_icon').removeClass('responsive_user_icon_active');
	$('body').removeClass('show_user_menu_body');
	$('.top_search_area').slideUp(100);
	e.preventDefault();
	});
	
	
	
	if($(window).innerWidth() <= 992) { 
	$('.responsive_search_icon').on('click', function (e) {
	$('.top_search_area').slideToggle(100);
	$('body').removeClass('show_menu_body');
	e.preventDefault();
	});
	}
	
$(".my_session_box_doct").each(function() {
	var $more = $(this).find(".my_session_more");
	var $less = $(this).find(".my_session_less");
	var $text = $(this).find(".my_session_box_doct_text");
	$($more).on('click', function(e){
		$($text).slideDown(400);
		$(this).slideUp(0);
		e.preventDefault();
	});
	$($less).on('click', function(e){
		$($more).slideDown(0);
		$($text).slideUp(400);
		e.preventDefault();
		
	});
});

 $('.slider_ground_area').slick({
  dots: true,
  infinite: true,
  speed: 500,
  arrow:true,
  centerMode: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
 });

//
/*$(".knw_row_java").each(function() {
var $viewSource_knC = $(this).find(".viewSource_knC_link");
var $knowledge_Capsule_row3 = $(this).find(".knowledge_Capsule_row-3");
$($viewSource_knC).on('click', function(e){
$($knowledge_Capsule_row3).slideToggle(400);
$(this).toggleClass("active");
e.preventDefault();
});

});*/
/*$(".knw_row_java").each(function() {
	var $viewSource_knC = $(this).find(".viewSource_knC_link");
	var $knowledge_Capsule_row3 = $(this).find(".knowledge_Capsule_row-3");
	$($viewSource_knC).on('click', function(e){
		if(!$(this).hasClass("active")){
			$($knowledge_Capsule_row3).show();
			$(this).addClass("active");
		}else{
			$($knowledge_Capsule_row3).hide();	
			$(this).removeClass("active");
		}
		e.preventDefault();
	});
	
});*/
/*$(".viewSource_knC_link").on('click', function(){
	$(this.hash).slideToggle(400);
	$(this).toggleClass("active");
	
});*/


//p_profile_row_in

$(".p_profile_row_sub").addClass("p_profile_hide");
$(".p_profile_row_in").each(function() {
	if ($(this).find(".p_profile_row_sub").length > 2) {
            $(this).find(".p_profile_row_show_a").css("display","inline-block");
        }
    $(this).find(".p_profile_row_sub").slice(0, 2).show().removeClass("p_profile_hide");   
	});
	
 $(document).on('click','.p_profile_row_show_a', function (e) {
        e.preventDefault();
        $(this).parent().find(".p_profile_hide").toggleClass("p_profile_show").slideToggle('slow');
		$(this).toggleClass("active");
    });
	
	
//settings
$(".clinicSettingsView .settings2_content_row").each(function() {
var $viewDay_a = $(this).find(".clinicSett_view_a");
var $days_clinic_dtls = $(this).find(".days_clinic_mainS");
$($viewDay_a).on('click', function(e){
$($days_clinic_dtls).slideToggle(400);
$(this).toggleClass("active");
e.preventDefault();
});

});

//upcoming
  $('.my_session_slide').slick({
  dots: false,
  infinite: true,
  adaptiveHeight:true,
  speed: 300,
  centerMode: false,
  autoplay: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
  	{
      breakpoint: 1800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
	{
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    
	{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
  ]
});

//media_gallery_slider
  $('.media_gallery_slider').slick({
  dots: false,
  infinite: true,
  adaptiveHeight:true,
  speed: 300,
  centerMode: false,
  autoplay: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
  	{
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
	{
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    
	{
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
	{
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

//help
var helpLmtext = 180;
var moretext = "More";
var lesstext = "Less";
$(".help_ans_text").each(function() {
    var helpText = $(this).html();
	if(helpText.length > helpLmtext){
	 var c = helpText.substr(0, helpLmtext);
	 var html = '<div class="help_ans_text_1 help_ans_text_show">'+ c + '...' + '</div><div class="help_ans_text_2">'+ helpText +'</div><a href="javascript:void(0)" class="more_text_help_a">' + moretext + '</a>';
	 $(this).html(html);
	 }
	 
});
	$(".more_text_help_a").click(function(){
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).parent().children(".help_ans_text_1").toggleClass("help_ans_text_show").slideToggle(300);
			$(this).parent().children(".help_ans_text_2").toggleClass("help_ans_text_show").slideToggle(300);
		});

//profile image
   /*function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#chooseFile_image_preview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#chseImg_profile").change(function () {
        readURL(this);
    });

$(document).on('click','.chooseFile_image_remove', function(e){
	$('#chooseFile_image_preview').attr('src', 'images/demo_user.png');
	 e.preventDefault();
});*/

//grand rounds details 2
$(".grand_dtls-2-content").find('div,a,span,b,strong,p,ol,ul,img,li,h1,h2,h3,h4,h5,h6,article').attr('style','');
$(".grand_rounds_details-2 .addValue_link").parent("span").addClass("addValue_link-wrap");
});
 
 $(window).on('load resize',function(){
	 if($(window).innerWidth() >= 992) { 
	 $('.top_search_area').css('display','block');
	 }else{
		 $('.top_search_area').css('display','none');
		 }
 });
 
 
