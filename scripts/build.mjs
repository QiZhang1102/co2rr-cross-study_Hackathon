import {cp,mkdir,rm,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=createHash('sha256');for(const file of (await readdir('src')).sort())hash.update(file).update(await readFile(`src/${file}`));
const id=hash.digest('hex').slice(0,12),assetDir=`assets/${id}`;
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});await cp('src',`dist/${assetDir}`,{recursive:true});
const html=(await readFile('index.html','utf8')).replaceAll('./src/',`./${assetDir}/`).replace('<head>',`<head><meta name="build-id" content="${id}">`);
await writeFile('dist/index.html',html);await writeFile('dist/build.json',JSON.stringify({build_id:id})+'\n');
console.log(`Built static app in dist/; content-addressed assets ${id}.`);
