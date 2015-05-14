var app = angular.module('app',[]);
app.controller('calendarController', ['$scope', function($scope) {

}]);
app.directive('scheduler', function($q) {
	return {
		restrict: 'E',
		templateUrl: 'scheduler.html',
		link: function(scope, element, attr) {
			scope.timescale = [];
			scope.timescale2 = [];
			scope.config = {
				timing :{
					from :"09AM" ,
					to :"06PM" ,
					split :"quarter"
				}
			}


			scope.appointments = [
				{
					id:1,
					description: "first appointment",
					time: {
						start: "10:00AM",
						length: "t-15"
					}
				},{
					id:1,
					description: "second appointment",
					time: {
						start: "10:00AM",
						length: "t-30"
					}
				},{
					id:1,
					description: "third appointment",
					time: {
						start: "10:00AM",
						length: "t-15"
					}
				},{
					id:1,
					description: "bla appointment",
					time: {
						start: "11:45AM",
						length: "t-15"
					}
				},{
					id:1,
					description: "new appointment",
					time: {
						start: "12:15PM",
						length: "t-30"
					}
				},{
					id:1,
					description: "general appointment",
					time: {
						start: "02:45PM",
						length: "t-15"
					}
				}
			]
			scope.appointments2 = [
				{
					id:1,
					description: "BLA appointment",
					time: {
						start: "11:00AM",
						length: "t-15"
					}
				},{
					id:1,
					description: "just created",
					time: {
						start: "12:15PM",
						length: "t-15"
					}
				},{
					id:1,
					description: "BLA1 appointment",
					time: {
						start: "6:15=-000--00AM",
						length: "t-15"
					}
				},{
					id:1,
					description: "Super",
					time: {
						start: "11:00AM",
						length: "t-30"
					}
				}
			]
			scope.template = [
				{
					id:1,
					description: "123 appointment",
					time: {
						start: "11:00AM",
						length: "quarter"
					}
				}
			]
			scope.currentoffset = 0;
			scope.currentoverlap = 0;
			scope.handlemousedown = function(p, e){
				scope.currentoffset = e.target.offsetTop;
				console.log(e.target.offsetTop)
				angular.element(e.target).append('<div id="template" style="border:1px solid black; height:50px; width:100%; background: #c3c3c3">temp</div>')
			}
			scope.handlemouseup = function(p, e){
				scope.currentoverlap = e.target.offsetTop;
				var item = document.getElementById("template");
				console.log(angular.element(item));
				angular.element(item).css({"height":(((scope.currentoverlap-scope.currentoffset)%50)*50)+50+"px"});

			}
			function prepareTimeScale(userAppointments){
				var deferred = $q.defer();
				var scale = [];
				var startTime  = scope.config.timing.from.substr(0,2);
				var endTime  = scope.config.timing.to.substr(0,2);
				var startDayPart = scope.config.timing.from.substr(2,4);
				var endDayPart = scope.config.timing.to.substr(2,4);

				for(var start = startTime; start< 12; start++) {
					var childs = [];
					var appointments = [];
					switch (scope.config.timing.split) {
						case "hour":
						{
							childs.push(start + startDayPart)
							break;
						}
						case "half":
						{
							childs.push(start + startDayPart , startTime + ":30")
							break;
						}
						case "quarter":
						{
							var slot1 = {time :start + startDayPart, appointments: []};
							for (var i = 0 ; i < userAppointments.length ; i++) {
								if (start + ":00" + startDayPart == userAppointments[i].time.start) {
									slot1.appointments.push(userAppointments[i]);
								}
							}
							var slot2 = {time :start + ":15", appointments: []};
							for (var i = 0 ; i < userAppointments.length ; i++) {
								if (start + ":15" + startDayPart == userAppointments[i].time.start) {
									slot2.appointments.push(userAppointments[i]);
								}
							}
							var slot3 = {time :start + ":30", appointments: []};
							for (var i = 0 ; i < userAppointments.length ; i++) {
								if (start + ":30" + startDayPart == userAppointments[i].time.start) {
									slot3.appointments.push(scope.appointments[i]);
								}
							}
							var slot4 = {time :start + ":45", appointments: []};
							for (var i = 0 ; i < userAppointments.length ; i++) {
								if (start + ":45" + startDayPart == userAppointments[i].time.start) {
									slot4.appointments.push(userAppointments[i]);
								}
							}
							childs.push(slot1 , slot2 , slot3 , slot4);
							scale.push({title :start + startDayPart , childs :childs})
							break;
						}
					}
					if(start == 11){
						startTime = 12;
						childs = [];
					}

				}

				if (startTime == 12){
					switch(scope.config.timing.split){
						case "hour": {
							childs.push({time: 12+"PM"});
							break;
						}case "half": {
						childs.push(12+"PM", 12+":30")
						break;
					}
						case "quarter": {
							var slot1 = {time: startTime + endDayPart, appointments: []};
							for(var i= 0; i<userAppointments.length; i++ ) {
								if (startTime + ":00" + endDayPart == userAppointments[i].time.start) {
									slot1.appointments.push(userAppointments[i]);
								}
							}
							var slot2 = {time: startTime+":15", appointments: []};
							for(var i= 0; i<userAppointments.length; i++ ) {
								if (startTime + ":15" + endDayPart == userAppointments[i].time.start) {
									slot2.appointments.push(userAppointments[i]);
								}
							}
							var slot3 = {time: startTime+":30", appointments: []};
							for(var i= 0; i<userAppointments.length; i++ ) {
								if (startTime + ":30" + endDayPart == userAppointments[i].time.start) {
									slot3.appointments.push(userAppointments[i]);
								}
							}
							var slot4 = {time: startTime+":45", appointments: []};
							for(var i= 0; i<userAppointments.length; i++ ) {
								if (startTime+":45"+endDayPart == userAppointments[i].time.start){
									slot4.appointments.push(userAppointments[i]);
								}
							}
							childs.push(slot1, slot2, slot3, slot4)

							//childs.push({time: 12+"PM"}, {time: 12+":15"}, {time: 12+":30"}, {time:12+":45"})
							break;
						}
					}

					scale.push({title: 12+"PM", childs:childs})


					var afternoon = 1;
					while (afternoon<endTime && endDayPart == 'PM') {
						var childs = [];

						switch (scope.config.timing.split) {
							case "hour":
							{
								childs.push(afternoon + endDayPart)
								break;
							}
							case "half":
							{
								childs.push(afternoon + endDayPart , afternoon + ":30")
								break;
							}
							case "quarter":
							{
								if(afternoon<10){
									afternoon = "0"+afternoon;
								}
								var slot1 = {time: afternoon + endDayPart, appointments: []};
								for(var i= 0; i<userAppointments.length; i++ ) {
									if (afternoon + ":00" + endDayPart == userAppointments[i].time.start) {
										slot1.appointments.push(userAppointments[i]);
									}
								}
								var slot2 = {time: afternoon+":15", appointments: []};
								for(var i= 0; i<userAppointments.length; i++ ) {
									if (afternoon + ":15" + endDayPart == userAppointments[i].time.start) {
										slot2.appointments.push(userAppointments[i]);
									}
								}
								var slot3 = {time: afternoon+":30", appointments: []};
								for(var i= 0; i<userAppointments.length; i++ ) {
									if (afternoon + ":30" + endDayPart == userAppointments[i].time.start) {
										slot3.appointments.push(userAppointments[i]);
									}
								}
								var slot4 = {time: afternoon+":45", appointments: []};
								for(var i= 0; i<userAppointments.length; i++ ) {
									if (afternoon+":45"+endDayPart == userAppointments[i].time.start){
										slot4.appointments.push(userAppointments[i]);
									}
								}
								childs.push(slot1, slot2, slot3, slot4)
								break;
							}
						}
						scale.push({title: afternoon+endDayPart, childs:childs})
						afternoon++;

					}
				}

				deferred.resolve(scale);
				return deferred.promise;
			}

			function promisesQueue(appArray){
				var defer = $q.defer();
				var promisesArray =[];

				for(var i = 0; i< appArray.length; i++){
					var promise =  prepareTimeScale(appArray[i]);
					promisesArray.push(promise);
				}

				$q.all(promisesArray).then(function(data){
					defer.resolve(data);
				})

				return defer.promise;
			}

			var roomLoad = promisesQueue([scope.appointments,scope.appointments2, []]);
			roomLoad.then(function(data){
				scope.timescale = data[0]; //temp for other columns
				scope.timescale2 = data[1]; //temp for other columns

				scope.rooms = [
					{
						id: 1,
						header: "room1",
						doctors: [
							{
								id: 11,
								name: "doctor1",
								appointments: data[0]
							},
							{
								id: 12,
								name: "doctor2",
								appointments: data[1]
							}
						]
					},{
						id: 2,
						header: "room2",
						doctors: [
							{
								id: 21,
								name: "doctor3",
								appointments: data[2]
							},{
								id: 31,
								name: "denys",
								appointments: data[0]
							}
						]
					}
				]
			})







		}
	}
});