(() => {
    const snowContainer = document.getElementById("snow-container");

    const snowPatterns = ["❄", "❅", "❆", "✦", "✧", "·"];
    for (let i = 0; i < 80; i ++){
        const snow = document.createElement("div");
        snow.className = "snow";
        snow.textContent = snowPatterns[Math.floor(Math.random() * snowPatterns.length)];

        snow.style.left = Math.random() * 100 + "vw";
        snow.style.fontSize = Math.random() * 20 + 8 + "px";
        const duration = Math.random() * 8 + 6;
        snow.style.animationDuration = duration + "s";
        snow.style.animationDelay = Math.random() * 20 + 8 + "px";
        snow.style.fontSize = -(Math.random() * duration) + "s";
        snow.style.setProperty("--sway", Math.random() * 200 - 100 + "px");
        snow.style.setProperty("--rotation", Math.random() * 1080 - 540 + "deg");
        snow.style.opacity =Math.random() * 0.7 + 0.3;

        snowContainer.appendChild(snow);
    }
})();

let Click_times = []

function AddCPS(){
    const now = performance.now();
    Click_times.push(now);
}

function update_CPS(){
    const CPS_label = document.getElementById("CPS_check_totalcps");
    const dpgkCutscene1 = document.getElementById("CPS_check_DPGKCutscene1");
    const dpgkCutscene2 = document.getElementById("CPS_check_DPGKCutscene2")
    const button = document.getElementById("CPS_check_button");
    const button2 = document.getElementById("CPS_check_hotkeychanger");
    const snowContainer = document.getElementById("snow-container");

    now = performance.now();

    while (Click_times.length > 0 && now - Click_times[0] > 1000){
        Click_times.shift();
    }

    const  cps = (Click_times.length);
    CPS_label.textContent = `CPS: ${cps}`;
    
    if (cps >= 5){
        dpgkCutscene1.hidden = false;
        button2.style.animation = "rainbow_outline 0.5s linear infinite";
        button.style.animation = "border_size 0.5s linear infinite";
    }else if (cps <= 5){
        dpgkCutscene1.hidden = true;
        button.style.animation = "none";
        button2.style.animation = "none";
    }
    if(cps >= 15){
        if (dpgkCutscene2.hidden === true){
            dpgkCutscene2.hidden = false;
            dpgkCutscene2.currentTime = 0;
        }
        button.style.animation = "none";
        button2.style.animation = "none";
        dpgkCutscene1.hidden = true;

        snowContainer.hidden = true;
    }else if(cps <= 15){
        dpgkCutscene2.hidden = true;
        snowContainer.hidden = false;
    }
}

setInterval(update_CPS, 50);

const CPSCheckButton = document.getElementById("CPS_check_button");
let CPS_Check_hotkey = "left_click";
let changing = false;


CPSCheckButton.addEventListener("click", (event)=> {
    if (changing){
        return;
    }
    if(CPS_Check_hotkey === "left_click"){
        AddCPS();
    }
});
CPSCheckButton.addEventListener("contextmenu", (event)=> {
        event.preventDefault();
        if (changing){
            return;
        }
        if (CPS_Check_hotkey === "right_click"){
            AddCPS();
        }
});
document.addEventListener("keydown", (event)=> {
    if(/^[a-zA-Z0-9]$/.test(CPS_Check_hotkey)){
        if (event.key == CPS_Check_hotkey.toLowerCase()){
            AddCPS();
        }
    }
});

function changehotkey(){
    if (changing){
        return;
    }
    changing = true;
    const key_display = document.getElementById("CPS_check_hotkey_display");
    const keyhandler = (event) => {
        event.preventDefault();
        CPS_Check_hotkey = event.key;
        changing = false;
        key_display.textContent = `Keyboard Press: ${CPS_Check_hotkey.toUpperCase()}`;
        removeListeners();
    };
    const clickhandler = (event) => {
        CPS_Check_hotkey = "left_click";
        key_display.textContent = "Mouse Click: Left";
        changing = false;
        removeListeners();
    };
    const contexthandler = (event) => {
        event.preventDefault();
        CPS_Check_hotkey = "right_click";
        key_display.textContent = "Mouse Click: Right";
        changing = false
        removeListeners();
    };

    function removeListeners(){
        document.removeEventListener("keydown", keyhandler);
        document.removeEventListener("click", clickhandler);
        document.removeEventListener("contextmenu", contexthandler);
    }

    document.addEventListener("keydown", keyhandler);
    document.addEventListener("click", clickhandler);
    document.addEventListener("contextmenu", contexthandler);
}