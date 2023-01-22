import { Autocomplete, Box ,Chip,TextField} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import axios from "axios";

import { defaultValues, options, SearchStateProps } from "./locationSearch";


 const LOCATION_SEARCH_URL = '/app/api/v1/location';
const Search =() =>{
  const [state, setState] = useState<SearchStateProps>(defaultValues)

  const  handleChange =(e: any) => {
        if(e.length>3) getCity(e);
        if(e) setState((m) => ({ ...m, open:true}));
        else setState((m) => ({ ...m, open:false})); 
      }
    const saveSelection = (newValue: any) => {
        if(newValue){
            saveSearchData(newValue);
            setState((m) => ({ ...m, open:false,value:null}));
          }
    }
    const  saveSearchData = async (cityData: any)=> {

     
      try{
      const response = await axios.post(LOCATION_SEARCH_URL+"/save", cityData);
      setState((m) => ({ ...m, selectedOptions:response.data.data}));
    
    }catch(error) {
      console.error(error);
  }
  }
    

     const  getCity = async(searchText:string) =>{
          try{
          const response = await axios.get(`/app/api/v1/location/search?searchKey=${searchText}`,
           {headers: options.headers}) 
              if(response.data) 
                setState((m) => ({ ...m, cities:response.data.data}));
          }
              catch(error) {
              console.error(error);
          };
    }
    return (
        <>
        <Autocomplete id="Search" open={state.open??false}
      onInputChange={(_,value)=>handleChange(value)}
      sx={{ width: 400 }}
      options={state.cities}
      getOptionLabel={(option) => option.city}
      autoHighlight
      value={state.value}
        onChange={(event, newValue) => {
          setState((m) => ({ ...m, value:newValue}));
          saveSelection(newValue)
        }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={state.value}
          label="Search Location"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
    <Box mt={1} >
      {state.selectedOptions?.slice(0,state.displayValue).map((data, index) => (
                //<Chip style={{'color':'black'}} key={index}  >{data.city??''} </Chip>
                <Chip label={data.city}>{data.city}</Chip>
            ))}
            {
             state.selectedOptions.length >2 && 
              <Chip label={ state.displayValue!==state.selectedOptions.length ? state.selectedOptions.length-2+" more " : "show less"} onClick={
                () => {
                  setState((m) => ({ ...m, displayValue: state.displayValue!==state.selectedOptions.length ?state.selectedOptions.length: 2 }));
                }
              }/>
              
            }     
      </Box>
        </>
    );
};
export default Search;
