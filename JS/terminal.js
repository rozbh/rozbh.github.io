let userInput, terminalOutput;
let projAsk = false;
let lastCommands = [];

console.log("Welcome to my website!");

const COMMANDS = {
  rd: "Whoa!!! You found the secret command!!! To get access to the beta for my apps, go <a href = 'https://blackholegames.gq/beta' target = '_blank' style = 'color:#000;'> here </a> <br>The beta code is A3T4M",
  n: "OK",
  no: "OK",
  about:
    "hello I'm Rozbeh AKA Ruzi BackEnd(js) Developer & DevOps(soon!) <a href ='https://github.com/rozi98' target='_blank' style='color:#000;'> Github",
  ls:
    "usr&nbsp;&nbsp;&nbsp;&nbsp;home&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;&nbsp;&nbsp;&nbsp;root",
  cd: "changed directory to root..",
  "cd ..": "cd: no such file or directory",
  "cd var": "var aliased to ../",
  "cd root": "access denied",
  "cd usr": "no users found",

  "cd home": "home was aliased to .",
  sudo: "user not in the sudoers file.  This incident will be reported.",
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">contact</span>, <span class="code">projects</span>, <span class="code">github</span><br>System commands: <span class="code">clear</span>, <span class="code">history</span>, <span class="code">cd</span>, <span class="code">ls</span><br>Tip: Use Up / Down arrow to go through recent commands',
  contact:
    "Email <a class='link' href='mailto:me@ruzi.dev'>Mail</a><br>Telegram: <a href='https://t.me/rozbh' class='link'>@rozbh</a><br>Twitter: <a href='https://twitter.com/ruzbw' class='link'>@ruzbw</a><br>Phone1: <a href='tel:+9893704106207' class='link'>+989370416207</a><br>Phone2: <a href='tel:+989981056596' class='link'>+989981056596</a><br>",
};

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let output;
  if (input.length === 0) {
    return;
  }
  if (input.indexOf("sudo") >= 0) {
    input = "sudo";
  }

  if (input == "projects") {
    open("./resume.pdf");
  } else if (input === "clear" || input === "cls") {
    clearScreen();
  } else if (input === "history") {
    showHist();
  } else if (input === "github") {
    open("https://github.com/rozi98");
  } else {
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="terminal-line">command not found: ${input}</div>`;
    } else {
      output += COMMANDS[input];
    }

    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
};

const key = (e) => {
  const input = userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
