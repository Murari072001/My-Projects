import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteStockMutation, useUpdateStockMutation } from "../../services/stocksApi";
import { setUser } from "../userSlice";

const MyStocks = () => {
    const [updateFn]=useUpdateStockMutation()
    const [deleteFn]=useDeleteStockMutation()
    const { user } = useSelector(state => state.userDetails)
    const dispatch = useDispatch()
    const editFormik = useFormik({
        initialValues: {
            id:"",
            stocks: "",
            amount: "",
            company: "",
            type: "",
            status: ""
        },
        onSubmit: (value, { resetForm }) => {
            console.log(editFormik);
            updateFn(value).then((res)=>{console.log(res.data)
            dispatch(setUser(res.data[0]))})
            resetForm()
        }
    })
    const deleteStock=(id)=>{
       
        if(window.confirm("Are You Really Sure to DELETE the Stock"))
        {
            deleteFn(id).then((res)=>{console.log(res.data)
                dispatch(setUser(res.data[0]))})
        }
    }
    return <div>
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT STOCKS</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="recipient-name" className="col-form-label">Desired Number of Stocks:</label>
                                <input type="number" className="form-control" name="stocks" id="recipient-name" value={editFormik.values.stocks} onChange={editFormik.handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">Desired Price of Stock:</label>
                                <input type="number" className="form-control" name="amount" id="message-text" value={editFormik.values.amount} onChange={editFormik.handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={editFormik.handleSubmit}>Buy Stocks</button>
                    </div>
                </div>
            </div>
        </div>
        <h3>My Stocks</h3>
        <table className="table border border-3 border-dark table-striped table-hover ms-auto me-auto w-75">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Stock Type</th>
                    <th>Stock Quantity</th>
                    <th>Stock Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    user?.Allstocks?.map((stock, i) => {
                        return <tr key={i}>
                            <td>{stock.company}</td>
                            <td>{stock.type}</td>
                            <td>{stock.stocks}</td>
                            <td>{stock.amount}</td>
                            <td>{stock.status}{
                                stock.status==="pending"&& <>
                                <button className="btn ms-2 btn-outline-warning" onClick={()=>{editFormik.setValues(stock)}}  data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo">Edit</button>
                                <button className="btn ms-2 btn-outline-danger" onClick={()=>{deleteStock(stock.id)}}>Delete</button>
                                </>
                            }</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default MyStocks