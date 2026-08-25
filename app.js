import { analyzeImage } from './scanner.js';
const $ = id => document.getElementById(id);
let hasScan = false;
async function analyze(source){
  hasScan=true; $('preview').src=source; $('preview').hidden=false; $('dropContent').hidden=true; $('analysis').classList.remove('hidden');
  const image = new Image();
  image.onload = () => {
    const result = analyzeImage(image);
    $('blankStat').textContent=result.blank+'%'; $('printedStat').textContent=result.printed+'%'; $('damageStat').textContent=result.damage+'%'; $('confidence').textContent=result.confidence+'% confidence · '+result.type; $('meterFill').style.width=result.blank+'%'; recommend(result.blank);
  };
  image.onerror = () => { $('confidence').textContent='Unable to read image'; };
  image.src = source;
}
function recommend(blank){
  const sizes={scratch:'8.5 × 11 in (Letter) or A4',memo:'3 × 3 or 4 × 6 in',flashcards:'3 × 5 or 4 × 6 in'};
  const demand=[...document.querySelectorAll('[data-demand]')].map(x=>({name:x.dataset.demand,value:+x.value,size:sizes[x.dataset.demand]})).sort((a,b)=>b.value-a.value)[0]; const enough=blank>=20;
  $('decision').textContent=enough?'Reuse recommended':'Recycle recommended'; $('recommendation').textContent=enough?`Cut into ${demand.name} ${demand.name==='scratch'?'sheets':''}`:'Send to recycling'; $('recommendationCopy').textContent=enough?`Best match for today's highest demand: ${demand.name} · typical size ${demand.size}.`:'There is not enough usable area to justify cutting waste.';
  $('reasoning').innerHTML=enough?`<span>Why this choice?</span><br />${blank}% usable area × ${demand.value}% demand · low offcut risk · estimated ${Math.max(1,Math.floor(blank/28))} usable pieces.`:'<span>Why this choice?</span><br />The usable area is below the school’s reuse threshold.'; $('pieceCount').textContent=enough?Math.max(1,Math.floor(blank/28)):0; $('recovered').textContent=enough?blank+'%':'0%'; $('waste').textContent=enough?Math.max(4,100-blank-20)+'%':'0%'; $('processed').textContent='129'; $('reused').textContent=enough?'87':'86'; $('diverted').textContent=enough?'68%':'67%';
}
$('fileInput').addEventListener('change',e=>{const f=e.target.files[0];if(f)analyze(URL.createObjectURL(f));});
$('sampleBtn').addEventListener('click',()=>analyze('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#fff"/><text x="55" y="90" font-family="Arial" font-size="22" fill="#555">SCIENCE WORKSHEET</text><path d="M55 135h460M55 175h360M55 215h410M55 255h300" stroke="#aab6b0" stroke-width="5"/><path d="M55 340h460M55 390h460M55 440h460" stroke="#d5ddd8" stroke-width="4"/></svg>`)));
document.querySelectorAll('input[type=range]').forEach(input=>input.addEventListener('input',e=>{e.target.nextElementSibling.value=e.target.value;if(hasScan)recommend(+$('blankStat').textContent.replace('%',''));}));
$('printBtn').addEventListener('click',()=>window.print()); $('dropzone').addEventListener('dragover',e=>{e.preventDefault();$('dropzone').style.background='#f0fbf3';}); $('dropzone').addEventListener('dragleave',()=>$('dropzone').style.background=''); $('dropzone').addEventListener('drop',e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f?.type.startsWith('image/'))analyze(URL.createObjectURL(f));});
