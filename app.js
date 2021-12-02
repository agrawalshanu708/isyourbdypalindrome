const checkButton = document.querySelector("#check-button")
const bdyDate = document.querySelector("#bdy-date")
const outputDiv = document.querySelector("#output-div")

checkButton.addEventListener("click", function validate(){
var dob = bdyDate.value;
var bdatepalind = isPalindrome(dob);
 if(dob === bdatepalind){
   outputDiv.innerText = "yaa, it is palindrome";

 }else{
  outputDiv.innerText = "not palindrome";
 }



})

function isPalindrome(dob){
  dob = dob.replaceAll("-", "")
  var listOfChar = dob.split('');
  var reverseListOfChar = listOfChar.reverse();
  var reversedStr = reverseListOfChar.join(''); return  reversedStr;
}

