import {recommend,shuffled,keyOf} from './gp.js';
/** Outcomes live only in the controller's private oracle. The recommender receives
 * freshly constructed DTOs containing revealed observations and candidate X only. */
export class Replay {
  #outcomes; #candidates;
  constructor(dataset,{seed=42,budget=6,direction='max'}={}){
    if(!Number.isSafeInteger(seed)||seed<0||seed>4294967295)throw new Error('Seed must be an integer from 0 to 4294967295.');
    if(!Number.isInteger(budget)||budget<dataset.initial||budget>dataset.rows.length)throw new Error(`Budget must be ${dataset.initial}–${dataset.rows.length}, including starting conditions.`);
    this.dataset=dataset.id;this.seed=seed;this.budget=budget;this.direction=direction;this.initial=dataset.initial;this.prior=dataset.prior;
    this.#outcomes=new Map(dataset.rows.map(r=>[r.id,r.y]));this.#candidates=dataset.rows.map(({id,x,trace})=>({id,x:[...x],trace}));
    this.observations=[];this.history=[];
    this.startIds=shuffled(this.#candidates.map(c=>c.id),seed).slice(0,this.initial);
    for(const id of this.startIds)this.#reveal(id,'start');
  }
  get candidates(){return this.#candidates.map(c=>({...c,x:[...c.x]}));}
  get complete(){return this.observations.length>=this.budget;}
  #reveal(id,policy){const c=this.#candidates.find(c=>c.id===id);if(!c)throw new Error('Choose a current candidate.');if(this.observations.some(o=>o.id===id))throw new Error('That condition is already revealed.');const y=this.#outcomes.get(id);const o={id,x:[...c.x],y,trace:c.trace};this.observations.push(o);this.history.push({...o,step:this.observations.length,policy});return o;}
  reveal(id,policy='manual'){if(this.complete)throw new Error('Budget complete. Start a new replay to change its budget.');return this.#reveal(id,policy);}
  input(policy='ei'){return {observations:this.observations.map(({id,x,y})=>({id,x:[...x],y})),candidates:this.candidates.map(({id,x})=>({id,x})),domain:this.#candidates.map(c=>[...c.x]),direction:this.direction,seed:this.seed,prior:this.prior,policy};}
  ranking(policy='ei',engine=recommend){return this.complete?[]:engine(this.input(policy));}
}
export function bestCurve(observations,direction='max',initial=1){let best=direction==='max'?-Infinity:Infinity;return observations.map((o,i)=>{best=direction==='max'?Math.max(best,o.y):Math.min(best,o.y);return {budget:i+1,best};}).filter(p=>p.budget>=initial);}
export function compare(dataset,options,engine=recommend){return ['random','mean','ei'].map(policy=>{const run=new Replay(dataset,options);while(!run.complete){const ranked=run.ranking(policy,engine);run.reveal(ranked[0].id,policy);}return {policy,startIds:run.startIds,history:run.history,curve:bestCurve(run.observations,run.direction,run.initial)};});}
export function available(task){const known=new Set(task.observations.map(o=>keyOf(o.x)));return task.candidates.filter(c=>!known.has(keyOf(c.x))&&!task.excluded?.includes(c.id));}
