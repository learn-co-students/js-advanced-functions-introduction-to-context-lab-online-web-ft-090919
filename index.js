// Your code here
function createEmployeeRecord(arrayOfArrays) {
  arrayOfArrays.map(function(array) {
    this.firstName = array[0];
  });
}
