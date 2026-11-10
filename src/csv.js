import {finite,keyOf} from './gp.js';
export function parseCSV(text){
  if(text.length>1_000_000)throw new Error('CSV exceeds 1 MB. Use a smaller public or simulated dataset.');
  text=text.replace(/^\uFEFF/,'');let rows=[],row=[],cell='',quoted=false,closed=false;
  for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;}else if(c==='"'){if(cell||closed)throw new Error('Malformed CSV quotation. Quote the entire cell.');quoted=true;}else if(c===','||c==='\n'||c==='\r'){row.push(cell.trim());cell='';closed=false;if(c!==','){if(row.some(v=>v!==''))rows.push(row);row=[];if(c==='\r'&&text[i+1]==='\n')i++;}}else{if(closed&&!/\s/.test(c))throw new Error('Unexpected text after a quoted CSV cell.');cell+=c;}}
  if(quoted)throw new Error('Unclosed quoted CSV cell.');row.push(cell.trim());if(row.some(v=>v!==''))rows.push(row);
  if(rows.length<2)throw new Error('CSV needs a header and at least one data row.');
  const headers=rows.shift();if(headers.some(h=>!h||h.length>100)||new Set(headers).size!==headers.length)throw new Error('Column names must be nonempty, unique, and at most 100 characters.');
  if(headers.length>30||rows.length>1000)throw new Error('Maximum 30 columns and 1,000 rows per CSV.');
  rows.forEach((r,i)=>{if(r.length!==headers.length)throw new Error(`Row ${i+2} has ${r.length} fields; expected ${headers.length}.`);});
  return {headers,rows:rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]])))};
}
export function numberCell(v,label){if(v===undefined||String(v).trim()==='')throw new Error(`${label}: a number is required; unknown targets must stay blank only in candidates.`);if(!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(String(v).trim()))throw new Error(`${label}: “${String(v).slice(0,30)}” is not a valid number.`);const n=Number(v);if(!finite(n))throw new Error(`${label}: use a finite number with magnitude at most 1e100.`);return n;}
export function importTask(measured,candidates,{features,candidateFeatures,target,candidateTarget='',direction='max',kind,source}){
  if(!['public','simulated'].includes(kind))throw new Error('Confirm that the data are public or simulated.');
  if(!source?.trim())throw new Error('Describe the public source or simulation. Include units and fixed conditions.');
  if(features.length<1||features.length>3||new Set(features).size!==features.length||features.includes(target))throw new Error('Choose 1–3 different condition columns, separate from the target.');
  if(candidateFeatures.length!==features.length||new Set(candidateFeatures).size!==features.length||candidateFeatures.includes(candidateTarget))throw new Error('Map each condition to a different candidate column, separate from the target.');
  if(!measured.headers.includes(target)||features.some(k=>!measured.headers.includes(k))||candidateFeatures.some(k=>!candidates.headers.includes(k))||(candidateTarget&&!candidates.headers.includes(candidateTarget)))throw new Error('A mapped column is missing. Check the field mapping.');
  if(!candidateTarget&&candidates.headers.includes(target))candidateTarget=target;
  const observations=measured.rows.map((r,i)=>({id:`M${i+1}`,x:features.map(k=>numberCell(r[k],`Measured row ${i+2}, ${k}`)),y:numberCell(r[target],`Measured row ${i+2}, ${target}`)}));
  if(observations.length<2||observations.length>200)throw new Error('Use 2–200 distinct measured rows (at least 3 recommended).');
  const seen=new Set();for(const o of observations){const key=keyOf(o.x);if(seen.has(key))throw new Error('Duplicate measured conditions. Average compatible replicates explicitly, or remove duplicates.');seen.add(key);}
  const pool=candidates.rows.map((r,i)=>{if(candidateTarget&&r[candidateTarget]!=='')throw new Error(`Candidate row ${i+2}: target must be blank, not zero. Move known results to the measured table.`);return {id:`C${i+1}`,x:candidateFeatures.map(k=>numberCell(r[k],`Candidate row ${i+2}, ${k}`))};});
  const unique=new Set();for(const c of pool){const key=keyOf(c.x);if(unique.has(key))throw new Error('Duplicate candidate conditions. Remove the duplicate rows.');unique.add(key);}
  return {observations,candidates:pool,features:features.map(name=>({name,label:name})),target,direction,source:source.trim().slice(0,2000),kind,overlap:pool.filter(c=>seen.has(keyOf(c.x))).length};
}
const csvCell=v=>{const str=v===null||v===undefined?'':String(v);const safe=/^[=+@\t\r]/.test(str)||(/^\-/.test(str)&&!Number.isFinite(Number(str)))?`'${str}`:str;return /[",\n\r]/.test(safe)?`"${safe.replaceAll('"','""')}"`:safe;};
export function toCSV(headers,rows){return '\uFEFF'+[headers,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n')+'\r\n';}
