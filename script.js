let noCount=0;
let yesScale=1;
const noBtn=document.getElementById("noBtn");
const yesBtn=document.getElementById("yesBtn");
const tease=document.getElementById("tease");

function go(n){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 document.getElementById("bar").style.width=(n*25)+"%";
}

function escapeNo(e){
 if(e) e.preventDefault();
 noCount++;
 yesScale += .12;
 yesBtn.style.transform=`scale(${yesScale})`;
 yesBtn.style.zIndex="5";

 const pad=18;
 const w=noBtn.offsetWidth, h=noBtn.offsetHeight;
 const maxX=Math.max(pad,window.innerWidth-w-pad);
 const maxY=Math.max(pad,window.innerHeight-h-pad);
 const x=pad+Math.random()*(maxX-pad);
 const y=pad+Math.random()*(maxY-pad);

 noBtn.style.position="fixed";
 noBtn.style.left=x+"px";
 noBtn.style.top=y+"px";

 const messages=[
  "Are you sure? 👀",
  "Nice try 😂❤️",
  "The YES button is getting bigger!",
  "You can't catch the NO button 😭",
  "Okay okay… just say YES 🥹❤️"
 ];
 tease.textContent=messages[Math.min(noCount-1,messages.length-1)];
}

["pointerenter","pointerdown","touchstart"].forEach(evt=>{
 noBtn.addEventListener(evt,escapeNo,{passive:false});
});

async function saveResponse(choice){
  try{
    const { error } = await supabaseClient
      .from("date_responses")
      .insert({ response: choice });

    if(error) throw error;
    return true;
  }catch(error){
    console.error("Supabase save error:", error);
    return false;
  }
}

async function yes(){
  const status = document.getElementById("status");
  status.textContent = "Saving your answer… ❤️";

  const saved = await saveResponse("YES");

  go(4);
  status.textContent = saved
    ? "Your answer has been saved. ❤️"
    : "I have the answer, but couldn't save it right now.";

  document.querySelector(".card").animate(
    [{transform:"scale(.96)"},{transform:"scale(1.03)"},{transform:"scale(1)"}],
    {duration:650,easing:"ease-out"}
  );
}
