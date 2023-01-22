export interface SearchStateProps {
    value : string|null;
    open : boolean;
    displayValue : number;
    selectedOptions : any[];
    cities : any[];
 }
 
 export const defaultValues : SearchStateProps = {
     value : null,
     open : false,
     displayValue : 2,
     cities : [],
     selectedOptions:[]
 }
 export const options = {
    method: 'GET',
    url: '/app/api/v1/location/search?searchKey=',
    headers: {

    }
  };