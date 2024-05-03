import React, { useState, useEffect } from "react";
import Chart, { CategoryScale, LineElement, LinearScale } from 'chart.js/auto';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useGetStockDetailsQuery, useLazyCheckLoginQuery, usePurchaseMutation } from "../services/stocksApi";
import { Line } from "react-chartjs-2"
import { useFormik } from "formik";
import * as Yup from 'yup'
import { setUser } from "./userSlice";
const Graph = () => {
    let { cname } = useParams()
    const [checkLogin] = useLazyCheckLoginQuery()
    const [purchase] = usePurchaseMutation()
    const { data, isLoading } = useGetStockDetailsQuery(cname)
    const { user } = useSelector(state => state.userDetails)
    const dispatch = useDispatch()
    let [info, setSort] = useState("IntraDay")
    let [stocks, setStocks] = useState({ "x": "", "y": "" })
    Chart.register(
        LineElement,
        CategoryScale,
        LinearScale
    )
    useEffect(() => {
        if (data)
            setInfo("IntraDay")
    }, [data])
    let MM = new Date().getMonth()
    let YYYY = new Date().getFullYear()
    let DD = new Date().getDate()
    const setInfo = (e) => {
        setSort(e)
        // console.log(e);
        let x = 1;
        if (new Date().getDay() === 0) {
            x = 2
        }
        if (new Date().getDay() === 1) {
            x = 3
        }
        if(e==="Hourly"){
            let d1 = data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM, DD - x) && (new Date(a.datetime).getTime() <= new Date().getTime() - 86400000))).reverse()
            setStocks({
                yclose: d1.map((a) => a.close), yopen: d1.map((a) => a.open), x: d1.map((a) => `${new Date(a.datetime).getHours()}:${new Date(a.datetime).getMinutes()}`)
            }
            )
        }
        if (e === "IntraDay") {
            let d1 = data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM, DD - x) && (new Date(a.datetime).getTime() <= new Date().getTime() - 86400000))).reverse()
            setStocks({
                yclose: d1.map((a) => a.close), yopen: d1.map((a) => a.open), x: d1.map((a) => `${new Date(a.datetime).getHours()}:${new Date(a.datetime).getMinutes()}`)
            }
            )
        }

        else if (e === "Weekly") {

            let d1 = data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM, DD - 7) && (new Date(a.datetime).getMinutes() === 59 || new Date(a.datetime).getMinutes() === 0 || new Date(a.datetime).getMinutes() === 30 || new Date(a.datetime).getMinutes() === 15 || new Date(a.datetime).getMinutes() === 45))).reverse()
            setStocks({
                yclose: d1.map((a) => a.close), yopen: d1.map((a) => a.open), x: d1.map((a) => `${new Date(a.datetime).getDate()}-${new Date(a.datetime).getMonth() + 1} ${new Date(a.datetime).getHours()}:${new Date(a.datetime).getMinutes()}`)
            }
            )
        }
        else if (e === "Monthly") {
            let d1 = data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM - 1, DD) && (new Date(a.datetime).getMinutes() === 59 || new Date(a.datetime).getMinutes() === 30))).reverse()
            setStocks({
                yclose: d1.map((a) => a.close), yopen: d1.map((a) => a.open), x: d1.map((a) => `${new Date(a.datetime).getDate()}/${new Date(a.datetime).getMonth() + 1}`)
            }
            )
        }
    }

    const change = (e) => {
        if (!e.nativeEvent.shiftKey) {
            if (info === "Monthly")
                setInfo("Weekly")
            if (info === "Weekly")
                setInfo("IntraDay")
            if(info==="IntraDay")
                setInfo("Hourly")
        }
        else {
            if(info==="Hourly")
                setInfo("IntraDay")
            if (info === "IntraDay")
                setInfo("Weekly")
            if (info === "Weekly")
                setInfo("Monthly")
        }
    }
    const buyFormik = useFormik({
        initialValues: {
            stocks: "",
            amount: "",
            company: cname,
            type: "buy",
            status: "pending"
        },
        validationSchema:Yup.object({
            stocks:Yup.number().required("*This Field is required*"),
            amount:Yup.number().required("*This Field is required*")
        }),
        onSubmit: (value, { resetForm }) => {
            if (user.wallet > value.amount * value.stocks) {
                purchase(value).then((res) => {
                    checkLogin().then((res) => { dispatch(setUser(res.data.user)) })
                    alert("Your Purchase was added")
                })
            }
            else {
                alert("No Sufficient Funds in Wallet")
            }
            resetForm()
        }
    })
    const sellFormik = useFormik({
        initialValues: {
            stocks: "",
            amount: "",
            company: cname,
            type: "sell",
            status: "pending"
        },
        onSubmit: (value, { resetForm }) => {
            if(user.Allstocks.filter(stock=>stock.company===cname).reduce((a,b)=>(b.type==="buy"&&b.status==="done")?a+b.stocks:a-b.stocks,0)>value.stocks)
            {
                purchase(value).then((res) => {
                    checkLogin().then((res) => { dispatch(setUser(res.data.user)) })
                })
            }
            else{
                alert("InSufficient Stocks")
            }
            resetForm()
        }
    })
    return <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">BUY STOCKS</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="recipient-name" className="col-form-label">Desired Number of Stocks:</label>
                                <input type="number" className="form-control" name="stocks" id="recipient-name" value={buyFormik.values.stocks} onChange={buyFormik.handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">Desired Price of Stock:</label>
                                <input type="number" className="form-control" name="amount" id="message-text" value={buyFormik.values.amount} onChange={buyFormik.handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={buyFormik.handleSubmit}>Buy Stocks</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">SELL STOCKS</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="recipient-name" className="col-form-label">Desired Number of Stocks:</label>
                                <input type="number" className="form-control" name="stocks" id="recipient-name" value={sellFormik.values.stocks} onChange={sellFormik.handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">Desired Price of Stock:</label>
                                <input type="number" className="form-control" name="amount" id="message-text" value={sellFormik.values.amount} onChange={sellFormik.handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={sellFormik.handleSubmit}>Sell Stocks</button>
                    </div>
                </div>
            </div>
        </div>
        <h1>Graphs</h1>
        {
            isLoading && <h2>Loading........</h2>
        }
        {
            !isLoading && <>
                <div>
                    {/* <input type="radio" name="graph" onChange={(e) => { setInfo(e.target.value) }} id="Daily" value="Daily" /><label htmlFor="Daily">Daily Data</label> */}
                    <button name="graph" onClick={(e) => { setInfo(e.target.value) }} id="IntraDay" value="IntraDay" >IntraDay Data</button>
                    <button name="graph" onClick={(e) => { setInfo(e.target.value) }} id="Weekly" value="Weekly" >Weekly Data</button>
                    <button name="graph" onClick={(e) => { setInfo(e.target.value) }} id="Monthly" value="Monthly" >Monthly Data</button>
                </div>
                <div >
                    {data && <Line onDoubleClick={(e) => { change(e) }} height="400px" width="400px" className="graph" data={{
                        labels: stocks.x,
                        datasets: [
                            {
                                label: `${info} Closing`,
                                data: stocks.yclose,
                                borderColor: "red",
                                borderWidth: 2,
                                pointBackgroundColor: "red",
                                backgroundColor: "rgba(255,0,0,0.2)",
                                fill: true

                            }
                        ],
                    }}
                        options={
                            {
                                scales: {
                                    x: {
                                        ticks: {
                                            maxTicksLimit: 5
                                        }
                                    }
                                },
                                maintainAspectRatio: false
                            }
                        } ></Line>}
                </div>
                <section className="text-center">
                    {/* <h6>Current Price:{data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM, DD - 1) && (new Date(a.datetime).getTime() <= new Date().getTime() - 86400000)))[0].close}</h6>
                    <h6>Current Time:{data[0].values.filter((a) => (new Date(a.datetime) > new Date(YYYY, MM, DD - 1) && (new Date(a.datetime).getTime() <= new Date().getTime() - 86400000)))[0].datetime}</h6> */}
                    <button type="button" className="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">BUY STOCK</button>
                    <button type="button" className="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo">SELL STOCK</button>
                    {/* <button className="btn btn-success m-2">Sell</button> */}
                </section>
            </>
        }
    </div>
}

export default Graph