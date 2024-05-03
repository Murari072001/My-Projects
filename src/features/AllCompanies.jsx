import React from "react";
import { useGetAllCompaniesQuery } from "../services/stocksApi";
import { useNavigate } from "react-router-dom"

function AllCompanies(){
    let { isLoading, data } = useGetAllCompaniesQuery()
    const navigate = useNavigate()

    return <div>
    {
        isLoading&& <h1>Loading.......</h1>
    }
    {
        (!isLoading&&data)&& <div className="m-3 ms-auto me-auto container bg-light d-flex flex-wrap justify-content-around">
            {
                data?.map((company,index)=>{
                    return <div key={index} className="card w-25 m-3 border border-dark border-2 p-3">
                        <h6 className="card-title">{company.companyName}</h6>
                        <p>Company Symbol:{company.symbol}</p>
                        <p>CEO:{company.ceo}</p>
                        <p className="text-truncate">{company.shortDescription}</p>
                        <p>Website:<a href={company.website}>{company.website}</a></p>
                        <button className="btn btn-primary" onClick={()=>{navigate(`/dashboard/${company.symbol}`)}}>See Full Details</button>
                    </div>
                })
            }
        </div>
    }
</div>

}

export default AllCompanies