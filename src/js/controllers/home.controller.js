var app = angular.module("phonepicker");

app.controller("homeController", ["$scope", "homeService", function ($scope, homeService) {
    var vm = this;

    vm.selected = {};

    vm.chosen = {
        colour: null,
        memory: null      
    };

    vm.choices = {
        "colours": {},
        "memory": []
    }

    homeService.fetch("assets/data/phones.json").then(function (response) {
        console.log(response.data);
        vm.data = response.data;
        vm.selected = vm.data[0].deviceSummary[0];
        vm.data[0].deviceSummary.forEach(function(device) {
            if (!vm.choices.colours[device.colourName])
                vm.choices.colours[device.colourName] = {
                    name: device.colourName,
                    hex: device.colourHex
                };
            if (vm.choices.memory.indexOf(device.memory) == -1)
                vm.choices.memory.push(device.memory);
            vm.chosen.colour = vm.choices.colours[Object.keys(vm.choices.colours)[0]];
            vm.chosen.memory = vm.choices.memory[0];
        });
    })

    vm.getNumber = function (num) {
        return new Array(Math.ceil(num));   
    }

    vm.findDevice = function () {
        vm.data[0].deviceSummary.forEach(function(device) {
            if (device.colourName == vm.chosen.colour.name) {
                if (device.memory == vm.chosen.memory) {
                    vm.selected = device;
                }
            }
        });
    }

    vm.setMemory = function (memory) {
        vm.chosen.memory = memory;
        vm.findDevice();
    }

    vm.setColour = function (colour) {
        vm.chosen.colour = colour;
        vm.findDevice();
    }    
}]);