import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';

const DeleteProduct = ({ item, gettotalprice, getcartlist }) => {

    const dispatch = useDispatch();
    const [totalprice, setTotalPrice] = useState(0);

    const _delete = async (id) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {

                        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));

                        const cartlist = JSON.parse(localStorage.getItem('cartlist'));
                        for (let i in cartlist) {
                            let productid = cartlist[i]._id;

                            if (productid === id) {
                                let price = cartlist[i].salePrice;
                                let productIdIndex = i;
                                cartlist.splice(productIdIndex, 1);
                                localStorage.setItem("cartlist", JSON.stringify(cartlist));
                                setTotalPrice(totalprice - price);
                                dispatch(setAlert({ open: true, severity: "success", msg: "You have successfully deleted item.", type: '' }));
                                getcartlist();
                                gettotalprice();
                            }
                        }
                    }

                },
                {
                    label: 'No',
                }
            ]
        });

    }

    return (
        <>
            <span className="btn btn-sm cartbtn" title="Delete" onClick={e => _delete(item._id)}>Delete</span>
        </>
    );
}

export default DeleteProduct;