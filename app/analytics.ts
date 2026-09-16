export function track(event:string,details:Record<string,string|number>={}){
 if(typeof window==='undefined')return;
 const w=window as Window & {dataLayer?:unknown[]};
 (w.dataLayer ||= []).push({event,...details});
}
