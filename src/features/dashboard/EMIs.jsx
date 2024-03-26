import React, { useEffect, useState } from "react";
import { useAllLoansQuery } from "../../services/jsonApi";
import { Link } from "react-router-dom";

function EMIs() {
    const { data, isLoading } = useAllLoansQuery()
    const [time, setDate] = useState('')
    useEffect(() => {
        let temp = new Date()
        setDate(new Date(temp.getFullYear(), temp.getMonth(), 1, 0, 0, 0))
    }, [])
    function checkDate(date) {
        let time = new Date(date)
        return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
    }
    return (
        <div>
            <h2>EMI's Paid</h2>
            <table className="table table-striped table-success table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Mobile Number</th>
                        <th>EMI Amount</th>
                        <th>Last EMI Paid On</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.filter((ele) => ele.emiPaid[ele.emiPaid.length-1]?.paidOn>=time).map((a) => {
                        return <tr>
                            <td>{a.firstname} {a.lastname}</td>
                            <td><Link to={`/admindashboard/allLoans/${a.accountNumber}`}>{a.accountNumber}</Link></td>
                            <td>{a.phoneNumber}</td>
                            <td>₹{a.emiPaid[a.emiPaid.length - 1].emiAmount.toLocaleString("en-IN")}</td>
                            <td>{checkDate(a.emiPaid[a.emiPaid.length - 1].paidOn)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <h2>EMI's Pending</h2>
            <table className="table table-striped table-danger table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Mobile Number</th>
                        <th>EMI Amount</th>
                        <th>Last EMI Paid On</th>
                    </tr>
                </thead>
                <tbody>{data?.filter((ele) => ele.emiPaid[ele.emiPaid.length-1]?.paidOn<time).map((a) => {
                    return <tr>
                        <td>{a.firstname} {a.lastname}</td>
                        <td><Link to={`/admindashboard/allLoans/${a.accountNumber}`}>{a.accountNumber}</Link></td>
                        <td>{a.phoneNumber}</td>
                        <td>₹{a.emiPaid[a.emiPaid.length - 1].emiAmount.toLocaleString("en-IN")}</td>
                        <td>{checkDate(a.emiPaid[a.emiPaid.length - 1].paidOn)}</td>
                    </tr>
                })

                }</tbody>
            </table>
        </div>
    )
}

export default EMIs