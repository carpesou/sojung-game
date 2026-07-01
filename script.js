const screens = document.querySelectorAll(".screen");
const progress = document.getElementById("progress");
const tapButton = document.getElementById("tapButton");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const msg = document.getElementById("message");

let load = 0;
let tapCount = 0;
let noCount = 0;

function showScreen(id){
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const loading = setInterval(()=>{
  load += 5;
  progress.style.width = load + "%";

  if(load >= 100){
    clearInterval(loading);
    showScreen("start");
  }
},80);

tapButton.addEventListener("click",()=>{
  tapCount++;
  tapButton.innerText = tapCount + " / 5";

  if(tapCount >= 5){
    tapButton.innerText = "성공 😊";
    setTimeout(()=>{
      showScreen("scene3");
    },700);
  }
});

function moveNoButton(){
  const x = Math.random() * (window.innerWidth - no.offsetWidth);
  const y = Math.random() * (window.innerHeight - no.offsetHeight);

  no.style.left = x + "px";
  no.style.top = y + "px";

  noCount++;

  if(noCount === 3){
    msg.innerHTML = "그렇게까지 누르려고? 흥";
  }

  if(noCount === 6){
    msg.innerHTML = "🌿 한 번만 더 생각해봐.";
  }

  if(noCount === 9){
    msg.innerHTML = "🥺 힝..";
  }

  if(noCount >= 12){
    no.style.display = "none";
    showScreen("ending");
  }
}

no.addEventListener("mouseenter", moveNoButton);
no.addEventListener("touchstart", e=>{
  e.preventDefault();
  moveNoButton();
});

yes.addEventListener("click",()=>{
  document.body.innerHTML = `
  <div style="
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    padding:20px;
    background:linear-gradient(135deg,#EAF8E6,#D6F5C8);
    font-family:Arial,sans-serif;
  ">
    <div>
      <h1 style="color:#4F8A3F;">🌿 고마워</h1>
      <p style="font-size:22px;color:#555;line-height:1.8;margin-top:20px;">
        이번에는<br>
        말보다 행동으로 보여줄게.
      </p>
      <p style="font-size:18px;color:#666;line-height:1.8;margin-top:15px;">
        천천히,<br>
        웃으면서 다시 시작해볼 수 있을까
      </p>
      <div style="font-size:50px;margin-top:25px;">🌿😊</div>
    </div>
  </div>
  `;
});