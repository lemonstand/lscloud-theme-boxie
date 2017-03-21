(function($){

	$(document).ready(function() {

//===============
//! HOME CAROUSEL
//===============
		 $("#product-carousel").owlCarousel({
		 	itemsScaleUp: true,
		 	//autoPlay: true,
		 	//stopOnHover: true,
		 	navigation: true,
		 	navigationText: false,
		 	afterInit: function() {
		 		$('.owl-prev').addClass('fa fa-angle-left');
		 		$('.owl-next').addClass('fa fa-angle-right');
		 	}
		 });

//===============
//! RATING STARS
//===============
		 //Rating Star activator
     if ($('.star').length > 0) {
         $('.star').raty({
             starOff: 'images/star-off.png',
             starOn: 'images/star-on.png',
             score: function() {
                 return $(this).attr('data-score');
             }
         });
     }

     //
     // Star rating
     //
     $('.rating > span').click(function() {
         var currentId = $(this).attr('id');
         if (currentId === 'hate') {
             $('#hate').addClass('select');
             $('#dont-like, #ok, #like, #love').removeClass('select');
             $('.rating > p').text('I hate it');
             $("#item_rating").val('1');
         }
         if (currentId === 'dont-like') {
             $('#hate, #dont-like').addClass('select');
             $('#ok, #like, #love').removeClass('select');
             $('.rating > p').text('I don\'t like it');
             $("#item_rating").val('2');
         }
         if (currentId === 'ok') {
             $('#hate, #dont-like, #ok').addClass('select');
             $('#like, #love').removeClass('select');
             $('.rating > p').text('It\'s ok');
             $("#item_rating").val('3');
         }
         if (currentId === 'like') {
             $('#hate, #dont-like, #ok, #like').addClass('select');
             $('#love').removeClass('select');
             $('.rating > p').text('I like it');
             $("#item_rating").val('4');
         }
         if (currentId === 'love') {
             $('#hate, #dont-like, #ok, #like, #love').addClass('select');
             $('.rating > p').text('I love it');
             $("#item_rating").val('5');
         }

     });

//===============
//! SEARCH
//===============
		 var winWidth = $(window).width();
		 $(window).resize(function() {
		 	winWidth = $(window).width();
		 });

		 $('#search-form').on('click', '.search-btn.toggle', function(e) {
		 	$(this).addClass('close-search').find('.fa').toggleClass('fa-search fa-times').closest('#search-form').addClass('active');
		 	$('.search-form').focus();
		 });

		 $('#search-form').on('click', '.search-btn.toggle.close-search', function(e) {
	 		$(this).removeClass('close-search').find('.fa').removeClass('fa-times').addClass('fa-search').closest('#search-form').removeClass('active');
		 });

//===============
//! QUANTITY SELECTOR
//===============

		$(document).on('click', '.quantity-selector .minus', function() {
			var $el = $(this).closest('.quantity-selector').find('.quantity'),
				q = parseInt($el.val())-1;
			if (q > 1) {
				$el.val(q);
			}
		});

		$(document).on('click', '.quantity-selector .plus', function() {
			var $el = $(this).closest('.quantity-selector').find('.quantity'),
				q = parseInt($el.val())+1;
			$el.val(q);
		});

//===============
//! SINGLE PRODUCT
//===============
		function tipBottom() {
			$('[rel="tooltip"]').tooltip({
				placement: 'bottom'
			});
		}
		tipBottom();

		function singleProduct() {
			$('.product-img-zoom').each(function() {
				var href = $(this).data('lg');
				$(this).zoom({url: href});
			});

			$('#sharrre .twitter').sharrre({
	    		template: '<a href="#" rel="tooltip" title="Twitter: {total}"><i class="fa fa-twitter"></i></a>',
	    		share: {
	    			twitter: true
	    		},
	    		enableHover: false,
	    		enableTracking: true,
	    		click: function(api, options) {
	    			api.simulateClick();
	    			api.openPopup('twitter');
	    		},
	    		render: function() {
	    			tipBottom();
	    		}
	    	});

	    	$('#sharrre .facebook').sharrre({
	    		template: '<a href="#" rel="tooltip" title="Facebook: {total}"><i class="fa fa-facebook"></i></a>',
	    		share: {
	    			facebook: true
	    		},
	    		enableHover: false,
	    		enableTracking: true,
	    		click: function(api, options) {
	    			api.simulateClick();
	    			api.openPopup('facebook');
	    		},
	    		render: function() {
	    			tipBottom();
	    		}
	    	});

	    	$('#sharrre .pinterest').sharrre({
	    		template: '<a href="#" rel="tooltip" title="Pinterest: {total}"><i class="fa fa-pinterest"></i></a>',
	    		share: {
	    			pinterest: true
	    		},
	    		enableHover: false,
	    		enableTracking: true,
	    		click: function(api, options) {
	    			api.simulateClick();
	    			api.openPopup('pinterest');
	    		},
	    		render: function() {
	    			tipBottom();
	    		}

	    	});
		}
		singleProduct();

		$(document).on('change', 'select.product-option', function () {
			$(this).sendRequest('shop:product', {
				update: {
					'#product-images': 'shop-product-gallery'
				},
				onAfterUpdate: function() {
					singleProduct();
				}
			});
		});

//===============
//! AJAX / Shop
//===============
		$('.btn-quick-view').on('click', function() {
			var $el =$(this),
				href = $(this).attr('href') + ' #single-product';

			$el.find('.fa').removeClass('fa-eye').addClass('fa-refresh fa-spin');

			$('#product-quick-view').find('.modal-body').load( href, function() {
				$(this).closest('#product-quick-view').modal({
					show: true
				});
				$el.find('.fa').removeClass('fa-refresh fa-spin').addClass('fa-eye');
				singleProduct();
			});

			return false;
		});

		$(document).on('click', '.page-items-controller a', function() {
			$(this).addClass('active').html('<i class="fa fa-refresh fa-spin"></i>').siblings().removeClass('active');
		});

//===============
//! AJAX / Cart
//===============
		var cartFlag = new $.Deferred();

		$(document).on('click', '.btn-add-cart', function() {
			cartFlag.resolve();

			$(this).prepend('<i class="fa fa-refresh fa-spin"/>');
		});

		$('.btn-update-cart').on('click', function() {
			cartFlag.resolve();

			$(this).find('.fa').addClass('fa-spin');
		});

		$('body').on('click', '.remove-item', function() {
			cartFlag.resolve();

			$(this).find('.fa').removeClass('fa-times').addClass('fa-refresh fa-spin');
		});

		$(document).ajaxComplete(function() {
			$('.btn-add-cart').find('.fa-refresh').remove();
			$('.btn-update-cart').find('.fa-refresh').removeClass('fa-spin');

			$.when(cartFlag).then(function() {
				$('#navbar-totals').addClass('active');
				setTimeout(function() {
					$('#navbar-totals').removeClass('active');
					cartFlag = new $.Deferred();
				}, 500);
			});
		});

//===============
//! Checkout
//===============
		//Chosen selects
		$(".chzn-select").chosen({
	        width: "100%"
	    });
	    $(window).on('onAjaxAfterUpdate', function() {
	        $(".chzn-select").trigger("chosen:updated");
	        $(".chzn-select").chosen({
	            width: "100%"
	        });
	    });

		//Next step btn
		$(document).on('click', '.btn-checkout-step', function() {
			$(this).find('.fa').removeClass('fa-arrow-right fa-arrow-left fa-money').addClass('fa-refresh fa-spin');
		});
		//Next step error btn
		$(window).on('onAjaxFailure', function() {
			$('.btn-checkout-step .fa').removeClass('fa-refresh fa-spin').addClass('fa-arrow-right');
		});


		//ADDRESS
		$(document).on('click', '.btn-form-mirror', function() {
			if ($(this).data('toggle-mirror') == 'on') {
				$(this).data('toggle-mirror', 'off').find('.fa').css('visibility', 'hidden');
				sessionStorage.toggleMirror = 'off';
			} else {
				$(this).data('toggle-mirror', 'on').find('.fa').css('visibility', 'visible');
				sessionStorage.toggleMirror = 'on';
				mirrorAll();
			}
		});

		// mirror toggle button
		$(window).on('onAjaxAfterUpdate', function() {
			if ($('.btn-form-mirror').length && sessionStorage.toggleMirror == 'off') {
				$('.btn-form-mirror').data('toggle-mirror', 'off').find('.fa').css('visibility', 'hidden');
				$('#shipping-info').addClass('in');
			}
		});

		//mirror source and destination fields
		function mirrorFields($mirrorSource, $mirrorTarget, event) {
			$($mirrorSource).each(function(idx) {
				$(this).on(event, function() {
				    var mirrorVal = $(this).val();
				    if ($('.btn-form-mirror').data('toggle-mirror') == 'on') {
						$($mirrorTarget + ':eq('+idx+')').val(mirrorVal);
				    }
				});
			});
		}

		mirrorFields('#billing-info [data-mirror]', '#shipping-info [data-mirror]', 'keyup keypress blur change');
		//mirrorFields('#billing-info select[data-mirror]', '#shipping-info select[data-mirror]', 'change');

		//mirror all fields
		function mirrorAll() {
			$('#billing-info [data-mirror]').each(function(idx) {
			    var mirrorVal = $(this).val();
				$('#shipping-info [data-mirror]:eq('+idx+')').val(mirrorVal);
			});
			//trigger change to update the state list
			$('#shipping_country[data-mirror]').trigger('change');
		}
		$(window).load(function() {
			if ($('.btn-form-mirror').data('toggle-mirror') == 'on') {
				mirrorAll();
			}
		});

		//country select
		var tracker = false;

		$('#billing_country[data-mirror]').on('change', function() {
			if ($('.btn-form-mirror').data('toggle-mirror') == 'on') {
			   tracker = true;
		    }
		});
		//update shipping only once
		$(window).on('onAfterAjaxUpdate', function(){
			if (tracker == true) {
				$('#shipping_country[data-mirror]').change();
				console.log('ajax done');
				tracker = false;
			}

			//force the shiping state to update if it's value is different ie. after a page refresh
			if ($('#shipping_state[data-mirror]').val() != $('#billing_state[data-mirror]').val()) {
				$('#shipping_state[data-mirror]').val($('#billing_state[data-mirror]').val());
			}
		});

		//SHIPPING
		 //Checkout Shipping Methods - update cart
	    $('#checkout-page').on('change', '#shipping-methods input', function() {
	        // When the shipping method is shipping we want to update the
	        // order totals area on the Checkout page. The native Checkout
	        // action does all the calculations.
	        //
	        $(this).sendRequest('shop:checkout', {
	            update: {
	                '#cart-totals': 'shop-checkout-totals',
	                '#mini-cart': 'shop-minicart'
	            }
	        });
	        $('#cart-totals .order-shipping .badge').html('<i class="fa fa-refresh fa-spin"/>');
	    });

	    //PAY
	    //Payment forms LEMONSTAND
	    $(document).on('change', '#payment_method input', function() {
	        $('#payment_form').html('<i class="fa fa-refresh fa-spin"/>');
	        $(this).sendRequest('shop:onUpdatePaymentMethod', {              
	            update: {
	                '#payment_form': 'shop-paymentform'
	            }        
	        });
	    });

	    //CC Validation
	    $(document).ajaxComplete(function() {
			if ('#checkout-page') {

			   if ($('.credit-card-input').length) {
			        $('.credit-card-input').validateCreditCard(function(result) {
			            if (result.length_valid === true) {
			                $('.credit-card-input').next('label')
			                	.html(result.card_type.name).append(' <i class="fa fa-check-circle" />')
			                	.parent().removeClass('invalid').addClass('valid');

			            } else {
			                $('.credit-card-input').next('label').html('Credit Card Number').parent().removeClass('valid').addClass('invalid');
			            }
			        });
			        if ($('.credit-card-input').val() == '') {
			           $('.credit-card-input').parent().removeClass('valid invalid');
			        }
			    }

				$('.fa-question').on({
					'mouseenter': function() {
						$(this).popover('show');
					},
					'mouseleave': function() {
						$(this).popover('hide');
					}
				});
			}
		});


//===============
//! Equalize row heights
//===============
		var container = document.querySelector('.product-grid > .row');
		var msnry;
		if ($('.product-grid').length) {
			imagesLoaded( container, function() {
				msnry = new Masonry( container, {
					itemSelector: '.product-holder'
			  });
			  console.log('loaded');
			});
		}

	});

})(jQuery);

function writeReview() {
    $('#productWriteModal').modal('show');
}
