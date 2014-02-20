var Utils = {
	DateFormatLen : function (str) {
		return str = ("" + str).length < 2 ? "0" + str : str;
	},
	FullFormatDate : function (o) {
		return o.getFullYear() + '-' + Utils.DateFormatLen(o.getMonth() + 1) + '-' + Utils.DateFormatLen(o.getDate()) + ' ' + Utils.DateFormatLen(o.getHours()) + ':' + Utils.DateFormatLen(o.getMinutes()) + ':' + Utils.DateFormatLen(o.getSeconds());
	}
}

var Index = function(){
	var Init = function(){
		$("#search").click(Control.Search);
		$("#add").click(Control.Add);
		$("#save").click(Control.Save);
		$("#close").click(Control.Close);
	};

	var Control = {
		Search : function(){
			var searchValue = $("#searchValue").val();
			if(searchValue && $.trim(searchValue).length > 0){
				$("#searchResultDiv").empty();
				$.ajax({
					url: '/enemies/'+searchValue,
					method: 'GET',
					success: function (response) {
						if(response.length > 0){
							var html = "<div>";
							for(var i in response){
								var enemy = response[i];
								var enemyHtml = "<h3>"+enemy._id+"</h3><div><ul>";
								for(var k in enemy.decks){
									var deck = enemy.decks[k];
									enemyHtml += "<li>"+deck.deck + "("+Utils.FullFormatDate(new Date(deck.InsDate))+")</li>";
								}

								html += enemyHtml + "</ul></div>";
							}
							html = $(html+"</dev>");
							$("#searchResultDiv").append(html);
							html.accordion();
						}
						else{
							$("#searchResultDiv").html("없어!!");
						}
					},
					error: function (error) {
						if (error != null && typeof (error.responseText) != "undefined") {
							try {
								var exception = $.parseJSON(error.responseText);
								if (typeof (exception.ExceptionMessage) != "undefined" && $.trim(exception.ExceptionMessage) != '') {
									alert(exception.ExceptionMessage);
								}
								else {
									alert("서버에 오류가 있습니다.(0)");
								}
							} catch (ex) {
								alert("서버에 오류가 있습니다.(1)");
							}
						} else {
							alert("서버에 오류가 있습니다.(2)");
						}
					}
				});
			}
		},
		Add : function(){
			$("#saveDiv").show();
			$("#id").focus();
		},
		Close: function(){
			$("#saveDiv").hide();
		},
		Save : function(){
			var id = $("#id").val();
			var deck = $("#deck").val();
			var data = {id:id, deck:deck};
			if(id && $.trim(id).length > 0 && deck && $.trim(deck).length > 0 ){
				$("#saveDiv").hide();
				$.ajax({
					url: '/enemy',
					method: 'POST',
					contentType: 'application/json',
					data:JSON.stringify(data),
					success: function (response) {
						if(!response){
							alert("실패!");
						}
					},
					error: function (error) {
						if (error != null && typeof (error.responseText) != "undefined") {
							try {
								var exception = $.parseJSON(error.responseText);
								if (typeof (exception.ExceptionMessage) != "undefined" && $.trim(exception.ExceptionMessage) != '') {
									alert(exception.ExceptionMessage);
								}
								else {
									alert("서버에 오류가 있습니다.(0)");
								}
							} catch (ex) {
								alert("서버에 오류가 있습니다.(1)");
							}
						} else {
							alert("서버에 오류가 있습니다.(2)");
						}
					}
				});
			}
			else {
				alert("제대로 입력 하그라..");
			}
		}
	}

	Init();
};

$(function () {
	new Index();
});