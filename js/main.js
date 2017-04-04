
(function() {
    'use strict';

    angular
        .module('shopular', [])
        .controller('HeaderController', function Header() {

          const vm = this;
          vm.tax = 1.065;


        vm.data = 
          [
            { "id": 2957, "name": "Widget", "price": 32, "quantity": 203, "color": "Red", "discount": 31 },
            { "id": 89274, "name": "Golf Club", "price": 98, "quantity": 10, "color": "Black", "discount": 0 },
            { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "White", "discount": 0 },
            { "id": 87363, "name": "Bonzai Tree", "price": 76, "quantity": 2, "color": "Green", "discount": 0 },
            { "id": 1736, "name": "Towel", "price": 55, "quantity": 30, "color": "Brown", "discount": 10 },
            { "id": 4836, "name": "Dog Bed", "price": 99, "quantity": 10, "color": "Beige", "discount": 50 },
            { "id": 829, "name": "Waste Basket", "price": 15, "quantity": 40, "color": "Silver", "discount": 0 },
            { "id": 46, "name": "Guitar", "price": 899, "quantity": 0, "color": "Blue", "discount": 150 },
            { "id": 17456, "name": "Matcha Tea", "price": 42, "quantity": 4, "color": "Green", "discount": 11 },
            { "id": 3292, "name": "Enlightenment", "price": 99999, "quantity": 1, "color": "Red", "discount": 0 },
            { "id": 533, "name": "Eggs", "price": 5, "quantity": 12, "color": "Brown", "discount": 1 },
            { "id": 683, "name": "Pillow", "price": 27, "quantity": 10, "color": "Black", "discount": 12 }
          ];

          vm.increaseItemCount = function (data){
            console.log(data);
            data.quantity ++;
          }
          vm.decreaseItemCount = function (data){
            console.log(data);
            data.quantity --;
          }
          vm.click = function(){
            vm.data.push(vm.item);
            
          }
          vm.click = function(isValid)
            if(isValid){
              swal("Good job!", "You clicked the button!", "success");
            }

        });
})();

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})



