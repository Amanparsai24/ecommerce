import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../slices/home';
import { Spinner, Alert  } from 'react-bootstrap';

const AlertBox = () => {

    const dispatch = useDispatch();
    
    const alertData = useSelector((state) => state.home.alert);
    
    const { open, severity, msg, type } = alertData
    ;
    // const hideAlert = () =>{
    //     dispatch(setAlert({open: false, vertical: 'bottom', horizontal: 'right', severity:"success", msg:"Loading..."}));
    // }

    useEffect(() => {

        //dispatch(setAlert({open: true, severity:"success", msg:"Loading...", type:'loader'}));
    },[])

    useEffect(() => {
        
        if(open === true && type === ''){ 
            setTimeout(()=>{ 
                dispatch(setAlert({open: false, severity:"success", msg:"Loading...", type:''}));
            }, 3000);
        }
    },[open])

    return(<>
        {open === true &&
            <div className='loader-box'>
                <Alert variant={severity}>
                    {type === 'loader' &&
                        <Spinner animation="border" variant={severity} size="sm"/>
                    }
                    <span className="loader-msg">{msg}</span>
                </Alert>
            </div>
        }
        </>
    )
}

export default (AlertBox);
