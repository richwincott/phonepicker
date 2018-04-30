app.controller("homeController", ["$scope", "homeService", function ($scope, homeService) {
    let vm = this;

    vm.selected = {};

    vm.chosen = {
        colour: null,
        memory: null      
    };

    vm.choices = {
        "colours": {},
        "memory": []
    }

    homeService.fetch("assets/data/phones.json").then((response) => {
        //console.log(response.data);
        vm.data = response.data;
        vm.selected = vm.data[0].deviceSummary[0];
        vm.data[0].deviceSummary.forEach((device) => {
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

    vm.getNumber = (num) => {
        return new Array(Math.ceil(num));   
    }

    vm.findDevice = () => {
        vm.data[0].deviceSummary.forEach((device) => {
            if (device.colourName == vm.chosen.colour.name) {
                if (device.memory == vm.chosen.memory) {
                    vm.selected = device;
                }
            }
        });
    }

    vm.setMemory = (memory) => {
        vm.chosen.memory = memory;
        vm.findDevice();
    }

    vm.setColour = (colour) => {
        vm.chosen.colour = colour;
        vm.findDevice();
    }    
}]);