export const encodeURLWithParams = (url,paramObject) => 
{
   return url + '?' + Object.entries(paramObject).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
}