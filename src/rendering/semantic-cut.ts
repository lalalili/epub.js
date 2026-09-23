import EpubCFI from '../epubcfi';

export interface SemanticCut { version: 1; algorithm: 'cfi-runs-sha256-v1'; sourceDigest: string; runs: string[] }
type Box={left:number;right:number;top:number;bottom:number};
type Glyph={node:Text;start:number;end:number;rects:Box[]};
const LIMIT=12000;
// Synchronous SHA-256 keeps the existing synchronous descriptor/Promise contract.
export function semanticDigest(text:string):string {
 const bytes=new TextEncoder().encode(text),length=bytes.length;
 const padded=new Uint8Array(Math.ceil((length+9)/64)*64);padded.set(bytes);padded[length]=128;
 const dv=new DataView(padded.buffer);dv.setUint32(padded.length-4,length*8);
 const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
 const ro=(v:number,n:number)=>(v>>>n)|(v<<(32-n));
 for(let off=0;off<padded.length;off+=64){
  const w=new Uint32Array(64);for(let i=0;i<16;i++)w[i]=dv.getUint32(off+i*4);
  for(let i=16;i<64;i++){const a=w[i-15],b=w[i-2];w[i]=(w[i-16]+(ro(a,7)^ro(a,18)^(a>>>3))+w[i-7]+(ro(b,17)^ro(b,19)^(b>>>10)))>>>0;}
  let [a,b,c,d,e,f,g,z]=h;
  for(let i=0;i<64;i++){const t=(z+(ro(e,6)^ro(e,11)^ro(e,25))+((e&f)^(~e&g))+k[i]+w[i])>>>0;
   const u=((ro(a,2)^ro(a,13)^ro(a,22))+((a&b)^(a&c)^(b&c)))>>>0;z=g;g=f;f=e;e=(d+t)>>>0;d=c;c=b;b=a;a=(t+u)>>>0;}
  [a,b,c,d,e,f,g,z].forEach((v,i)=>h[i]=(h[i]+v)>>>0);
 }
 return h.map(v=>v.toString(16).padStart(8,'0')).join('');
}
function glyphs(doc:Document):{items:Glyph[];digest:string} {
 const walker=doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT),items:Glyph[]=[];let text='';
 for(let n=walker.nextNode();n;n=walker.nextNode()){
  const node=n as Text;if(node.parentElement?.closest('script,style,noscript'))continue;
  text+=node.data;if(text.length>LIMIT)throw Error('semantic-cut-quota');
  let visible=true;for(let p=node.parentElement;p;p=p.parentElement){const s=doc.defaultView!.getComputedStyle(p);if(s.display==='none'||s.visibility!=='visible'||Number(s.opacity)===0)visible=false;}
  let pos=0;for(const char of node.data){const start=pos;pos+=char.length;if(/\s/u.test(char))continue;
   const r=doc.createRange();r.setStart(node,start);r.setEnd(node,pos);
   items.push({node,start,end:pos,rects:visible?[...r.getClientRects()].filter(b=>b.width>0&&b.height>0):[]});
  }
 }
 return {items,digest:semanticDigest(text)};
}
export function localSemanticClip(frame:HTMLIFrameElement):Box|null {
 const f=frame.getBoundingClientRect(),win=frame.ownerDocument.defaultView!;
 const c={left:Math.max(0,f.left),right:Math.min(win.innerWidth,f.right),top:Math.max(0,f.top),bottom:Math.min(win.innerHeight,f.bottom)};
 for(let p:Element|null=frame.parentElement;p;p=p.parentElement||(p.getRootNode() as ShadowRoot).host){
  const s=p.ownerDocument.defaultView!.getComputedStyle(p),r=p.getBoundingClientRect();
  if(/hidden|clip|auto|scroll/.test(s.overflowX)){c.left=Math.max(c.left,r.left);c.right=Math.min(c.right,r.right);}
  if(/hidden|clip|auto|scroll/.test(s.overflowY)){c.top=Math.max(c.top,r.top);c.bottom=Math.min(c.bottom,r.bottom);}
 }
 return c.right>c.left&&c.bottom>c.top?{left:c.left-f.left,right:c.right-f.left,top:c.top-f.top,bottom:c.bottom-f.top}:null;
}
const hit=(r:Box,c:Box)=>r.right>c.left&&r.left<c.right&&r.bottom>c.top&&r.top<c.bottom;
export function captureSemanticCut(doc:Document,frame:HTMLIFrameElement,cfiBase:string):SemanticCut|null {
 try{
  const clip=localSemanticClip(frame);if(!clip||frame.contentDocument!==doc)return null;
  const {items,digest}=glyphs(doc);const runs:string[]=[];let range:Range|null=null,last:Glyph|null=null;
  const flush=()=>{if(range)runs.push(new EpubCFI(range,cfiBase).toString());range=null;};
  for(const g of items){if(!g.rects.some(r=>hit(r,clip))){flush();last=null;continue;}
   if(!range||last?.node!==g.node){flush();range=doc.createRange();range.setStart(g.node,g.start);}
   range.setEnd(g.node,g.end);last=g;
  }flush();
  const cut:SemanticCut={version:1,algorithm:'cfi-runs-sha256-v1',sourceDigest:digest,runs};
  return runs.length>0&&runs.length<=32&&JSON.stringify(cut).length<=3000?cut:null;
 }catch{return null;}
}
export function resolveSemanticCut(doc:Document,frame:HTMLIFrameElement,cut:SemanticCut,maxStart:number,cfiBase:string):{status:string;physicalStart?:number;reason?:string} {
 try{
  if(cut?.version!==1||cut.algorithm!=='cfi-runs-sha256-v1'||!Array.isArray(cut.runs)||!cut.runs.length||cut.runs.length>32||JSON.stringify(cut).length>3000)return {status:'unavailable',reason:'invalid-semantic-cut'};
  if(!Number.isFinite(maxStart)||maxStart<0||!cfiBase||new Set(cut.runs).size!==cut.runs.length||cut.runs.some(c=>typeof c!=='string'||!c.startsWith('epubcfi('+cfiBase+'!')))return {status:'unavailable',reason:'invalid-semantic-source-range'};
  const clip=localSemanticClip(frame);if(!clip||frame.contentDocument!==doc)return {status:'unavailable',reason:'stale-document'};
  const {items,digest}=glyphs(doc);if(digest!==cut.sourceDigest)return {status:'unavailable',reason:'semantic-source-mismatch'};
  const resolvedRanges=cut.runs.map(c=>new EpubCFI(c).toRange(doc));
  const ranges=resolvedRanges.filter((range): range is Range => Boolean(range && "comparePoint" in range && typeof range.comparePoint === "function"));
  if(ranges.length!==resolvedRanges.length)return {status:'unavailable',reason:'invalid-semantic-source-range'};
  if(ranges.some(r=>!r||r.collapsed||r.startContainer.ownerDocument!==doc||r.endContainer.ownerDocument!==doc))return {status:'unavailable',reason:'invalid-semantic-source-range'};
  const desired=items.map(g=>ranges.some(r=>r.comparePoint(g.node,g.start)===0&&r.comparePoint(g.node,g.end)===0));
  if(!desired.some(Boolean))return {status:'unavailable',reason:'empty-semantic-cut'};
  const width=clip.right-clip.left;let lo=0,hi=maxStart;
  // A glyph with multiple visible fragments is not guessed; this bounded lane fails closed.
  const rects=items.map(g=>g.rects.filter(r=>r.bottom>clip.top&&r.top<clip.bottom));
  for(let i=0;i<items.length;i++)if(desired[i]){
   if(rects[i].length!==1)return {status:'unavailable',reason:'ambiguous-glyph-fragments'};
   lo=Math.max(lo,rects[i][0].left-width);hi=Math.min(hi,rects[i][0].right);
  }
  if(!(lo<hi))return {status:'unavailable',reason:'semantic-cut-not-reprojectable'};
  let intervals:[[number,number]]|Array<[number,number]>=[[lo,hi]];
  for(let i=0;i<items.length;i++)if(!desired[i])for(const r of rects[i]){
   const a=r.left-width,b=r.right;intervals=intervals.flatMap(([l,h]):Array<[number,number]>=>b<=l||a>=h?[[l,h]]:[[l,Math.min(h,a)],[Math.max(l,b),h]].filter(([x,y])=>x<y) as Array<[number,number]>);
   if(intervals.length>128)return {status:'unavailable',reason:'semantic-interval-quota'};
  }
  // Distinct disjoint placements remain ambiguous, even with matching anchors.
  if(intervals.length!==1)return {status:'unavailable',reason:'ambiguous-semantic-cut'};
  const start=(intervals[0][0]+intervals[0][1])/2;
  const target={...clip,left:start,right:start+width};
  if(items.some((g,i)=>g.rects.some(r=>hit(r,target))!==desired[i]))return {status:'unavailable',reason:'semantic-cut-validation-failed'};
  return {status:'qualified',physicalStart:start};
 }catch{return {status:'unavailable',reason:'semantic-cut-resolution-failed'};}
}
