import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch =useDispatch();
    const filter = useSelector(state => state.filter);

    const handleChange =(event) => {
        const value = event.target.value;
        dispatch(setFilter(value));
    }

   return (
    <div style={{marginBottom: "10px"}}>filter <input onChange={handleChange} value={filter}/></div>
   )
}

export default Filter;