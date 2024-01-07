(function ($) {

	"use strict";

	var fullHeight = function () {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	const updateTableVisibility = () => {
		if ($('#tasks-body tr.selected').length > 0) {
			$('head').append('<style id="print-styles">@media print { #tasks-body tr:not(.selected) { display: none; } }</style>');
		} else {
			$('style#print-styles').remove();
		}
	};

	let touchStartX = 0;
	let touchEndX = 0;
	const swipeThreshold = 50;

	$(document).on('touchstart', function (e) {
		touchStartX = e.originalEvent.touches[0].pageX;
	});

	$(document).on('touchmove', function (e) {
		touchEndX = e.originalEvent.touches[0].pageX;
	});

	$(document).on('touchend', function () {
		const deltaX = touchEndX - touchStartX;

		// Check if it's a left swipe
		if (deltaX < -swipeThreshold && $('#sidebar').hasClass('active')) {
			$('#sidebar').removeClass('active');
			$('body').removeClass('sidebar-active');
			$('#tasks-body tr').removeClass('selected');
			updateTableVisibility();
		}
	});

	$(document).on('click', function (e) {
		if (!$(e.target).closest("#sidebar, #sidebarCollapse").length) {
			$("#sidebar").removeClass('active');
			$('body').removeClass('sidebar-active');
		}
	});

	$(document).on('click touchend', '#tasks-body tr', function (e) {
		e.preventDefault();
		if (!$('#sidebar').hasClass('active')) {
			$(this).toggleClass('selected');
			console.log('clicked/touched');
			updateTableVisibility();
		}
	});

	$('#sidebarCollapse').on('click', function (e) {
		e.stopPropagation(); // Prevent the click event from reaching the document
		$('#sidebar').toggleClass('active');
		$('body').toggleClass('sidebar-active');
	});

	$('#homeSubmenu a, #pageSubmenu a').on('click', function () {
		$('#home').removeClass('active');
	});

	$('.dropdown-toggle').on('click', function () {
		var targetSubmenu = $($(this).attr('href'));

		$('.dropdown-toggle').attr('aria-expanded', 'false');
		$('.collapse.list-unstyled').not(targetSubmenu).collapse('hide');
	});

	$('.collapse a').on('click', function (e) {
		e.preventDefault();
		var area = $(this).attr('href');

		Swal.fire({
			title: '<i class="fa-solid fa-cog fa-spin fa-spin-reverse"></i> Loading...',
			allowOutsideClick: false,
			showConfirmButton: false,
			color: `#fff`,
			background: `rgba(255,255,255,0)`,
		});

		$.ajax({
			url: '/tasks/' + area,
			method: 'GET',
			success: function (data) {
				Swal.close();
				$('th.table-title').text(`${data.area} (${data.date})`);
				$('#tasks-body').html(data.tasks);
				/**
				 * ? Need to refactor again to stop scrolling when tbody has only message about lack of tasks
				 */
				// if ($('#tasks-body tr').length < 2 ||
				// 	$('body').hasClass('sidebar-active')) {
				// 	$('body').css('overflow', 'hidden');
				// } else {
				// 	$('body').css('overflow', 'auto');
				// };
			},
			error: function (error) {
				$('#loadingModal').modal('hide');
				console.error('Error fetching data:', error);
			}
		});
	});

	$('#print-btn').on('click', function () {
		window.print();
	})

})(jQuery);