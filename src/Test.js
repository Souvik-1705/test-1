import React, { useState,useEffect } from 'react'

export default function Test() {
    const[orderId,setOrderId]=useState("");
    const[price,setPrice]=useState("");
    const[dish,setDish]=useState("");
    const[table,setTable]=useState("");
    const[order,setOrder]=useState(JSON.parse(localStorage.getItem("order")) ||{"table-1" : [],"table-2" : [], "table-3":[]});

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(order));
      }, [order]);
    

    function handleAddOrder(event){
        event.preventDefault();

        if(!orderId || !price || !dish || !table){
            alert("All the fields are mandatory");
            return;
        }

        const newOrders={
            id:orderId,
            dish:dish,
            price:parseFloat(price),
        }

        setOrder((prevOrders) => ({
            ...prevOrders,
            [table]: [...prevOrders[table], newOrders],
          }));

          setOrderId("");
          setDish("");
          setPrice("");
          setTable("");
    }

    function handleDeleteOrder(tableName,orderId){
        setOrder((prevOrders) => ({
            ...prevOrders,
            [tableName]: prevOrders[tableName].filter((order) => order.id !== orderId),
          }));
    }

  return (
    <div>
        <h1>Restaurant Oder App</h1>

        <form onSubmit={handleAddOrder}>
            <label>Unique Order ID </label>
            <input type='text'value={orderId} onChange={(e)=>setOrderId(e.target.value)}></input>

            <label> Choose Price </label>
            <input type='number'value={price} onChange={(e)=>setPrice(e.target.value)}></input>

            <label> Choose Dish </label>
            <input type='text'value={dish} onChange={(e)=>setDish(e.target.value)}></input>

            <select value={table} onChange={(e)=>setTable(e.target.value)}>
                <option value=""> Choose Table </option>
                <option value="table-1">Table-1</option>
                <option value="table-2">Table-2</option>
                <option value="table-3">Table-3</option>
            </select>
            <button> Add to bill</button>
        </form>

        <div>
        {Object.keys(order).map((tableName) => (
          <div key={tableName} className="table">
            <h2>{tableName.toUpperCase()}</h2>
            <ul>
              {order[tableName].map((order) => (
                <li key={order.id}>
                  {order.dish} - ${order.price.toFixed(2)}
                  <button onClick={() => handleDeleteOrder(tableName, order.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
    </div>
  )
}
