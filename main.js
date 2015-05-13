var app = angular.module('app',[]);
app.controller('calendarController', ['$scope', function($scope) {

}]);
app.directive('scheduler', function() {
	return {
		restrict: 'E',
		templateUrl: 'scheduler.html',
		link: function(scope, element, attr) {
			scope.config = {
				timing:{
					from: "09AM",
					to:"06PM",
					split: "quarter"
				}
			}
			scope.appointments = [
				{
					id:1,
					description: "first appointment",
					time: {
						start: "10:00AM",
						length: "0.5"
					}
				},{
					id:1,
					description: "second appointment",
					time: {
						start: "10:00AM",
						length: "0.5"
					}
				},{
					id:1,
					description: "third appointment",
					time: {
						start: "10:00AM",
						length: "0.5"
					}
				},{
					id:1,
					description: "bla appointment",
					time: {
						start: "11:45AM",
						length: "0.5"
					}
				},{
					id:1,
					description: "new appointment",
					time: {
						start: "12:15PM",
						length: "0.5"
					}
				},{
					id:1,
					description: "general appointment",
					time: {
						start: "02:45PM",
						length: "0.5"
					}
				}
			]
			scope.appointments2 = [
				{
					id:1,
					description: "123 appointment",
					time: {
						start: "11:00AM",
						length: "0.5"
					}
				},{
					id:1,
					description: "Super",
					time: {
						start: "11:00AM",
						length: "0.5"
					}
				}
			]

			function prepareTimeScale(userAppointments){
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

				return scale
			}
			scope.timescale =  prepareTimeScale(scope.appointments);
			scope.timescale2 =  prepareTimeScale(scope.appointments2);

		}
	}
});