const KEY='nextexperiment-consented-events-v1';
const TYPES=new Set(['session_start','page_view','recommendation_generated','result_revealed','result_added','replay_completed','export','feedback']);
export class Evidence {
 constructor(storage=globalThis.localStorage){this.storage=storage;this.enabled=false;this.session=globalThis.crypto.randomUUID();this.test=false;this.events=[];this.persistent=true;try{this.events=JSON.parse(storage.getItem(KEY)||'[]');if(!Array.isArray(this.events))this.events=[];}catch{this.persistent=false;this.events=[];}}
 consent(test=false){this.enabled=true;this.test=test;this.record('session_start');this.record('page_view');}
 record(type,mode='none'){if(!this.enabled||!TYPES.has(type))return;this.events.push({id:crypto.randomUUID(),session_id:this.session,event:type,time:new Date().toISOString(),mode:['replay','custom'].includes(mode)?mode:'none',development_test:this.test});if(this.events.length>5000)this.events=this.events.slice(-5000);try{this.storage.setItem(KEY,JSON.stringify(this.events));}catch{this.persistent=false;}}
 clear(){this.events=[];this.enabled=false;try{this.storage.removeItem(KEY);}catch{this.persistent=false;}}
 export(){return JSON.stringify({schema:'nextexperiment-evidence-v1',storage:'this browser only; not a central user count',confirmed_independent_users:null,events:this.events},null,2);}
}
