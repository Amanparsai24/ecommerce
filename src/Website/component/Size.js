
function Size() {
    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Size :</label>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                <button className="btn btn-primary text-white " type="button">S</button>
                <button className="btn text-dark " type="button">M</button>
                <button className="btn text-dark " type="button">L</button>
                <button className="btn text-dark " type="button">XL</button>
            </div>
        </div>
    );
}

export default Size;