//const inputs declarado em calculateTime.js
import { inputs, actualYear, getDaysInMonth, calculateTime} from "./calculateTime.js";

const msgEmptyField = document.querySelectorAll(".empty");
const msgInvalidData = document.querySelectorAll(".invalid");
const titles = document.querySelectorAll(".title");

const buttonCalc = document.querySelector("#calculate");

const dateComponents = ["date","month","year"];

const hasError = {"date":true, "month":true, "year":true};

//actualFullDate e outras variáveis declaradas em calculateTime.js


//Ao clicar no botão de calcular
buttonCalc.addEventListener("click", (event)=>{
    validateDay();
    validateMonth();
    validateYear();
    validateMonthDay();

    //console.log(hasError);
    if(!Object.values(hasError).includes(true))
        calculateTime();
})

//Ao digitar Dia
inputs[0].addEventListener("input", (event)=>{
    validateDay();
    validateMonthDay();
})

//Ao digitar Mês
inputs[1].addEventListener("input",(event)=>{
    validateMonth();
    if(inputs[0].value) validateMonthDay();
    
})

//Ao digitar Ano
inputs[2].addEventListener("input",(event)=>{
    validateYear();
    if(inputs[0].value) validateMonthDay();
})

function validateDay(){
    validateDateField(inputs[0].value, 1, 31, 0);
}

function validateMonth(){
    validateDateField(inputs[1].value, 1, 12, 1); 
}

function validateYear(){
    validateDateField(inputs[2].value, "", actualYear, 2);
}

//Validar o dia em função do mês
function validateMonthDay(){
    const day = inputs[0].value;
    const month = inputs[1].value;
    const year = inputs[2].value;

    //daysInMonth declarado em calculateTime.js

    let daysInMonth = getDaysInMonth(month - 1,year);

    if(day<1 || day > daysInMonth){
        validateDateField(day, 1, daysInMonth,0)
        //hasError.monthDay=true;
    }else{
        if(!day || (day<1 && day>31))
            validateDateField(inputDay, 1, 31, 0);
        //hasError.monthDay=false;
    }
}


function validateDateField(input, min, max, index){
    
    if(!input){
        showValidationMsg(index,"empty")
        hasError[dateComponents[index]]=true;
    }else if(input<min || input>max){
        
        let msg = ((max==28 || max==29 || max==30) && input > 0 && input <= 31) ? `This month has ${max} days` : `Must be a valid ${dateComponents[index]}`;
        if(max==actualYear)
            msg=`Must be in past`;

        showValidationMsg(index,"invalid",msg)
        
        hasError[dateComponents[index]]=true;
    }
    else{
        removeValidationMsg(index,"invalid")
        removeValidationMsg(index,"empty")
        hasError[dateComponents[index]]=false;
    }
}


function showValidationMsg(index,type,msg=""){

    if(msg){
        msgInvalidData[index].innerHTML=msg;
    }

    msgEmptyField[index].style.display = (type=="empty") ? "block":"none";
    msgInvalidData[index].style.display = (type=="invalid") ? "block":"none";

    inputs[index].classList.add("error-border");
    titles[index].classList.add("error-text");
}



function removeValidationMsg(index,type){
    if (type=="empty"){
        msgEmptyField[index].style.display="none"
    }
    if (type=="invalid"){
        msgInvalidData[index].style.display="none"
    }

    inputs[index].classList.remove("error-border");
    titles[index].classList.remove("error-text");
}


