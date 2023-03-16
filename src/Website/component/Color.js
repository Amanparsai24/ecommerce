
function Color() {
    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Color :</label>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                <button className="btn btn-primary colorbtn " type="button"></button>
                <button className="btn btn-secondary colorbtn " type="button"></button>
                <button className="btn btn-success colorbtn " type="button"></button>
                <button className="btn btn-danger colorbtn " type="button"></button>
                <button className="btn btn-info colorbtn " type="button"></button>
            </div>
        </div>
    );
}

export default Color;