$(function() {
  var availableTags = [
    "yahoo.co.jp",
    "gmail.com",
    "icloud.com",
    "docomo.ne.jp",
    "ezweb.ne.jp",
    "softbank.ne.jp",
    "i.softbank.jp",
    "disney.ne.jp",
    "outlook.jp",
    "outlook.com",
    "hotmail.co.jp",
    "hotmail.com",
    "live.jp",
    "infoseek.jp",
    "excite.co.jp",
    "inter7.jp",
    "aol.jp",
    "youngpostman.net",
    "zoho.com",
    "goo.jp",
    "mail.goo.ne.jp",
    "auone.jp",
    "me.com",
    "mineo.jp",
    "nifty.com",
    "yahoo.ne.jp",
    "ybb.ne.jp",
    "ymobile.ne.jp",
    "livedoor.com"
  ];

  function extractLast(val) {
    if (val.indexOf("@") != -1) {
      var tmp = val.split("@");
      console.log(tmp[tmp.length - 1]);
      return tmp[tmp.length - 1];
    }
    console.log("returning empty");
    return "";
  }

  $(".autocomp")
    .bind("keydown", function(event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
        $(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 1,
      source: function(request, response) {
        var mail = extractLast(request.term);
        if (mail.length < 1) {
          return;
        }
        var matcher = new RegExp("^" + mail, "i");
        response($.grep(availableTags, function(item) {
          return matcher.test(item);
        }));
      },
      focus: function() {
        return false;
      },

      select: function(event, ui) {
        this.value = this.value.substring(0, this.value.indexOf('@') + 1) + ui.item.value;
        return false;
      }
    });
});