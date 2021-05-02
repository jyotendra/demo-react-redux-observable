import React from "react";
import { requestProductsByFilter } from "./product-slice";
import { useDispatch, useSelector } from "react-redux";

export function ProductList() {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const apiData = products.items.map((item) => <li key={item.id}>{item.title}</li>);
    return(
        <div style={{ marginTop: "5vh", marginLeft: "5vh"}}>
            <button onClick={() => dispatch(requestProductsByFilter({productCategories: ["abc"]}))}>Fetch Details</button>
            <div>
                <p style={{ marginTop: "5vh"}}>API result will be displayed below. Click button above to fetch data.</p>
                <ul>{apiData}</ul>
            </div>
        </div>
    );
}