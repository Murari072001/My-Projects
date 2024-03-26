import React from "react";
import { useAllLoansQuery } from "../../services/jsonApi";
import { useNavigate } from "react-router-dom";

const AllLoans=()=>{
    let {data,isLoading}=useAllLoansQuery()
    const navigate=useNavigate()
    return (
        <div>
            <h1>Show All Loans</h1>
            <div className="d-flex flex-wrap justify-content-evenly allLoans">{
                data?.map((loan,ind)=>{
                        return <div key={ind} className="card w-25 m-3 p-2 border border-dark border-3">
                    <h5>{loan.firstname} {loan.lastname}</h5>
                    <p>LoanType:{loan.loanType}</p>
                    <p>Loan Amount:{(loan.loanAmount).toLocaleString('en-IN')}</p>
                    <button className="btn btn-warning" onClick={()=>{navigate(`${loan.accountNumber}`)}}>Show Full Details</button>
                    </div>
                })
            }</div>
        </div>
    )
}

export default AllLoans