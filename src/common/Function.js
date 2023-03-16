import React from 'react';
import { Country, State, City }  from 'country-state-city';
import moment from "moment";
import validator from 'validator'


/*
|--------------------------------------------------------------------------
| Name validation
|--------------------------------------------------------------------------
*/

export const checkName = (name) => {
    // console.log(name);
    var nameValidation = /^[A-Za-z\s]+$/;
    if (name.match(nameValidation)) {
        return true;
    }
    else {
        return false;
    }
}



/*
|--------------------------------------------------------------------------
| Email validation
|--------------------------------------------------------------------------
*/

export const emailCheck = (email) => {
    // return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    return /[a-zA-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,8}(.[a-z{2,8}])?/i.test(email)  
}

export const emailValidation = (email) => {
    // console.log(email);
    var emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(emailValidation)) {
        return true;
    }
    else {
        return false;
    }
}



/*
|--------------------------------------------------------------------------
| Mobile number 
|--------------------------------------------------------------------------
*/
export const isNumericKey = (evt) => {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return true;
    return false;
} 

export const checkMobileNumber = (evt) => {
    // console.log(evt);
    var phoneno = /^\d{10}$/;
    if (evt.match(phoneno)){
        return true;
    }
    else{
        return false;
    }
} 


export const checkFormError = (data) => {
    let check = false;
    for (let i in data) {
        if (data[i] && data[i] != '') {
            check = true;
        }
    }
    return check;

}



/*
|--------------------------------------------------------------------------
| To Fixed
|--------------------------------------------------------------------------
*/

export const  toFixed = (number, num=3) => {    

    number = number.toString();

    let numberArr = number.split(".");
     
    if(numberArr.length>1 && numberArr[1]){
        let p = numberArr[1];
        let d = p.substr(0,num);
        
        if(d>0){
            
            return numberArr[0]+'.'+d
        }else{
            
            return number
        }
    }else{
        return number
    }    
}
/*
|--------------------------------------------------------------------------
| Add Zero
|--------------------------------------------------------------------------
*/

export const addZero = (num)=>{
        
   return num>9?num:('0'+num);

}
                  

export const checkLogin = ()=>{
    if(sessionStorage.getItem("ConnectStatus") == 'true' && sessionStorage.getItem('userId')){
        return true;
    }else{
        window.location.href = "/";
    }
}

export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
  
export const  getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
export const  deleteCookie = (cname) => {
      document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const  getDecimal = (price, num=3) => {
    //console.log(price, num);

    price = price.toString();

    let priceArr = price.split(".");
    let priceDecimal = '';
    if(priceArr.length>1 && priceArr[1]){
        let p = priceArr[1];
        let d = p.substr(0,num);
        if(d>0){
            return priceArr[0]+'.'+d
        }else{
            return price
        }
    }else{
        return price
    }    
}


export const objToArray = (obj)=>{

    let newArray = [];
    for(let i in obj){
        newArray[i] = obj[i];
    }
    return newArray;
}


export const setLocalData = (field, data)=>{
    
    localStorage.setItem(field, JSON.stringify(data));
}

export const getLocalData = (field)=>{

    let data = localStorage.getItem(field);
    return JSON.parse(data);
}

export const GetAllCountries = ({valueType=''})=>{  
    const countriesList =  Country.getAllCountries();
    return <>
            <option value="">Select {valueType==='Code'?'Code':'Country'}</option>
            { 
                countriesList.length && countriesList.map((item, index)=>{
                    if(valueType==='Code'){
                        if(item.phonecode && item.phonecode !== ''){
                            let code = item.phonecode.replace('+','');
                            return <option value={code} key={item.name+code}>{item.name} (+{code})</option>
                        }else{
                            return '';
                        }
                    }else{
                        return <option value={item.isoCode} key={item.name+item.isoCode} name={item.name}>{item.name}</option>
                    }                    
                })
            }
        </>;
}

export const GetStatesOfCountry = ({countryCode})=>{

    const statesList =  State.getStatesOfCountry(countryCode);
    return <>
                <option value="">Select State</option>
                { 
                    statesList.length && statesList.map((item, index)=>{
                        return <option value={item.isoCode} key={item.name+item.isoCode} name={item.name}>{item.name}</option>
                    })
                }
            </>
}

export const GetCitiesOfState = ({ countryCode, stateCode }) => {

    const citesList = City.getCitiesOfState(countryCode, stateCode);

    return <>
        <option value="">Select City</option>
        {
            citesList.length && citesList.map((item, index) => {
                return <option value={item.name} key={item.name + item.countryCode}>{item.name}</option>
            })
        }
    </>
}

export const arrangeLanguageLabel = (lang, list)=>{
    
    let data = list.find(row=>row._id===lang._id);   
    return  data.language;

}

export const imgPath = (image)=>{
        
    // return  process.env.REACT_APP_API_URL+'/'+image;
    // return 'http://192.168.1.9:4000' + '/'+image;
    return 'http://localhost:4000' + '/' + image;

    // return  'https://zena-media.s3.ap-south-1.amazonaws.com/dev/'+image;    

}

export const getTimeSlot = (minutes=30, condition=36)=>{   
        
    let data = [{value:"06:00", label:"06:00 AM"}];
    let time = '';
    let i = 0;
    do { i++;
        time = moment('2022-09-10 06:00', "YYYY-MM-DD HH:mm").add(minutes*i, 'minutes').format('HH:mm');
        data.push({value:time, label:moment('2022-09-10 06:00', "YYYY-MM-DD HH:mm").add(minutes*i, 'minutes').format('hh:mm A')});
    }
    while (i < condition);    
    return data;
}

export const checkSubscription = (user, plans)=>{
        
    if(user && user.subscriptionId && plans.includes(user.subscriptionId)){
        return true;
    }else{
        return false;
    }

}
