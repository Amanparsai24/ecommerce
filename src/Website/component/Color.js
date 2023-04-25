import { Fragment } from "react";

const Color = ({ colors }) => {
    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Color :</label>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                {colors && colors.length > 0 && colors.map((item, ind) => {
                    console.log(item.colorId);
                    return <Fragment key={ind}>
                        <button className="btn colorbtn border-warning " style={{ backgroundColor: `#${item.colorId.code}` }} type="button"></button>
                    </Fragment>
                })
                }
                {/* <button className="btn btn-primary colorbtn " type="button"></button>
                <button className="btn btn-secondary colorbtn " type="button"></button>
                <button className="btn btn-success colorbtn " type="button"></button>
                <button className="btn btn-danger colorbtn " type="button"></button>
                <button className="btn btn-info colorbtn " type="button"></button> */}
            </div>
        </div>
    );
}

export default Color;