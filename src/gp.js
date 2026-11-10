/** Independent browser implementation of the original Phase 2 mathematical protocol.
 * No outcomes from an unrevealed candidate are accepted by this module.
 */
export const MODEL = Object.freeze({kernel:'Matérn 5/2', lengthScale:0.35, noiseSD:0.03});
export const keyOf = x => x.map(v => Object.is(v,-0) ? 0 : v).join('|');
export function finite(v) { return typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= 1e100; }
export function random(seed) { let a=seed>>>0; return () => { a+=0x6D2B79F5; let t=a; t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296; }; }
export function shuffled(items,seed) { const a=[...items],r=random(seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
export function kernel(a,b) { const r=Math.sqrt(5*a.reduce((s,v,i)=>s+(v-b[i])**2,0))/MODEL.lengthScale;return (1+r+r*r/3)*Math.exp(-r); }
export function cholesky(a) { const n=a.length,L=Array.from({length:n},()=>Array(n).fill(0));for(let i=0;i<n;i++)for(let j=0;j<=i;j++){let s=a[i][j];for(let k=0;k<j;k++)s-=L[i][k]*L[j][k];if(i===j){if(!(s>0))throw new Error('Model fit failed: covariance is not positive definite. Check repeated or extreme conditions.');L[i][j]=Math.sqrt(s);}else L[i][j]=s/L[j][j];}return L; }
function forward(L,b){return b.map((v,i,a)=>{for(let j=0;j<i;j++)v-=L[i][j]*a[j];return a[i]=v/L[i][i];});}
export function solve(L,b){const z=forward(L,[...b]),out=Array(b.length);for(let i=b.length-1;i>=0;i--){let v=z[i];for(let j=i+1;j<b.length;j++)v-=L[j][i]*out[j];out[i]=v/L[i][i];}return out;}
// Abramowitz & Stegun 7.1.26; max CDF error approximately 7.5e-8.
export function normalCDF(z){const sign=z<0?-1:1,x=Math.abs(z)/Math.SQRT2,t=1/(1+0.3275911*x);const erf=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return 0.5*(1+sign*erf);}
export function expectedImprovement(mean,sd,best,direction='max'){const d=direction==='max'?mean-best:best-mean;if(sd<1e-12)return Math.max(0,d);const z=d/sd;return Math.max(0,d*normalCDF(z)+sd*Math.exp(-z*z/2)/Math.sqrt(2*Math.PI));}
export function recommend({observations,candidates,excluded=[],direction='max',domain,prior,seed=42,policy='ei'}) {
  if(!['max','min'].includes(direction))throw new Error('Choose maximize or minimize.');
  if(!['ei','mean','random'].includes(policy))throw new Error('Unknown selection policy.');
  if(observations.length<2)throw new Error('Add at least 2 distinct measured conditions before fitting. Three or more is recommended.');
  if(observations.length>200||candidates.length>1000)throw new Error('This browser version supports up to 200 measured and 1,000 candidate rows.');
  const d=observations[0].x.length;
  if(d<1||d>3)throw new Error('Select 1–3 numeric condition variables.');
  const seen=new Set(),ids=new Set();
  for(const o of observations){if(o.x.length!==d||!o.x.every(finite)||!finite(o.y))throw new Error('Measured conditions and targets must be finite numbers.');if(seen.has(keyOf(o.x)))throw new Error('Repeated measured conditions: combine replicates explicitly before import.');seen.add(keyOf(o.x));}
  for(const c of candidates){if(c.x.length!==d||!c.x.every(finite))throw new Error('Every candidate needs all numeric condition fields.');if(c.y!==undefined&&c.y!==null)throw new Error('Candidate outcomes must be unknown. Keep target cells blank.');if(ids.has(c.id))throw new Error('Candidate IDs must be unique.');ids.add(c.id);}
  const cs=new Set();for(const c of candidates){if(cs.has(keyOf(c.x)))throw new Error('Duplicate candidate conditions. Remove duplicate rows.');cs.add(keyOf(c.x));}
  const available=shuffled(candidates.filter(c=>!seen.has(keyOf(c.x))&&!excluded.includes(c.id)),seed);
  if(!available.length)return [];
  const space=domain??[...observations,...candidates].map(o=>o.x);
  if(!space.length||space.some(x=>x.length!==d||!x.every(finite)))throw new Error('Invalid candidate coordinate domain.');
  const low=Array.from({length:d},(_,i)=>Math.min(...space.map(x=>x[i]))),span=low.map((l,i)=>Math.max(...space.map(x=>x[i]))-l||1);
  const scale=x=>x.map((v,i)=>(v-low[i])/span[i]);
  const center=prior?.center??observations.reduce((s,o)=>s+o.y/observations.length,0);
  const yScale=prior?.scale??(Math.sqrt(observations.reduce((s,o)=>s+(o.y-center)**2,0)/observations.length)||Math.max(1,Math.abs(center)*0.1));
  if(!finite(center)||!finite(yScale)||yScale<=0)throw new Error('Target values are too extreme to fit safely. Rescale your units.');
  const X=observations.map(o=>scale(o.x)),Y=observations.map(o=>(o.y-center)/yScale);
  const L=cholesky(X.map((a,i)=>X.map((b,j)=>kernel(a,b)+(i===j?MODEL.noiseSD**2:0))));
  const alpha=solve(L,Y),best=(direction==='max'?Math.max:Math.min)(...observations.map(o=>o.y));
  const output=available.map((c,tieOrder)=>{const x=scale(c.x),k=X.map(a=>kernel(a,x)),v=forward(L,[...k]);const mean=center+yScale*k.reduce((s,q,i)=>s+q*alpha[i],0),sd=yScale*Math.sqrt(Math.max(1e-12,1-v.reduce((s,q)=>s+q*q,0)));
    const ei=expectedImprovement(mean,sd,best,direction),distance=Math.min(...X.map(a=>Math.sqrt(a.reduce((s,q,i)=>s+(q-x[i])**2,0))));
    if(![mean,sd,ei].every(finite))throw new Error('Model fit produced non-finite predictions. Rescale your data and try again.');
    const promising=direction==='max'?mean>=best:mean<=best;
    const reason=promising?'Predicted performance is promising relative to the best observed result.':distance>0.3?'This region has fewer nearby observations; exploring it may be informative.':'Balances predicted performance and model uncertainty through expected improvement.';
    return {id:c.id,x:[...c.x],mean,sd,ei,reason,tieOrder,score:policy==='mean'?(direction==='max'?mean:-mean):policy==='random'?-tieOrder:ei};
  });
  return output.sort((a,b)=>b.score-a.score||a.tieOrder-b.tieOrder).map((o,i)=>({...o,rank:i+1}));
}
