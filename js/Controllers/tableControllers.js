(function() {
    'use strict';

    angular
        .module('shopular')
        .controller('HeaderController', function(API) {

            const vm = this;
            vm.data = API.getData();
            // vm.save = API.setItem(item)
            vm.tax = 1.065;

            vm.increaseItemCount = function(data) {
                console.log(data);
                data.quantity++;
            }
            vm.decreaseItemCount = function(data) {
                console.log(data);
                data.quantity--;
            }
            vm.submitForm = function(isValid) {
                if (isValid) {
                    const newItem = Object.assign({},vm.item);
                    vm.data.push(newItem);
                    vm.items = API.saveData(newItem);
                    vm.item = {};
                    swal(
                        "Good job!",
                        "You Added an Item!",
                        "success");
                } else {
                    swal(
                        'Oops...',
                        'Something went wrong!',
                        'error');
                }

            }

        });
})();