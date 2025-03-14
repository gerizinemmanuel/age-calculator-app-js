
const actualYear = new Date().getFullYear();
const actualMonth = new Date().getMonth();
const actualDay = new Date().getDate();

const fillActualYear = document.getElementById("fill-actual-year");
fillActualYear.innerHTML+=actualYear;


const inputs = document.querySelectorAll(".box-data input");
const resultFields = document.querySelectorAll(".result-field")


//retornar o número de dias que um mês tem
function getDaysInMonth(month, year){
    const daysInMonth = [31, ((isLeap(year)) ? 29:28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month];
}

//verificar se um ano é bissexto
function isLeap(year){
    return (year%4==0 && (year%100 != 0 || year%400==0))
}


function calculateTime(){
    const inputDay = parseInt(inputs[0].value);
    const inputMonth = parseInt(inputs[1].value)-1;
    const inputYear = parseInt(inputs[2].value);
    
    let nYears = actualYear - inputYear;
    let nMonths = actualMonth - inputMonth;
    let nDays = actualDay - inputDay;

    if(nDays < 0){
        let prevMonthDays = getDaysInMonth((actualMonth - 1 >= 0)? actualMonth - 1 : 11 , actualYear)
        nDays += prevMonthDays;
        nMonths --;
    }
    if (nMonths < 0){
        nMonths += 12;
        nYears--;
    }
    resultFields[0].innerHTML = nYears;
    resultFields[1].innerHTML = nMonths;
    resultFields[2].innerHTML = nDays;
}






