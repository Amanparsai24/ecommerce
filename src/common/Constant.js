
export const siteName = 'E-commerce';
export const Path = process.env.REACT_APP_API_URL+"/";

export const PaymentMethod = [
    {
        name: "Online",
        id: 1
    },
    {
        name: "Cash On delivery ",
        id: 2
    }

];

export const ShippingCharges = 250;

export const parentDefault = "000000000000000000000000";

export const priceRangeList = [
    { value: 1, label: 'Less than 1000', from: 0, to: 1000 },
    { value: 2, label: '1001 - 2500', from: 1001, to: 2500 },
    { value: 3, label: '2501 - 5000', from: 2501, to: 5000 },
    { value: 4, label: '5001 +', from: 5001, to: 100000000 }
];

export const discountList = [
    { value: 1, label: '10% Off or More', discount:10 },
    { value: 2, label: '20% Off or More', discount:20 },
    { value: 3, label: '30% Off or More', discount:30 },
    { value: 4, label: '40% Off or More', discount:40 },
    { value: 5, label: '50% Off or More', discount:50 }
];

export const ratingList = [
    { value: 1, label: '*', rating: 1 },
    { value: 2, label: '**', rating: 2 },
    { value: 3, label: '***', rating: 3 },
    { value: 4, label: '****', rating: 4 },
    { value: 5, label: '*****', rating: 5 }
];
// Faq type

export const faqType = { 1: 'General', 2: 'Using MyPunditG', 3: 'Book Services', 4: "Workspace" };

// LIMIT number
export const LimitNumber = [5,10,20,30,40,50,60,70,80,90,100]; 

export const lastStep = 9;

export const message = {    

    'xyz':{head:"", desc:'', success:true, step:"" },
}           


export const UserStatus = {0:'Pending', 1:'Verified', 2:'Rejected',3:"Blocked"};

export const ListedStatus = {0:'Un Publish', 1:'Published'};

export const ListedStatusNew = { 0: 'Inactive', 1: 'Active' };

export const PermissionList =[
    {
        "name": "Manager Access",
        "type": "1",
        "action": [
            {
                "name": "List",
                "type": "SERVICE_PROVIDER_LIST"
            },
            {
                "name": "Add",
                "type": "SERVICE_PROVIDER_ADD"
            },
            {
                "name": "Edit",
                "type": "SERVICE_PROVIDER_EDIT"
            },
            {
                "name": "Delete",
                "type": "SERVICE_PROVIDER_Delete"
            }
        ]
    },
    {
        "name": "Back Officer Access",
        "type": "2",
        "action": [
            {
                "name": "List",
                "type": "SERVICE_LIST"
            },
            {
                "name": "Add",
                "type": "SERVICE_ADD"
            },
            {
                "name": "Edit",
                "type": "SERVICE_EDIT"
            },
            {
                "name": "Delete",
                "type": "SERVICE_Delete"
            }
        ]
    },
    {
        "name": "User Access",
        "type": "3",
        "action": [
            {
                "name": "List",
                "type": "USER_LIST"
            },
            {
                "name": "Add",
                "type": "USER_ADD"
            },
            {
                "name": "Edit",
                "type": "USER_EDIT"
            },
            {
                "name": "Delete",
                "type": "USER_Delete"
            }
        ]
    }
];

export const getBalance = async(id='', type='')=>{
    if(sessionStorage.getItem("ConnectStatus") === 'true'){
        let data = {};//await getBalanceAction();
        if(data.code === 200){
            let oldBal = sessionStorage.getItem('balance');
            sessionStorage.setItem("balance", data.data);
            if(type === '' || oldBal !== data.data){
                window.location.reload();
            }
        }
    }
    
}


export const checkLogin = (history)=>{

    let authData = JSON.parse(localStorage.authData);
    let url = '';
    let msgData = {};

    if(authData.steps === 'register'){

        url = '/verification';

    }else if(authData.steps === 'otpVerified'){

        url = '/companyinfo';

    }else if(authData.steps === 'companyCreated'){
        
        msgData = message['contractSign'];					
        url = '/success';

    }else if(authData.steps === 'contractSend'){

        url = '/agreement';

    }else if(authData.steps === 'contractSign'){

        msgData = message['contractSign'];
        url = '/success';

    }else if(authData.steps === 'companyVerified'){

        url = '/dashboard';

    }else if(authData.steps === 'companyReject'){

        url = '/success';

    }

    //dispatch(setSuccessData(msgData));

    history.push({
        pathname: url,
        state: authData
    });
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
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
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

