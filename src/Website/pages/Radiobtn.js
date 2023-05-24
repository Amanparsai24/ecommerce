import React from 'react';
const Radiobtn = (props)=>{
  
  return (
        <>
            <div className="form-check form-check-inline mt-1">
              <label className={props.checked === true?"form-check-label text-dark":"form-check-label"}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" checked={props.checked?true:false} onChange={e=>props.handleChange(e)} value={props.id}/> {props.name}</label>
            </div>
        </>
  );
}

export default Radiobtn;
