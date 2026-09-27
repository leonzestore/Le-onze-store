const WHATSAPP="237659849954";
const products=[
{id:1,name:"Maillot Real — Blanc",cat:"Maillots",price:10000,c:"#f5f5f5",n:"11",tag:"NOUVEAU"},
{id:2,name:"Maillot Barça — Domicile",cat:"Maillots",price:10000,c:"#183a82",n:"10",tag:"POPULAIRE"},
{id:3,name:"Maillot PSG — Bleu",cat:"Maillots",price:10000,c:"#152d58",n:"11",tag:"POPULAIRE"},
{id:4,name:"Maillot Liverpool — Rouge",cat:"Maillots",price:9500,c:"#b51f2c",n:"8",tag:"NOUVEAU"},
{id:5,name:"Maillot Cameroun — Vert",cat:"Maillots",price:10000,c:"#167548",n:"10",tag:"CAMEROUN"},
{id:6,name:"Survêtement Le Onze",cat:"Survêtements",price:15000,c:"#191919",n:"11",tag:"SIGNATURE"},
{id:7,name:"Survêtement Football",cat:"Survêtements",price:14000,c:"#303030",n:"11",tag:"NOUVEAU"},
{id:8,name:"Ensemble Football Enfant",cat:"Enfants",price:7500,c:"#7a2020",n:"7",tag:"ENFANT"}
];
let cart=JSON.parse(localStorage.getItem("leOnzeCart")||"[]");
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
const wa=t=>"https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t);

function render(filter="Tous"){
 const grid=document.getElementById("productGrid");
 const list=filter==="Tous"?products:products.filter(p=>p.cat===filter);
 grid.innerHTML=list.map(p=>`<article class="product"><div class="product-img"><span class="badge">${p.tag}</span><div class="shirt" style="--c:${p.c}">${p.n}</div></div><div class="product-body"><small>${p.cat}</small><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="add(${p.id})">Ajouter au panier</button></div></article>`).join("");
}
function add(id){
 const p=products.find(x=>x.id===id), e=cart.find(x=>x.id===id);
 e?e.qty++:cart.push({...p,qty:1});
 save();openCart();
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();}
function save(){localStorage.setItem("leOnzeCart",JSON.stringify(cart));renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("cartCount").textContent=count;
 document.getElementById("cartTotal").textContent=money(total);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div><strong>${x.name}</strong><br><small>${x.qty} × ${money(x.price)}</small></div><button onclick="removeItem(${x.id})">Supprimer</button></div>`).join(""):"<p class='muted'>Votre panier est vide.</p>";
 const msg=cart.length?"Bonjour Le Onze Store 👋 Je souhaite commander :\n"+cart.map(x=>`- ${x.name} x${x.qty} : ${money(x.price*x.qty)}`).join("\n")+`\nTotal estimé : ${money(total)}\n\nNom :\nVille/quartier :\nTaille(s) :\nPersonnalisation :`:"Bonjour Le Onze Store 👋 Je souhaite connaître vos produits disponibles.";
 document.getElementById("checkout").href=wa(msg);
}
function openCart(){document.getElementById("drawer").classList.add("open");document.getElementById("drawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("drawer").classList.remove("open");document.getElementById("drawer").setAttribute("aria-hidden","true")}
document.getElementById("cartOpen").onclick=openCart;
document.getElementById("drawerBg").onclick=closeCart;
document.getElementById("drawerClose").onclick=closeCart;
document.getElementById("hamb").onclick=()=>{const n=document.getElementById("navlinks");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.top="70px";n.style.left="0";n.style.right="0";n.style.padding="20px";n.style.background="#fff";n.style.flexDirection="column"};
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
document.querySelectorAll("[data-jump-filter]").forEach(a=>a.onclick=()=>{setTimeout(()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===a.dataset.jumpFilter));render(a.dataset.jumpFilter)},50)});
const generic="Bonjour Le Onze Store 👋 Je souhaite commander / obtenir des informations sur vos produits.";
document.getElementById("heroWa").href=wa(generic);
document.getElementById("contactWa").href=wa(generic);
document.getElementById("footerWa").href=wa(generic);
document.getElementById("customWa").href=wa("Bonjour Le Onze Store 👋 Je souhaite personnaliser un maillot.\nModèle :\nNom :\nNuméro :\nTaille :");
render();renderCart();
