$(function(){
	chrome.storage.sync.get('total', 'limit'], function(budget){
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);

	})

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total','limit'], function(budget){
			var newTotal = 0;
			if (budget.total){
				newTotal+=parseInt(budget.total);
			}

			var amount = $('#amount').val();
			if(amount){
				newTotal += parseInt(amount);
			}
			chrome.storage.sync.set({'total':newTotal}, function());
			if(amount && newTotal >= budget.limit){
				var notifOptions = {
					type: 'basic',
					iconUrl: 'icon48.png',
					title: 'Limit rached',
					message: "Uh oh! Looks like yoive reached your limit!"
				};
				chrome.notifOptions.create('limitNotif, notifOptions');
			}

			$('#total').text(newTotal);
			$('#amount').val('');
		});
	});
});