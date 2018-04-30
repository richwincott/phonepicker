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

        // storing the data for use in the view
        vm.data = response.data; 
        vm.selected = vm.data[0].deviceSummary[0];

        // loop through the device and save all choices for colour and memory
        vm.data[0].deviceSummary.forEach((device) => { 
            if (!vm.choices.colours[device.colourName])
                vm.choices.colours[device.colourName] = {
                    name: device.colourName,
                    hex: device.colourHex
                };
            if (vm.choices.memory.indexOf(device.memory) == -1)
                vm.choices.memory.push(device.memory);

            // sets the chosen colour to the first available choice
            vm.chosen.colour = vm.choices.colours[Object.keys(vm.choices.colours)[0]]; 
            // sets the chosen memory to the first in the choices list
            vm.chosen.memory = vm.choices.memory[0]; 
        });
    })

    // creates an array for given size
    vm.getNumber = (num) => { 
        return new Array(Math.ceil(num));   
    }

    // sets the selected device based on chosen colour and memory
    vm.findDevice = () => { 
        vm.data[0].deviceSummary.forEach((device) => {
            if (device.colourName == vm.chosen.colour.name) {
                if (device.memory == vm.chosen.memory) {
                    vm.selected = device;
                }
            }
        });
    }

    // sets the chosen memory and calls findDevice() method. fired when memory choice is changed in the view.
    vm.setMemory = (memory) => { 
        vm.chosen.memory = memory;
        vm.findDevice();
    }

    // sets the chosen colour and also calls the findDevice() method. again fired when colour choice is changed in the view.
    vm.setColour = (colour) => { 
        vm.chosen.colour = colour;
        vm.findDevice();
    }    
}]);