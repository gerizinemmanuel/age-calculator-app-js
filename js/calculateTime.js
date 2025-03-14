const actualFullDate = new Date();
export const actualYear = actualFullDate.getFullYear();
const actualMonth = actualFullDate.getMonth();
const actualDay = actualFullDate.getDate();


export const inputs = document.querySelectorAll(".box-data input");

const yearsField = document.getElementById("yearsResult");
const monthsField = document.getElementById("monthsResult");
const daysField = document.getElementById("daysResult");


//retornar o número de dias que um mês tem
export function getDaysInMonth(month, year){
    const daysInMonth = [31, ((isLeap(year)) ? 29:28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month];
}

//verificar se um ano é bissexto
function isLeap(year){
    return (year%4==0 && (year%100 != 0 || year%400==0))
}


export function calculateTime(){
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

    //RECORDAR: resultFields[0] -> número de anos; resultFields[1] -> número de meses; resultFields[2] -> número de dias
    yearsField.innerHTML = nYears;
    monthsField.innerHTML = nMonths;
    daysField.innerHTML = nDays;
}






