document.getElementById('openBtn').addEventListener('click', openNav);
document.getElementById('closeBtn').addEventListener('click', closeNav);

function openNav() {
  document.getElementById("mySidebar").style.width = "170px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}