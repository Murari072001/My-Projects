import React, { useEffect, useState } from "react";
import { useAllLoansQuery } from "../../services/jsonApi";
import { Link } from "react-router-dom";

const SanctionedInMonth=()=>{
    const { data, isLoading } = useAllLoansQuery()
  const [time, setDate] = useState('')
    useEffect(() => {
        let temp = new Date()
        setDate(new Date(temp.getFullYear(), temp.getMonth(), 1, 0, 0, 0))
      }, [])
    return (
        <div>
            <h2>Sanctioned In Month</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Loan Amount</th>
                        <th>Loan Type</th>
                        <th>Issued On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{
                data?.filter((ele) => ele.date > time).map((ele)=>{
                    let date=new Date(ele.date)
                    return <tr>
                        <td>{ele.firstname} {ele.lastname}</td>
                        <td>{ele.accountNumber}</td>
                        <td>₹{ele.loanAmount.toLocaleString("en-IN")}</td>
                        <td>{ele.loanType}</td>
                        <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                        <td><Link to={`/admindashboard/allLoans/${ele.accountNumber}`}>Click Here</Link></td>
                    </tr>
                })
            }
            </tbody>
            </table>
        </div>
    )
}

export default SanctionedInMonth