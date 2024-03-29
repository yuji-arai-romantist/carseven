const Runjs = { init: function () {

  'use strict';

  // Point more
  $(function () {
    let $point = $('.js-point-item');
    let $pointMore = $point.next('.linkMore');
    $point.find('>.__col:nth-child(n+5)').hide();
    $pointMore.on('click', function () {
      if ($(this).hasClass('is-open')) {
        $point.find('>.__col:nth-child(n+5)').hide();
        $(this).removeClass('is-open');
        $pointMore.find('>a >span').text('全てのポイントプログラムを⾒る');
      } else {
        $point.find('>.__col').slideDown();
        $(this).addClass('is-open');
        $pointMore.find('>a >span').text('ポイントプログラム一覧を閉じる');
      }
      let position = $('#anc-point').offset().top;
      $('html, body').animate({ scrollTop: position }, 500, 'swing');
      return false;
    });
  });

  $(function () {
    let $point = $('.js-point-item2');
    let $pointMore = $point.next('.linkMore');
    $point.find('>li:nth-child(n+7)').hide();
    $pointMore.on('click', function () {
      if ($(this).hasClass('is-open')) {
        $point.find('>li:nth-child(n+7)').hide();
        $(this).removeClass('is-open');
        $pointMore.find('>a >span').text('他の提携ポイントを確認する');
      } else {
        $point.find('>li').slideDown();
        $(this).addClass('is-open');
        $pointMore.find('>a >span').text('提携ポイント一覧を閉じる');
      }
      let position = $('#anc-point').offset().top;
      $('html, body').animate({ scrollTop: position }, 500, 'swing');
      return false;
    });

    changeItem();
    function changeItem() {
      let id = 0;
      let $radio = $point.find('input[type="radio"]');
      let $content = $('.registWrapPoint');
      $content.find('.__content').hide();
      $radio.on('change', function () {
        id = $point.find('li').index($(this).closest('li'));
        $content.find('.__content').hide();
        $content.find('.__content.no' + id).slideDown();
      });
    }
  });

  // Anchor link
  $(function () {
    let $a = $('a[href^="#anc-"], a[href="#top"]');
    let speed = 1000;
    let href;
    let target;
    let position;
    let margin;
    $a.on('click', function () {
      position = 0;
      if ($(this).attr('href') !== '#top') {
        href = $(this).attr('href');
        target = $(href === '#' || href === '' ? 'html' : href);
        if (target.offset() === undefined) return false;
        if ($(window).width() <= 768) {
          margin = 0;
        } else {
          margin = 0;
        }
        position = target.offset().top - margin;
      }
      $('html, body').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
  });

  // Zip
  $(function () {
    $('input.inutText.zip').on('change', function () {
      let $address = $('input.inutText.address');
      zip2address($(this).val(), function (address) {
        if (address) {
          $address.val(address.all)
        } else {
          // console.log('取得に失敗しました');
        }
      });
    });
  });

  // Select
  $(function () {
    $('.js-select-brand').on('change', function () {
      let selected = $(this).find('>option:selected').text();
      let set_brand = $(this).closest('dl').find('.js-set-brand');

      $.getJSON('/assets/js/car_data.json', function (car_brand) {
        let len = car_brand.length;

        for (var i = 0; i < len; i++) {
          if (car_brand[i].brand === selected) {
            set_brand.find('option').remove();
            for (var k = 0; k < car_brand[i].car.length; k++) {
              // console.log(car_brand[i].car[k]);
              set_brand.append(
                $('<option>', {
                  value: car_brand[i].car[k] == "車種名" ? '' : car_brand[i].car[k],
                  text: car_brand[i].car[k],
                  selected: car_brand[i].car[k] == set_brand.attr('selected_value')
                })
              )
            }
          }
        }
      });
    });

    $('.js-select-brand').trigger('change');
  });
}}
