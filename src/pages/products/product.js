import { requestProductsByFilter } from "./product-slice";
// import { dispatch } from "../../app-store/store";
import { useDispatch } from "react-redux";

export function ProductList() {
    const dispatch = useDispatch();
    return(
        <div>
            <button onClick={() => dispatch(requestProductsByFilter({productCategories: ["abc"]}))}></button>
        </div>
    );
}