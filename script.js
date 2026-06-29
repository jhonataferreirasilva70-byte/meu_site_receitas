const receitas = {
    feijoada: {
        ingredientes: [
            "Feijão preto",
            "Carne seca",
            "Linguiça"
        ],
        preparo: [
            "Deixe o feijão de molho",
            "Cozinhe as carnes separadamente",
            "Misture tudo e cozinhe até engrossar"
        ],
        link: "https://www.youtube.com/results?search_query=feijoada+como+fazer"
    },

    moqueca: {
        ingredientes: [
            "Peixe",
            "Dendê",
            "Leite de coco"
        ],
        preparo: [
            "Tempere o peixe",
            "Cozinhe com leite de coco",
            "Finalize com azeite de dendê"
        ],
        link: "https://www.youtube.com/results?search_query=moqueca+baiana+como+fazer"
    },

    pao: {
        ingredientes: [
            "Polvilho",
            "Queijo",
            "Ovos"
        ],
        preparo: [
            "Misture tudo",
            "Modele as bolinhas",
            "Asse até dourar"
        ],
        link: "https://www.youtube.com/results?search_query=pao+de+queijo+como+fazer"
    }
};

function mostrarReceita(id){

    const box = document.getElementById(id);
    const r = receitas[id];

    if(!r){
        console.log("Receita não encontrada:", id);
        return;
    }

    // abre e fecha
    if(box.style.display === "block"){
        box.style.display = "none";
        box.innerHTML = "";
        return;
    }

    box.innerHTML = `
        <h4>Ingredientes</h4>
        <ul>
            ${r.ingredientes.map(i => `<li>${i}</li>`).join("")}
        </ul>

        <h4>Modo de preparo</h4>
        <ol>
            ${r.preparo.map(p => `<li>${p}</li>`).join("")}
        </ol>

        <a class="link-video" href="${r.link}" target="_blank">
            ▶ Ver vídeo no YouTube
        </a>
    `;

    box.style.display = "block";
}

function criarConta() {

    const email = document.querySelectorAll("input")[0].value;
    const senha = document.querySelectorAll("input")[1].value;

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("Conta criada com sucesso!");
}

function entrar() {

    const email = document.querySelectorAll("input")[0].value;
    const senha = document.querySelectorAll("input")[1].value;

    const emailSalvo = localStorage.getItem("email");
    const senhaSalva = localStorage.getItem("senha");

    if (email === emailSalvo && senha === senhaSalva) {

        alert("Login realizado com sucesso!");

        // 👉 AQUI você manda para o site principal
        window.location.href = "index.html";

    } else {
        alert("Email ou senha incorretos!");
    }
}
  function recuperarSenha() {

    const email = document.getElementById("email").value;

    const emailSalvo = localStorage.getItem("email");

    if(email === emailSalvo){

        document.getElementById("areaNovaSenha").style.display = "block";

    }else{

        alert("E-mail não encontrado!");

    }
}
function salvarNovaSenha() {

    const novaSenha =
        document.getElementById("novaSenha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    if(novaSenha === "" || confirmarSenha === ""){

        alert("Preencha todos os campos!");
        return;
    }

    if(novaSenha !== confirmarSenha){

        alert("As senhas não coincidem!");
        return;
    }

    localStorage.setItem("senha", novaSenha);

    alert("Senha alterada com sucesso!");

    window.location.href = "login.html";
}

function favoritar(receita){

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if(!favoritos.includes(receita)){

        favoritos.push(receita);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        alert("Receita adicionada aos favoritos ❤️");

    }else{

        alert("Essa receita já está nos favoritos!");

    }
}

document.addEventListener("DOMContentLoaded", () => {

    const emailLogado = localStorage.getItem("email");

    const textoEmailUsuario = document.getElementById("emailUsuario");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const fotoGrande = document.getElementById("fotoGrande");

    const fotoPadrao = "IMAGEM/perfil-padrao.png";

    if (textoEmailUsuario && emailLogado) {
        textoEmailUsuario.textContent = emailLogado;
    }

    const fotoSalva = localStorage.getItem("fotoPerfil_" + emailLogado);

    if (fotoSalva) {
        if (fotoPerfil) fotoPerfil.src = fotoSalva;
        if (fotoGrande) fotoGrande.src = fotoSalva;
    } else {
        if (fotoPerfil) fotoPerfil.src = fotoPadrao;
        if (fotoGrande) fotoGrande.src = fotoPadrao;
    }
});

function abrirPerfil(){

    const painel =
    document.getElementById("painelPerfil");

    painel.classList.toggle("ativo");
}

function fecharPerfil(){

    document.getElementById("perfilModal").style.display = "none";
}

function salvarFoto(){

    const input1 =
    document.getElementById("uploadFoto");

    const input2 =
    document.getElementById("uploadFotoPainel");

    let arquivo = null;

    if(input1 && input1.files.length > 0){
        arquivo = input1.files[0];
    }

    if(input2 && input2.files.length > 0){
        arquivo = input2.files[0];
    }

    if(!arquivo){
        alert("Escolha uma imagem!");
        return;
    }

    if(!arquivo){

        alert("Escolha uma imagem!");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(e){

        const foto = e.target.result;
    
        const emailLogado = localStorage.getItem("email");
    
        localStorage.setItem("fotoPerfil_" + emailLogado, foto);
    
        document.getElementById("fotoPerfil").src = foto;
    
        const fotoGrande = document.getElementById("fotoGrande");
    
        if(fotoGrande){
            fotoGrande.src = foto;
        }
    
        alert("Foto salva com sucesso!");
    };

    leitor.readAsDataURL(arquivo);
}



    function abrirPerfil(){

        const painel =
        document.getElementById("painelPerfil");
    
        painel.classList.toggle("ativo");
    }

    document.addEventListener("DOMContentLoaded", () => {

        const btnPesquisa = document.getElementById("btnPesquisa");
        const barraPesquisa = document.getElementById("barraPesquisa");
    
        if (btnPesquisa && barraPesquisa) {
            btnPesquisa.addEventListener("click", () => {
                barraPesquisa.classList.toggle("ativa");
            });
        }
    
    });
function editarPerfil(){
    alert("Editar perfil");
}

function logout(){

    localStorage.removeItem("email");
    localStorage.removeItem("senha");

    window.location.href = "login.html";

    document.getElementById("emailUsuario").textContent =
    localStorage.getItem("email");
}
function mostrarSenha(){

    const campoSenha =
    document.getElementById("senhaUsuario");

    const senha =
    localStorage.getItem("senha");

    if(campoSenha.textContent === "••••••••"){

        campoSenha.textContent = senha;

    }else{

        campoSenha.textContent = "••••••••";

    }
}

// ANIMAÇÃO AO ROLAR A PÁGINA

const cards = document.querySelectorAll(".card");

function revelarCards(){

    cards.forEach(card => {

        const topoCard =
        card.getBoundingClientRect().top;

        const alturaTela =
        window.innerHeight;

        if(topoCard < alturaTela - 100){

            card.classList.add("aparecer");
        }

    });

}

window.addEventListener("scroll", revelarCards);

window.addEventListener("load", revelarCards);

// =========================
// MODO CLARO / ESCURO
// =========================

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark");
}

const btnTema = document.getElementById("toggleTema");

function atualizarIconeTema() {

    if (!btnTema) return;

    if (document.body.classList.contains("dark")) {
        btnTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        btnTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

atualizarIconeTema();

if (btnTema) {

    btnTema.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("tema", "dark");
        } else {
            localStorage.setItem("tema", "light");
        }

        atualizarIconeTema();
    });
}

function favoritar(botao){

    botao.classList.toggle("ativo");

    const icone = botao.querySelector("i");

    if(botao.classList.contains("ativo")){

        icone.classList.remove("fa-regular");
        icone.classList.add("fa-solid");

    }else{

        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");

    }
}

function filtrarReceitas(regiao, botao){

    const btnFavoritos = document.getElementById("btnFavoritos");

if (btnFavoritos) {
    btnFavoritos.classList.remove("ativo");
}

    const cards = document.querySelectorAll(".card");
    const botoes = document.querySelectorAll(".filtros-regiao button");

    botoes.forEach(function(botaoFiltro){
        botaoFiltro.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    cards.forEach(function(card){

        if(regiao === "todas" || card.dataset.regiao === regiao){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });
}

const todasReceitas = {

    feijoada: {
        nome: "Feijoada Completa",
        regiao: "SUDESTE",
        imagem: "IMAGEM/feijoada.png",
        descricao:  "A feijoada é uma receita muito famosa no Brasil. Ela ficou conhecida principalmente no Rio de Janeiro e hoje é servida em várias regiões do país, geralmente acompanhada de arroz, couve e farofa.",
        ingredientes: [
            "500g de feijão preto",
            "300g de carne seca",
            "300g de costelinha suína",
            "200g de paio",
            "200g de linguiça calabresa",
            "1 cebola grande",
            "4 dentes de alho",
            "2 folhas de louro",
            "Sal a gosto"
        ],
        preparo: [
            "Lave o feijão e deixe de molho por 8 horas.",
            "Cozinhe a carne seca e a costelinha separadamente.",
            "Refogue a cebola e o alho.",
            "Adicione o feijão, as carnes e os temperos.",
            "Cozinhe até o caldo engrossar.",
            "Sirva com arroz, farofa e couve."
        ],
        video: "https://www.youtube.com/results?search_query=feijoada+completa"
    },

    moqueca: {
        nome: "Moqueca Baiana",
        regiao: "NORDESTE",
        imagem: "IMAGEM/moqueca baiana.png",
        descricao: "Peixe cozido com leite de coco, azeite de dendê e temperos marcantes.",
        ingredientes: [
            "1kg de peixe em postas",
            "2 tomates",
            "1 pimentão",
            "1 cebola",
            "200ml de leite de coco",
            "Azeite de dendê",
            "Coentro",
            "Sal a gosto"
        ],
        preparo: [
            "Tempere o peixe com sal e limão.",
            "Corte tomate, cebola e pimentão.",
            "Monte camadas de peixe e legumes na panela.",
            "Adicione leite de coco e azeite de dendê.",
            "Cozinhe por cerca de 25 minutos.",
            "Finalize com coentro."
        ],
        video: "https://www.youtube.com/results?search_query=moqueca+baiana"
    },

    paoDeQueijo: {
        nome: "Pão de Queijo",
        regiao: "SUDESTE",
        imagem: "IMAGEM/pão de queijo.png",
        descricao: "Receita mineira macia por dentro, crocante por fora e cheia de queijo.",
        ingredientes: [
            "500g de polvilho doce",
            "250ml de leite",
            "100ml de óleo",
            "2 ovos",
            "200g de queijo ralado",
            "Sal a gosto"
        ],
        preparo: [
            "Ferva o leite com o óleo e o sal.",
            "Despeje sobre o polvilho e misture.",
            "Espere amornar e adicione os ovos.",
            "Misture o queijo ralado.",
            "Modele bolinhas.",
            "Asse até dourar."
        ],
        video: "https://www.youtube.com/results?search_query=pao+de+queijo+mineiro"
    },

    acaraje: {
    nome: "Acarajé",
    regiao: "NORDESTE",
    imagem: "IMAGEM/acaraje.png",
    descricao:"O acarajé é uma comida tradicional da Bahia e possui forte influência africana. É muito vendido nas ruas por baianas do acarajé e costuma ser recheado com vatapá, camarão e salada.",
    ingredientes: [
        "Feijão-fradinho",
        "Cebola",
        "Sal",
        "Azeite de dendê"
    ],
    preparo: [
        "Deixe o feijão de molho.",
        "Bata o feijão com cebola.",
        "Modele os bolinhos.",
        "Frite no azeite de dendê."
    ],
    video: "https://www.youtube.com/results?search_query=acaraje+receita"
},

tacaca: {
    nome: "Tacacá",
    regiao: "NORTE",
    imagem: "IMAGEM/tacaca.png",
    descricao: "O tacacá é uma comida tradicional da Amazônia, muito popular no Pará e no Amazonas. É servido quente em uma cuia e tem sabor marcante por causa do tucupi, do jambu e do camarão seco.",
    ingredientes: [
        "1 litro de tucupi",
        "2 dentes de alho",
        "1 cebola picada",
        "2 maços de jambu",
        "200g de camarão seco",
        "Goma de tapioca",
        "Sal a gosto"
    ],
    preparo: [
        "Ferva o tucupi com alho, cebola e sal por cerca de 30 minutos.",
        "Lave o jambu e cozinhe em água até ficar macio.",
        "Hidrate o camarão seco em água e escorra.",
        "Prepare a goma de tapioca com água até formar um caldo mais grosso.",
        "Coloque a goma, o jambu e o camarão em uma cuia.",
        "Finalize despejando o tucupi quente por cima."
    ],
    video: "https://www.youtube.com/results?search_query=como+fazer+tacaca"
},

patoNoTucupi: {
    nome: "Pato no Tucupi",
    regiao: "NORTE",
    imagem: "IMAGEM/pato no tucupi.png",
    descricao: "O pato no tucupi é uma receita típica do Pará, muito presente em festas tradicionais como o Círio de Nazaré. O prato combina carne de pato assada com tucupi e jambu.",
    ingredientes: [
        "1 pato inteiro cortado",
        "2 litros de tucupi",
        "2 maços de jambu",
        "4 dentes de alho",
        "1 cebola",
        "Pimenta de cheiro",
        "Sal a gosto"
    ],
    preparo: [
        "Tempere o pato com alho, cebola, sal e pimenta.",
        "Asse o pato até dourar bem.",
        "Ferva o tucupi por aproximadamente 30 minutos.",
        "Cozinhe o jambu em água até ficar macio.",
        "Coloque os pedaços de pato em uma panela com o tucupi.",
        "Adicione o jambu e cozinhe por mais alguns minutos antes de servir."
    ],
    video: "https://www.youtube.com/results?search_query=pato+no+tucupi+receita"
},

manicoba: {
    nome: "Maniçoba",
    regiao: "NORTE",
    imagem: "IMAGEM/manicoba.png",
    descricao: "A maniçoba é conhecida como a feijoada paraense. Ela é feita com folhas de mandioca moídas, chamadas de maniva, e precisa cozinhar por vários dias antes de ser consumida.",
    ingredientes: [
        "2 kg de maniva moída",
        "Carne seca",
        "Linguiça calabresa",
        "Paio",
        "Costelinha suína",
        "Bacon",
        "Alho",
        "Cebola"
    ],
    preparo: [
        "Cozinhe a maniva em bastante água por vários dias, mexendo sempre.",
        "Cozinhe as carnes separadamente para retirar o excesso de sal.",
        "Corte todas as carnes em pedaços pequenos.",
        "Adicione as carnes à panela com a maniva.",
        "Refogue alho e cebola e misture ao preparo.",
        "Cozinhe até todos os ingredientes ficarem bem incorporados."
    ],
    video: "https://www.youtube.com/results?search_query=manicoba+receita"
},

pirarucuDeCasaca: {
    nome: "Pirarucu de Casaca",
    regiao: "NORTE",
    imagem: "IMAGEM/pirarucu de casaca.png",
    descricao: "O pirarucu de casaca é um prato tradicional da Amazônia feito com peixe seco, farinha, banana e castanhas. É muito comum em estados como Amazonas e Pará.",
    ingredientes: [
        "500g de pirarucu seco",
        "2 bananas-da-terra",
        "1 cebola",
        "2 tomates",
        "Farinha de mandioca",
        "Castanha-do-pará",
        "Cheiro-verde",
        "Azeite"
    ],
    preparo: [
        "Deixe o pirarucu de molho para retirar o sal.",
        "Cozinhe e desfie o peixe.",
        "Refogue cebola, tomate e cheiro-verde no azeite.",
        "Misture o peixe desfiado ao refogado.",
        "Frite as bananas-da-terra em rodelas.",
        "Monte camadas de farinha, peixe, banana e castanha."
    ],
    video: "https://www.youtube.com/results?search_query=pirarucu+de+casaca+receita"
},

acaiNaTigela: {
    nome: "Açaí na Tigela",
    regiao: "NORTE",
    imagem: "IMAGEM/acai na tigela.png",
    descricao: "No Norte do Brasil, o açaí é consumido de forma mais natural e costuma acompanhar farinha de mandioca, tapioca ou peixe. É um alimento muito importante na cultura amazônica.",
    ingredientes: [
        "Polpa de açaí puro",
        "Banana",
        "Farinha de mandioca",
        "Tapioca",
        "Mel opcional"
    ],
    preparo: [
        "Coloque a polpa de açaí em uma tigela.",
        "Bata o açaí com um pouco de água gelada se necessário.",
        "Corte a banana em rodelas.",
        "Adicione banana, farinha de mandioca ou tapioca.",
        "Misture bem antes de servir."
    ],
    video: "https://www.youtube.com/results?search_query=acai+na+tigela+receita"
},

caldeiradaDePeixe: {
    nome: "Caldeirada de Peixe",
    regiao: "NORTE",
    imagem: "IMAGEM/caldeirada de peixe.png",
    descricao: "A caldeirada de peixe é muito comum nas regiões ribeirinhas da Amazônia. É preparada com peixe fresco, legumes e temperos, formando um caldo saboroso.",
    ingredientes: [
        "1 kg de peixe em postas",
        "2 tomates",
        "1 pimentão",
        "1 cebola",
        "Batatas",
        "Cheiro-verde",
        "Leite de coco",
        "Sal a gosto"
    ],
    preparo: [
        "Tempere o peixe com sal e limão.",
        "Corte tomate, cebola, pimentão e batata.",
        "Coloque os legumes no fundo de uma panela.",
        "Adicione o peixe por cima.",
        "Acrescente água e leite de coco.",
        "Cozinhe até o peixe e as batatas ficarem macios."
    ],
    video: "https://www.youtube.com/results?search_query=caldeirada+de+peixe+receita"
},

damorida: {
    nome: "Damorida",
    regiao: "NORTE",
    imagem: "IMAGEM/damorida.png",
    descricao: "A damorida é uma receita indígena tradicional de Roraima. É um caldo forte preparado com peixe ou carne e bastante pimenta, sendo muito importante para a culinária local.",
    ingredientes: [
        "500g de peixe ou carne",
        "Pimentas variadas",
        "1 cebola",
        "2 dentes de alho",
        "Cheiro-verde",
        "Água",
        "Sal a gosto"
    ],
    preparo: [
        "Corte o peixe ou a carne em pedaços.",
        "Refogue alho e cebola em uma panela.",
        "Adicione o peixe ou a carne.",
        "Acrescente água suficiente para formar um caldo.",
        "Coloque as pimentas e o cheiro-verde.",
        "Cozinhe até a carne ou o peixe ficar macio."
    ],
    video: "https://www.youtube.com/results?search_query=damorida+receita"
},

arrozDeJambu: {
    nome: "Arroz de Jambu",
    regiao: "NORTE",
    imagem: "IMAGEM/arroz de jambu.png",
    descricao: "O arroz de jambu é uma receita amazônica que usa a folha de jambu, conhecida pela sensação de formigamento na boca. É um acompanhamento comum em pratos paraenses.",
    ingredientes: [
        "2 xícaras de arroz",
        "1 maço de jambu",
        "1 cebola",
        "2 dentes de alho",
        "Óleo",
        "Sal a gosto",
        "Água"
    ],
    preparo: [
        "Lave o jambu e cozinhe rapidamente em água.",
        "Refogue alho e cebola no óleo.",
        "Adicione o arroz e misture bem.",
        "Acrescente água e sal.",
        "Quando o arroz estiver quase pronto, adicione o jambu.",
        "Cozinhe até secar e sirva quente."
    ],
    video: "https://www.youtube.com/results?search_query=arroz+de+jambu+receita"
},

vatapaParaense: {
    nome: "Vatapá Paraense",
    regiao: "NORTE",
    imagem: "IMAGEM/vatapa paraense.png",
    descricao: "O vatapá paraense é diferente do baiano e costuma levar camarão, pão, leite de coco e tucupi. É muito servido como acompanhamento de pratos típicos do Pará.",
    ingredientes: [
        "300g de camarão seco",
        "Pães amanhecidos",
        "Leite de coco",
        "Tucupi",
        "Cebola",
        "Alho",
        "Cheiro-verde",
        "Azeite de dendê"
    ],
    preparo: [
        "Deixe os pães de molho no leite de coco.",
        "Bata os pães até formar uma mistura cremosa.",
        "Refogue alho, cebola e camarão seco.",
        "Adicione a mistura de pão ao refogado.",
        "Acrescente tucupi e azeite de dendê.",
        "Mexa até engrossar e finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=vatapa+paraense+receita"
},

boloDeMacaxeira: {
    nome: "Bolo de Macaxeira",
    regiao: "NORTE",
    imagem: "IMAGEM/bolo de macaxeira.png",
    descricao: "O bolo de macaxeira é uma sobremesa muito popular no Norte e Nordeste do Brasil. Feito com mandioca ralada, tem textura úmida e sabor marcante de coco.",
    ingredientes: [
        "1 kg de macaxeira ralada",
        "2 xícaras de açúcar",
        "200 ml de leite de coco",
        "3 ovos",
        "Manteiga",
        "Coco ralado",
        "Uma pitada de sal"
    ],
    preparo: [
        "Descasque e rale a macaxeira.",
        "Misture a macaxeira com açúcar, ovos e manteiga.",
        "Adicione leite de coco e coco ralado.",
        "Misture até ficar uniforme.",
        "Coloque em uma forma untada.",
        "Asse até dourar e ficar firme."
    ],
    video: "https://www.youtube.com/results?search_query=bolo+de+macaxeira+receita"
},
     churrascoGaucho: {
    nome: "Churrasco Gaúcho",
    regiao: "SUL",
    imagem: "IMAGEM/churrasco gaucho.png",
    descricao: "O churrasco gaúcho é uma tradição muito forte no Rio Grande do Sul. Normalmente é preparado na brasa com carnes temperadas apenas com sal grosso.",
    ingredientes: [
        "1 kg de picanha",
        "1 kg de costela bovina",
        "Linguiça",
        "Sal grosso",
        "Carvão"
    ],
    preparo: [
        "Acenda o carvão e espere formar brasas.",
        "Tempere as carnes com sal grosso.",
        "Coloque as carnes em espetos ou grelha.",
        "Asse lentamente na brasa.",
        "Vire as carnes para assar por igual.",
        "Corte e sirva ainda quente."
    ],
    video: "https://www.youtube.com/results?search_query=churrasco+gaucho+receita"
},

arrozCarreteiro: {
    nome: "Arroz Carreteiro",
    regiao: "SUL",
    imagem: "IMAGEM/arroz carreteiro.png",
    descricao: "O arroz carreteiro é um prato tradicional dos tropeiros do Sul, feito com arroz e carne seca.",
    ingredientes: [
        "2 xícaras de arroz",
        "300g de carne seca",
        "1 cebola",
        "2 dentes de alho",
        "Tomate",
        "Cheiro-verde",
        "Óleo",
        "Sal"
    ],
    preparo: [
        "Deixe a carne seca de molho para retirar o excesso de sal.",
        "Cozinhe e desfie a carne.",
        "Refogue alho e cebola no óleo.",
        "Adicione a carne seca e o tomate.",
        "Coloque o arroz e misture bem.",
        "Acrescente água e cozinhe até o arroz ficar macio."
    ],
    video: "https://www.youtube.com/results?search_query=arroz+carreteiro+receita"
},

barreado: {
    nome: "Barreado",
    regiao: "SUL",
    imagem: "IMAGEM/barreado.png",
    descricao: "O barreado é um prato típico do litoral do Paraná, preparado com carne cozida lentamente por muitas horas.",
    ingredientes: [
        "1 kg de carne bovina em cubos",
        "2 cebolas",
        "3 dentes de alho",
        "Cominho",
        "Louro",
        "Cheiro-verde",
        "Farinha de mandioca",
        "Sal"
    ],
    preparo: [
        "Tempere a carne com alho, cebola e sal.",
        "Coloque a carne em uma panela com os temperos.",
        "Tampe bem a panela.",
        "Cozinhe em fogo baixo por várias horas.",
        "Mexa a carne até ela ficar bem desfiada.",
        "Sirva com farinha de mandioca e banana."
    ],
    video: "https://www.youtube.com/results?search_query=barreado+paranaense+receita"
},

entreveroDePinhao: {
    nome: "Entrevero de Pinhão",
    regiao: "SUL",
    imagem: "IMAGEM/entrevero de pinhao.png",
    descricao: "O entrevero de pinhão é uma receita típica da Serra Catarinense, feita com pinhão, carnes e legumes.",
    ingredientes: [
        "500g de pinhão cozido",
        "200g de carne bovina",
        "200g de linguiça",
        "200g de frango",
        "1 cebola",
        "1 pimentão",
        "Tomate",
        "Cheiro-verde"
    ],
    preparo: [
        "Cozinhe o pinhão e retire a casca.",
        "Corte as carnes em pedaços pequenos.",
        "Frite as carnes em uma panela grande.",
        "Adicione cebola, tomate e pimentão.",
        "Acrescente o pinhão cozido.",
        "Misture tudo e finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=entrevero+de+pinhao+receita"
},

cucaAlema: {
    nome: "Cuca Alemã",
    regiao: "SUL",
    imagem: "IMAGEM/cuca alema.png",
    descricao: "A cuca alemã é um bolo tradicional do Sul do Brasil, muito comum em regiões de colonização alemã.",
    ingredientes: [
        "3 xícaras de farinha de trigo",
        "1 xícara de açúcar",
        "2 ovos",
        "1 xícara de leite",
        "Fermento biológico",
        "Manteiga",
        "Canela",
        "Farofa doce"
    ],
    preparo: [
        "Misture farinha, açúcar, ovos e leite.",
        "Adicione o fermento e deixe a massa descansar.",
        "Coloque a massa em uma forma untada.",
        "Prepare uma farofa com açúcar, manteiga e canela.",
        "Espalhe a farofa sobre a massa.",
        "Asse até dourar."
    ],
    video: "https://www.youtube.com/results?search_query=cuca+alema+receita"
},

saguDeVinho: {
    nome: "Sagu de Vinho",
    regiao: "SUL",
    imagem: "IMAGEM/sagu de vinho.png",
    descricao: "O sagu de vinho é uma sobremesa muito tradicional no Rio Grande do Sul, geralmente servido com creme.",
    ingredientes: [
        "1 xícara de sagu",
        "2 xícaras de vinho tinto",
        "2 xícaras de água",
        "1 xícara de açúcar",
        "Canela em pau",
        "Cravo"
    ],
    preparo: [
        "Deixe o sagu de molho em água.",
        "Ferva a água com canela e cravo.",
        "Adicione o sagu e cozinhe mexendo.",
        "Acrescente o vinho e o açúcar.",
        "Cozinhe até as bolinhas ficarem transparentes.",
        "Sirva gelado com creme."
    ],
    video: "https://www.youtube.com/results?search_query=sagu+de+vinho+receita"
},

galetoAlPrimoCanto: {
    nome: "Galeto Al Primo Canto",
    regiao: "SUL",
    imagem: "IMAGEM/galeto al primo canto.png",
    descricao: "O galeto al primo canto é um prato tradicional da Serra Gaúcha, preparado com frango jovem assado na brasa.",
    ingredientes: [
        "1 galeto cortado ao meio",
        "Alho",
        "Limão",
        "Vinho branco",
        "Sal",
        "Pimenta",
        "Ervas"
    ],
    preparo: [
        "Tempere o galeto com alho, limão, vinho e ervas.",
        "Deixe marinar por algumas horas.",
        "Aqueça a churrasqueira ou forno.",
        "Coloque o galeto na grelha.",
        "Asse virando para dourar dos dois lados.",
        "Sirva com polenta e salada."
    ],
    video: "https://www.youtube.com/results?search_query=galeto+al+primo+canto+receita"
},

polentaCremosa: {
    nome: "Polenta Cremosa",
    regiao: "SUL",
    imagem: "IMAGEM/polenta cremosa.png",
    descricao: "A polenta cremosa é um acompanhamento muito comum na culinária italiana do Sul do Brasil.",
    ingredientes: [
        "1 xícara de fubá",
        "4 xícaras de água",
        "Manteiga",
        "Queijo ralado",
        "Sal"
    ],
    preparo: [
        "Ferva a água com sal.",
        "Adicione o fubá aos poucos, mexendo sempre.",
        "Cozinhe em fogo baixo até engrossar.",
        "Acrescente manteiga.",
        "Misture queijo ralado.",
        "Sirva ainda quente."
    ],
    video: "https://www.youtube.com/results?search_query=polenta+cremosa+receita"
},

pinhaoCozido: {
    nome: "Pinhão Cozido",
    regiao: "SUL",
    imagem: "IMAGEM/pinhao cozido.png",
    descricao: "O pinhão é a semente da araucária e é muito consumido no inverno nos estados do Sul do Brasil.",
    ingredientes: [
        "1 kg de pinhão",
        "Água",
        "Sal a gosto"
    ],
    preparo: [
        "Lave bem os pinhões.",
        "Coloque em uma panela de pressão.",
        "Cubra com água e adicione sal.",
        "Cozinhe por cerca de 40 minutos após pegar pressão.",
        "Espere a pressão sair.",
        "Descasque e sirva."
    ],
    video: "https://www.youtube.com/results?search_query=pinhao+cozido+receita"
},

tainhaAssada: {
    nome: "Tainha Assada",
    regiao: "SUL",
    imagem: "IMAGEM/tainha assada.png",
    descricao: "A tainha assada é muito tradicional no litoral de Santa Catarina, especialmente durante a temporada de pesca.",
    ingredientes: [
        "1 tainha inteira limpa",
        "Limão",
        "Alho",
        "Cebola",
        "Tomate",
        "Cheiro-verde",
        "Azeite",
        "Sal"
    ],
    preparo: [
        "Limpe a tainha e faça cortes leves na pele.",
        "Tempere com alho, limão e sal.",
        "Recheie com cebola, tomate e cheiro-verde.",
        "Regue com azeite.",
        "Coloque em uma assadeira.",
        "Asse até o peixe ficar dourado e macio."
    ],
    video: "https://www.youtube.com/results?search_query=tainha+assada+receita"
},
    arrozComPequi: {
    nome: "Arroz com Pequi",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/arroz com pequi.png",
    descricao: "O arroz com pequi é um dos pratos mais conhecidos de Goiás. O pequi é um fruto de cheiro e sabor bem marcantes, muito usado na culinária do Cerrado.",
    ingredientes: [
        "2 xícaras de arroz",
        "6 caroços de pequi",
        "1 cebola picada",
        "2 dentes de alho",
        "Óleo",
        "Sal a gosto",
        "Água quente"
    ],
    preparo: [
        "Refogue a cebola e o alho no óleo.",
        "Adicione os caroços de pequi e refogue com cuidado.",
        "Coloque o arroz e misture bem.",
        "Acrescente água quente e sal.",
        "Cozinhe até o arroz ficar macio.",
        "Sirva quente, sem morder o caroço do pequi."
    ],
    video: "https://www.youtube.com/results?search_query=arroz+com+pequi+receita"
},

empadaoGoiano: {
    nome: "Empadão Goiano",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/empadao goiano.png",
    descricao: "O empadão goiano é uma torta salgada recheada com frango, linguiça, queijo e outros ingredientes. É uma receita tradicional de Goiás.",
    ingredientes: [
        "Massa para torta salgada",
        "Frango desfiado",
        "Linguiça calabresa",
        "Queijo",
        "Milho",
        "Ervilha",
        "Tomate",
        "Cebola",
        "Temperos a gosto"
    ],
    preparo: [
        "Prepare o recheio refogando frango, linguiça, tomate e cebola.",
        "Adicione milho, ervilha e temperos.",
        "Forre uma forma com parte da massa.",
        "Coloque o recheio e o queijo.",
        "Cubra com o restante da massa.",
        "Asse até dourar."
    ],
    video: "https://www.youtube.com/results?search_query=empadao+goiano+receita"
},

galinhadaGoiana: {
    nome: "Galinhada Goiana",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/galinhada goiana.png",
    descricao: "A galinhada goiana mistura arroz, frango e temperos. Em muitas versões, também leva pequi, ingrediente muito presente na culinária de Goiás.",
    ingredientes: [
        "1 kg de frango em pedaços",
        "2 xícaras de arroz",
        "Pequi opcional",
        "1 cebola",
        "3 dentes de alho",
        "Açafrão",
        "Cheiro-verde",
        "Sal a gosto"
    ],
    preparo: [
        "Tempere o frango com alho, sal e açafrão.",
        "Doure o frango em uma panela grande.",
        "Adicione cebola e refogue.",
        "Coloque o arroz e misture.",
        "Acrescente água quente e pequi, se desejar.",
        "Cozinhe até o arroz e o frango ficarem macios."
    ],
    video: "https://www.youtube.com/results?search_query=galinhada+goiana+receita"
},

pamonhaGoiana: {
    nome: "Pamonha Goiana",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/pamonha goiana.png",
    descricao: "A pamonha é uma receita feita com milho verde ralado. Em Goiás, pode ser doce ou salgada e muitas vezes recebe recheio de queijo.",
    ingredientes: [
        "12 espigas de milho verde",
        "Açúcar ou sal",
        "Queijo em cubos",
        "Leite opcional",
        "Palhas de milho"
    ],
    preparo: [
        "Retire os grãos das espigas.",
        "Bata ou rale o milho até formar uma massa.",
        "Tempere com açúcar para pamonha doce ou sal para salgada.",
        "Coloque a massa nas palhas de milho.",
        "Adicione queijo no meio, se desejar.",
        "Amarre as palhas e cozinhe em água fervente."
    ],
    video: "https://www.youtube.com/results?search_query=pamonha+goiana+receita"
},

sopaParaguaia: {
    nome: "Sopa Paraguaia",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/sopa paraguaia.png",
    descricao: "Apesar do nome, a sopa paraguaia é uma espécie de bolo salgado de milho, muito comum no Mato Grosso do Sul por causa da influência paraguaia.",
    ingredientes: [
        "2 xícaras de fubá",
        "3 ovos",
        "1 cebola grande",
        "Queijo ralado",
        "Leite",
        "Óleo",
        "Fermento em pó",
        "Sal a gosto"
    ],
    preparo: [
        "Misture os ovos, o leite e o óleo.",
        "Adicione fubá, queijo, cebola e sal.",
        "Misture até formar uma massa cremosa.",
        "Acrescente o fermento.",
        "Coloque em uma forma untada.",
        "Asse até ficar dourada e firme."
    ],
    video: "https://www.youtube.com/results?search_query=sopa+paraguaia+receita"
},

mariaIsabel: {
    nome: "Maria-Isabel",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/maria isabel.png",
    descricao: "Maria-Isabel é um prato típico de Mato Grosso feito com arroz e carne seca. É muito servido acompanhado de farofa de banana.",
    ingredientes: [
        "2 xícaras de arroz",
        "300g de carne seca",
        "1 cebola",
        "2 dentes de alho",
        "Cheiro-verde",
        "Óleo",
        "Sal a gosto",
        "Água quente"
    ],
    preparo: [
        "Deixe a carne seca de molho para retirar o excesso de sal.",
        "Cozinhe e desfie a carne.",
        "Refogue cebola, alho e carne seca.",
        "Adicione o arroz e misture.",
        "Acrescente água quente.",
        "Cozinhe até o arroz ficar macio e finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=maria+isabel+receita"
},

mojicaDePintado: {
    nome: "Mojica de Pintado",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/mojica de pintado.png",
    descricao: "A mojica de pintado é um caldo de peixe tradicional do Mato Grosso. Geralmente leva mandioca, cheiro-verde e pedaços de pintado.",
    ingredientes: [
        "1 kg de pintado em pedaços",
        "500g de mandioca",
        "1 cebola",
        "2 tomates",
        "2 dentes de alho",
        "Cheiro-verde",
        "Sal a gosto",
        "Água"
    ],
    preparo: [
        "Cozinhe a mandioca até ficar macia.",
        "Refogue alho, cebola e tomate.",
        "Adicione o peixe e cozinhe por alguns minutos.",
        "Acrescente a mandioca cozida e água.",
        "Cozinhe até o peixe ficar macio.",
        "Finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=mojica+de+pintado+receita"
},

ventrechaDePacu: {
    nome: "Ventrecha de Pacu",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/ventrecha de pacu.png",
    descricao: "A ventrecha de pacu é um prato muito conhecido no Pantanal. Ela é feita com a parte mais saborosa do peixe pacu, geralmente frita ou assada.",
    ingredientes: [
        "1 kg de ventrecha de pacu",
        "Limão",
        "Alho",
        "Sal a gosto",
        "Pimenta-do-reino",
        "Farinha de trigo ou fubá",
        "Óleo para fritar"
    ],
    preparo: [
        "Tempere o peixe com limão, alho, sal e pimenta.",
        "Deixe descansar por alguns minutos.",
        "Passe o peixe na farinha ou no fubá.",
        "Aqueça o óleo em uma frigideira.",
        "Frite até dourar dos dois lados.",
        "Sirva com limão e acompanhamentos."
    ],
    video: "https://www.youtube.com/results?search_query=ventrecha+de+pacu+receita"
},

chipa: {
    nome: "Chipa",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/chipa.png",
    descricao: "A chipa é um pão de queijo em formato diferente, muito popular no Mato Grosso do Sul. Ela tem influência da culinária paraguaia.",
    ingredientes: [
        "500g de polvilho doce",
        "200g de queijo ralado",
        "2 ovos",
        "100ml de leite",
        "100ml de óleo",
        "Sal a gosto"
    ],
    preparo: [
        "Misture o polvilho e o queijo ralado.",
        "Adicione ovos, leite, óleo e sal.",
        "Misture até formar uma massa.",
        "Modele em formato de ferradura.",
        "Coloque em uma assadeira untada.",
        "Asse até dourar."
    ],
    video: "https://www.youtube.com/results?search_query=chipa+receita"
},

furrundu: {
    nome: "Furrundu",
    regiao: "CENTRO-OESTE",
    imagem: "IMAGEM/furrundu.png",
    descricao: "O furrundu é um doce tradicional de Mato Grosso feito com mamão verde ralado, rapadura e especiarias.",
    ingredientes: [
        "1 mamão verde ralado",
        "500g de rapadura",
        "Canela",
        "Cravo-da-índia",
        "Água"
    ],
    preparo: [
        "Descasque e rale o mamão verde.",
        "Coloque a rapadura em uma panela com um pouco de água.",
        "Cozinhe até a rapadura derreter.",
        "Adicione o mamão ralado.",
        "Acrescente canela e cravo.",
        "Mexa até engrossar e ficar com textura de doce."
    ],
    video: "https://www.youtube.com/results?search_query=furrundu+receita"
},
    viradoAPaulista: {
    nome: "Virado à Paulista",
    regiao: "SUDESTE",
    imagem: "IMAGEM/virado a paulista.png",
    descricao: "O virado à paulista é um prato tradicional de São Paulo, servido com arroz, feijão, couve, ovo, banana e carne.",
    ingredientes: [
        "2 xícaras de feijão cozido",
        "Farinha de mandioca",
        "Bacon",
        "Linguiça",
        "Couve",
        "Ovos",
        "Banana",
        "Arroz"
    ],
    preparo: [
        "Frite o bacon e a linguiça.",
        "Misture o feijão cozido com farinha de mandioca.",
        "Refogue a couve com alho.",
        "Frite os ovos e as bananas.",
        "Sirva tudo acompanhado de arroz."
    ],
    video: "https://www.youtube.com/results?search_query=virado+a+paulista+receita"
},

picadinho: {
    nome: "Picadinho de Carne",
    regiao: "SUDESTE",
    imagem: "IMAGEM/picadinho.png",
    descricao: "O picadinho de carne é uma receita muito popular em São Paulo e no Rio de Janeiro, normalmente servido com arroz, feijão e farofa.",
    ingredientes: [
        "500g de carne em cubos",
        "1 cebola",
        "2 dentes de alho",
        "2 tomates",
        "Molho de tomate",
        "Sal",
        "Pimenta",
        "Cheiro-verde"
    ],
    preparo: [
        "Corte a carne em cubos pequenos.",
        "Refogue alho e cebola.",
        "Adicione a carne e deixe dourar.",
        "Coloque tomate e molho de tomate.",
        "Cozinhe até a carne ficar macia.",
        "Finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=picadinho+de+carne+receita"
},

tutuDeFeijao: {
    nome: "Tutu de Feijão",
    regiao: "SUDESTE",
    imagem: "IMAGEM/tutu de feijao.png",
    descricao: "O tutu de feijão é uma receita tradicional de Minas Gerais feita com feijão cozido e farinha de mandioca.",
    ingredientes: [
        "2 xícaras de feijão cozido",
        "Farinha de mandioca",
        "Bacon",
        "Linguiça",
        "Alho",
        "Cebola",
        "Sal",
        "Cheiro-verde"
    ],
    preparo: [
        "Bata parte do feijão no liquidificador.",
        "Frite o bacon e a linguiça.",
        "Refogue alho e cebola.",
        "Adicione o feijão batido.",
        "Coloque farinha aos poucos até engrossar.",
        "Finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=tutu+de+feijao+mineiro+receita"
},

frangoComQuiabo: {
    nome: "Frango com Quiabo",
    regiao: "SUDESTE",
    imagem: "IMAGEM/frango com quiabo.png",
    descricao: "O frango com quiabo é um prato muito conhecido da culinária mineira, geralmente servido com angu.",
    ingredientes: [
        "1kg de frango em pedaços",
        "300g de quiabo",
        "1 cebola",
        "3 dentes de alho",
        "Tomate",
        "Óleo",
        "Sal",
        "Cheiro-verde"
    ],
    preparo: [
        "Tempere o frango com alho e sal.",
        "Doure o frango em uma panela.",
        "Adicione cebola, tomate e água.",
        "Cozinhe até o frango ficar macio.",
        "Corte o quiabo e refogue separadamente.",
        "Misture o quiabo ao frango e finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=frango+com+quiabo+mineiro+receita"
},

anguABaiana: {
    nome: "Angu à Baiana",
    regiao: "SUDESTE",
    imagem: "IMAGEM/angu a baiana.png",
    descricao: "O angu é um prato feito com fubá de milho, muito presente na culinária mineira e em outras partes do Sudeste.",
    ingredientes: [
        "2 xícaras de fubá",
        "1 litro de água",
        "Sal a gosto",
        "Carne moída",
        "Molho de tomate",
        "Cebola",
        "Alho",
        "Queijo ralado"
    ],
    preparo: [
        "Ferva a água com sal.",
        "Adicione o fubá aos poucos, mexendo sempre.",
        "Cozinhe até engrossar.",
        "Prepare um molho com carne moída e tomate.",
        "Coloque o angu em um prato.",
        "Cubra com o molho e queijo ralado."
    ],
    video: "https://www.youtube.com/results?search_query=angu+receita+mineira"
},

bolinhoDeBacalhau: {
    nome: "Bolinho de Bacalhau",
    regiao: "SUDESTE",
    imagem: "IMAGEM/bolinho de bacalhau.png",
    descricao: "O bolinho de bacalhau é muito popular em bares e restaurantes do Rio de Janeiro e de São Paulo.",
    ingredientes: [
        "500g de bacalhau dessalgado",
        "500g de batata",
        "1 ovo",
        "Cebola",
        "Cheiro-verde",
        "Farinha de rosca",
        "Óleo para fritar",
        "Sal"
    ],
    preparo: [
        "Cozinhe o bacalhau e desfie.",
        "Cozinhe as batatas e amasse.",
        "Misture batata, bacalhau, cebola e cheiro-verde.",
        "Adicione o ovo e misture.",
        "Modele os bolinhos.",
        "Frite até dourar."
    ],
    video: "https://www.youtube.com/results?search_query=bolinho+de+bacalhau+receita"
},

bifeACavalo: {
    nome: "Bife à Cavalo",
    regiao: "SUDESTE",
    imagem: "IMAGEM/bife a cavalo.png",
    descricao: "O bife à cavalo é um prato simples e popular, feito com bife acompanhado de ovos fritos.",
    ingredientes: [
        "2 bifes de carne",
        "2 ovos",
        "Alho",
        "Sal",
        "Pimenta",
        "Óleo",
        "Arroz para acompanhar"
    ],
    preparo: [
        "Tempere os bifes com alho, sal e pimenta.",
        "Frite os bifes até dourar.",
        "Frite os ovos separadamente.",
        "Coloque os ovos sobre os bifes.",
        "Sirva com arroz e batata."
    ],
    video: "https://www.youtube.com/results?search_query=bife+a+cavalo+receita"
},

joelho: {
    nome: "Joelho de Presunto e Queijo",
    regiao: "SUDESTE",
    imagem: "IMAGEM/joelho.png",
    descricao: "O joelho é um salgado muito conhecido em padarias do Rio de Janeiro, recheado com presunto e queijo.",
    ingredientes: [
        "Massa de pão",
        "Presunto",
        "Queijo muçarela",
        "Molho de tomate",
        "Orégano",
        "Gema de ovo"
    ],
    preparo: [
        "Abra a massa de pão.",
        "Coloque molho de tomate, presunto e queijo.",
        "Enrole a massa como um rocambole.",
        "Pincele gema de ovo por cima.",
        "Asse até dourar.",
        "Sirva ainda quente."
    ],
    video: "https://www.youtube.com/results?search_query=joelho+presunto+e+queijo+receita"
},

pudimDeLeite: {
    nome: "Pudim de Leite",
    regiao: "SUDESTE",
    imagem: "IMAGEM/pudim de leite.png",
    descricao: "O pudim de leite é uma das sobremesas mais populares do Brasil, conhecido pela calda de caramelo.",
    ingredientes: [
        "1 lata de leite condensado",
        "2 medidas de leite",
        "3 ovos",
        "1 xícara de açúcar",
        "Água"
    ],
    preparo: [
        "Derreta o açúcar até formar um caramelo.",
        "Espalhe o caramelo em uma forma.",
        "Bata leite condensado, leite e ovos.",
        "Despeje a mistura na forma.",
        "Asse em banho-maria.",
        "Espere esfriar antes de desenformar."
    ],
    video: "https://www.youtube.com/results?search_query=pudim+de+leite+receita"
},

doceDeLeite: {
    nome: "Doce de Leite",
    regiao: "SUDESTE",
    imagem: "IMAGEM/doce de leite.png",
    descricao: "O doce de leite é muito tradicional em Minas Gerais e pode ser servido puro, com queijo ou em sobremesas.",
    ingredientes: [
        "2 litros de leite",
        "4 xícaras de açúcar",
        "1 pitada de bicarbonato de sódio"
    ],
    preparo: [
        "Coloque o leite e o açúcar em uma panela grande.",
        "Misture até o açúcar dissolver.",
        "Adicione uma pequena pitada de bicarbonato.",
        "Cozinhe em fogo baixo mexendo sempre.",
        "Continue mexendo até engrossar e ficar dourado.",
        "Espere esfriar antes de guardar."
    ],
    video: "https://www.youtube.com/results?search_query=doce+de+leite+mineiro+receita"
},
     baiaoDeDois: {
    nome: "Baião de Dois",
    regiao: "NORDESTE",
    imagem: "IMAGEM/baiao de dois.png",
    descricao: "O baião de dois é um prato tradicional do Nordeste feito com arroz, feijão e ingredientes como queijo coalho e carne seca.",
    ingredientes: [
        "2 xícaras de arroz",
        "2 xícaras de feijão-de-corda cozido",
        "Carne seca",
        "Queijo coalho",
        "Cebola",
        "Alho",
        "Cheiro-verde",
        "Sal"
    ],
    preparo: [
        "Cozinhe o feijão-de-corda até ficar macio.",
        "Refogue alho, cebola e carne seca.",
        "Adicione o arroz e misture.",
        "Coloque o feijão cozido e água.",
        "Cozinhe até o arroz ficar pronto.",
        "Finalize com queijo coalho e cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=baiao+de+dois+receita"
},

carneDeSolComMacaxeira: {
    nome: "Carne de Sol com Macaxeira",
    regiao: "NORDESTE",
    imagem: "IMAGEM/carne de sol com macaxeira.png",
    descricao: "A carne de sol com macaxeira é uma combinação muito tradicional do Nordeste, servida em restaurantes e festas regionais.",
    ingredientes: [
        "500g de carne de sol",
        "1kg de macaxeira",
        "1 cebola",
        "Manteiga de garrafa",
        "Alho",
        "Cheiro-verde",
        "Sal"
    ],
    preparo: [
        "Deixe a carne de sol de molho para retirar o excesso de sal.",
        "Cozinhe a macaxeira até ficar macia.",
        "Corte a carne em pedaços.",
        "Frite a carne com manteiga de garrafa.",
        "Refogue cebola e alho.",
        "Sirva a carne acompanhada da macaxeira."
    ],
    video: "https://www.youtube.com/results?search_query=carne+de+sol+com+macaxeira+receita"
},

cuscuzNordestino: {
    nome: "Cuscuz Nordestino",
    regiao: "NORDESTE",
    imagem: "IMAGEM/cuscuz nordestino.png",
    descricao: "O cuscuz nordestino é feito com flocos de milho e preparado na cuscuzeira. Pode ser servido com manteiga, queijo, ovos ou carne seca.",
    ingredientes: [
        "2 xícaras de flocão de milho",
        "Água",
        "Sal",
        "Manteiga"
    ],
    preparo: [
        "Misture o flocão de milho com água e sal.",
        "Deixe descansar por alguns minutos.",
        "Coloque a mistura na cuscuzeira.",
        "Cozinhe no vapor por cerca de 15 minutos.",
        "Sirva com manteiga ou o acompanhamento que preferir."
    ],
    video: "https://www.youtube.com/results?search_query=cuscuz+nordestino+receita"
},

arrumadinho: {
    nome: "Arrumadinho",
    regiao: "NORDESTE",
    imagem: "IMAGEM/arrumadinho.png",
    descricao: "O arrumadinho é um prato muito popular em Pernambuco e Bahia, montado com feijão, carne, farofa, vinagrete e outros acompanhamentos.",
    ingredientes: [
        "Feijão-fradinho cozido",
        "Carne de sol",
        "Farofa",
        "Vinagrete",
        "Cebola",
        "Tomate",
        "Cheiro-verde",
        "Sal"
    ],
    preparo: [
        "Cozinhe o feijão-fradinho.",
        "Frite ou asse a carne de sol.",
        "Prepare o vinagrete com tomate e cebola.",
        "Coloque o feijão em um prato.",
        "Adicione carne, farofa e vinagrete por cima.",
        "Finalize com cheiro-verde."
    ],
    video: "https://www.youtube.com/results?search_query=arrumadinho+receita"
},

rubacao: {
    nome: "Rubacão",
    regiao: "NORDESTE",
    imagem: "IMAGEM/rubacao.png",
    descricao: "O rubacão é uma receita típica da Paraíba parecida com o baião de dois, feita com arroz, feijão-verde, carne seca e queijo coalho.",
    ingredientes: [
        "Arroz",
        "Feijão-verde",
        "Carne seca",
        "Queijo coalho",
        "Creme de leite",
        "Cebola",
        "Alho",
        "Sal"
    ],
    preparo: [
        "Cozinhe o feijão-verde.",
        "Refogue alho, cebola e carne seca.",
        "Adicione arroz e água.",
        "Misture o feijão cozido.",
        "Quando o arroz estiver pronto, coloque creme de leite.",
        "Finalize com queijo coalho."
    ],
    video: "https://www.youtube.com/results?search_query=rubacao+paraibano+receita"
},

sarapatel: {
    nome: "Sarapatel",
    regiao: "NORDESTE",
    imagem: "IMAGEM/sarapatel.png",
    descricao: "O sarapatel é uma receita tradicional nordestina preparada com carne e temperos fortes, muito comum em feiras e festas populares.",
    ingredientes: [
        "500g de carne para sarapatel",
        "1 cebola",
        "3 dentes de alho",
        "Tomate",
        "Pimentão",
        "Coentro",
        "Pimenta",
        "Sal"
    ],
    preparo: [
        "Lave bem a carne e corte em pedaços pequenos.",
        "Refogue alho e cebola.",
        "Adicione a carne e deixe dourar.",
        "Coloque tomate, pimentão e temperos.",
        "Acrescente água aos poucos.",
        "Cozinhe até ficar bem macio."
    ],
    video: "https://www.youtube.com/results?search_query=sarapatel+receita"
},

boboDeCamarao: {
    nome: "Bobó de Camarão",
    regiao: "NORDESTE",
    imagem: "IMAGEM/bobo de camarao.png",
    descricao: "O bobó de camarão é uma receita baiana cremosa feita com camarão, mandioca, leite de coco e azeite de dendê.",
    ingredientes: [
        "500g de camarão",
        "500g de mandioca",
        "Leite de coco",
        "Azeite de dendê",
        "Cebola",
        "Tomate",
        "Pimentão",
        "Coentro"
    ],
    preparo: [
        "Cozinhe a mandioca até ficar macia.",
        "Bata a mandioca com leite de coco.",
        "Refogue cebola, tomate e pimentão.",
        "Adicione os camarões e cozinhe rapidamente.",
        "Misture o creme de mandioca.",
        "Finalize com azeite de dendê e coentro."
    ],
    video: "https://www.youtube.com/results?search_query=bobo+de+camarao+receita"
},

tapiocaRecheada: {
    nome: "Tapioca Recheada",
    regiao: "NORDESTE",
    imagem: "IMAGEM/tapioca recheada.png",
    descricao: "A tapioca recheada é muito consumida no Nordeste e pode ter recheios doces ou salgados, como queijo coalho, coco ou carne seca.",
    ingredientes: [
        "Goma de tapioca",
        "Queijo coalho",
        "Coco ralado",
        "Manteiga"
    ],
    preparo: [
        "Aqueça uma frigideira antiaderente.",
        "Espalhe a goma de tapioca na frigideira.",
        "Deixe a tapioca firmar.",
        "Coloque o recheio de queijo e coco.",
        "Dobre a tapioca ao meio.",
        "Sirva quente."
    ],
    video: "https://www.youtube.com/results?search_query=tapioca+recheada+receita"
},

cartola: {
    nome: "Cartola",
    regiao: "NORDESTE",
    imagem: "IMAGEM/cartola.png",
    descricao: "A cartola é uma sobremesa tradicional de Pernambuco feita com banana frita, queijo, açúcar e canela.",
    ingredientes: [
        "4 bananas",
        "Queijo manteiga ou muçarela",
        "Açúcar",
        "Canela em pó",
        "Manteiga"
    ],
    preparo: [
        "Corte as bananas ao meio.",
        "Frite as bananas na manteiga.",
        "Coloque queijo por cima das bananas.",
        "Tampe a frigideira para o queijo derreter.",
        "Polvilhe açúcar e canela.",
        "Sirva quente."
    ],
    video: "https://www.youtube.com/results?search_query=cartola+pernambucana+receita"
},

boloDeRolo: {
    nome: "Bolo de Rolo",
    regiao: "NORDESTE",
    imagem: "IMAGEM/bolo de rolo.png",
    descricao: "O bolo de rolo é uma sobremesa tradicional de Pernambuco feita com massa fina enrolada com recheio de goiabada.",
    ingredientes: [
        "Manteiga",
        "Açúcar",
        "Ovos",
        "Farinha de trigo",
        "Goiabada",
        "Água"
    ],
    preparo: [
        "Misture manteiga, açúcar e ovos.",
        "Adicione farinha até formar uma massa leve.",
        "Espalhe uma camada fina de massa em uma assadeira.",
        "Asse rapidamente.",
        "Passe goiabada derretida sobre a massa.",
        "Enrole e repita o processo com mais camadas."
    ],
    video: "https://www.youtube.com/results?search_query=bolo+de+rolo+pernambucano+receita"
},

};

function carregarPaginaReceita() {

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("receita");

    const receita = todasReceitas[id];

    if (!receita) {
        return;
    }

    document.title = receita.nome + " | Tempero Brasileiro";

    document.getElementById("imagemReceita").src = receita.imagem;
    document.getElementById("imagemReceita").alt = receita.nome;

    document.getElementById("tituloReceita").textContent = receita.nome;

    document.getElementById("regiaoReceita").textContent =
        "🍲 " + receita.regiao;

    document.getElementById("descricaoReceita").textContent =
        receita.descricao;

    const listaIngredientes =
        document.getElementById("listaIngredientes");

    receita.ingredientes.forEach(function(ingrediente) {

        listaIngredientes.innerHTML +=
            "<li>" + ingrediente + "</li>";

    });

    const listaPreparo =
        document.getElementById("listaPreparo");

    receita.preparo.forEach(function(passo, numero) {

        listaPreparo.innerHTML += `
            <div class="passo">
                <div class="numero">${numero + 1}</div>
                <h3>Passo ${numero + 1}</h3>
                <p>${passo}</p>
            </div>
        `;

    });

    document.getElementById("videoReceita").href =
        receita.video;
}

carregarPaginaReceita();

function favoritar(botao) {
    const card = botao.closest(".card");
    const icone = botao.querySelector("i");

    // Marca ou desmarca o card como favorito
    card.classList.toggle("favoritado");

    // Muda o desenho do coração
    if (card.classList.contains("favoritado")) {
    icone.classList.remove("fa-regular");
    icone.classList.add("fa-solid");

    // Faz o botão do coração dar um pulso
    botao.classList.remove("pulsar");
    void botao.offsetWidth;
    botao.classList.add("pulsar");

    // Cria um brilho grande atrás do coração
    const posicao = botao.getBoundingClientRect();
    const brilho = document.createElement("span");

    brilho.classList.add("brillo-favorito");
    brilho.style.left = (posicao.left + posicao.width / 2) + "px";
    brilho.style.top = (posicao.top + posicao.height / 2) + "px";

    document.body.appendChild(brilho);

    setTimeout(() => {
        brilho.remove();
    }, 750);

    criarFogos(botao);
}else {
        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");

             // Faz o coração tremer quando desfavoritar
    botao.classList.remove("desfavoritar-animacao");
    void botao.offsetWidth;
    botao.classList.add("desfavoritar-animacao");

    // Cria partículas suaves descendo
    animarDesfavoritar(botao);
    }
}

function carregarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    document.querySelectorAll(".card").forEach(card => {
        const nomeReceita = card.querySelector("h3").innerText;
        const botao = card.querySelector(".favorito");
        const icone = botao.querySelector("i");

        if (favoritos.includes(nomeReceita)) {
            icone.classList.remove("fa-regular");
            icone.classList.add("fa-solid");

            botao.classList.add("favoritado");
        }
    });
}

function mostrarFavoritos() {
    const botaoFavoritos = document.getElementById("btnFavoritos");
    const cards = document.querySelectorAll(".card");

    botaoFavoritos.classList.toggle("ativo");

    // Se clicou no coração do topo: mostra SOMENTE favoritos
    if (botaoFavoritos.classList.contains("ativo")) {

        cards.forEach(card => {
            if (card.classList.contains("favoritado")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

    } else {
        // Se clicar novamente: mostra todas as receitas
        cards.forEach(card => {
            card.style.display = "block";
        });
    }
}

function criarFogos(botao) {
    const posicao = botao.getBoundingClientRect();

    const centroX = posicao.left + posicao.width / 2;
    const centroY = posicao.top + posicao.height / 2;

    // Onda brilhante saindo do coração
    const onda = document.createElement("span");
    onda.classList.add("onda-favorito");
    onda.style.left = centroX + "px";
    onda.style.top = centroY + "px";
    document.body.appendChild(onda);

    setTimeout(() => {
        onda.remove();
    }, 700);

    // Partículas da explosão
    for (let i = 0; i < 34; i++) {
        const fogo = document.createElement("span");

        const tipos = ["fogo-coracao", "fogo-dourado", "fogo-laranja"];
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];

        fogo.classList.add("fogo", tipo);

        const angulo = (Math.PI * 2 * i) / 34;
        const distancia = 45 + Math.random() * 80;

        const x = Math.cos(angulo) * distancia;
        const y = Math.sin(angulo) * distancia;

        fogo.style.left = centroX + "px";
        fogo.style.top = centroY + "px";
        fogo.style.setProperty("--x", x + "px");
        fogo.style.setProperty("--y", y + "px");

        const tamanho = 5 + Math.random() * 7;
        fogo.style.width = tamanho + "px";
        fogo.style.height = tamanho + "px";

        document.body.appendChild(fogo);

        setTimeout(() => {
            fogo.remove();
        }, 950);
    }
}

// BOTÃO VOLTAR AO TOPO
const btnTopo = document.getElementById("btnTopo");

// Faz o botão aparecer quando descer a página
window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
        btnTopo.classList.add("aparecer");
    } else {
        btnTopo.classList.remove("aparecer");
    }
});

// Volta suavemente para o topo
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// BOTÃO VOLTAR AO TOPO
window.addEventListener("scroll", function () {
    const btnTopo = document.getElementById("btnTopo");

    if (window.scrollY > 300) {
        btnTopo.classList.add("aparecer");
    } else {
        btnTopo.classList.remove("aparecer");
    }
});

document.addEventListener("click", function (evento) {
    if (evento.target.closest("#btnTopo")) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

// MOSTRAR E ESCONDER SENHA NO PERFIL
const btnMostrarSenha = document.getElementById("btnMostrarSenha");
const senhaEscondida = document.getElementById("senhaEscondida");

btnMostrarSenha.addEventListener("click", function () {
    const senhaSalva = localStorage.getItem("senha");

    if (senhaEscondida.textContent === "••••••••") {
        senhaEscondida.textContent = senhaSalva;

        btnMostrarSenha.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        senhaEscondida.textContent = "••••••••";

        btnMostrarSenha.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
});



function pesquisarReceita() {
    const campo = document.getElementById("campoPesquisa");
    const texto = campo.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        const nome = card.querySelector("h3").innerText.toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

const campo = document.getElementById("campoPesquisa");

campo.addEventListener("input", pesquisarReceita);

function abrirInfo(){

    const modal = document.getElementById("modalInfo");

    modal.style.display = "flex";
}

function fecharInfo(){

    const modal = document.getElementById("modalInfo");

    modal.style.display = "none";
}

/* Fecha a janela ao clicar fora da caixa */
window.addEventListener("click", function(event){

    const modal = document.getElementById("modalInfo");

    if(event.target === modal){
        fecharInfo();
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-theme");
  
    if (!btn) return;
  
    const temaSalvo = localStorage.getItem("tema");
  
    if (temaSalvo === "light") {
      document.body.classList.add("light");
    }
  
    btn.addEventListener("click", () => {
      // animação extra no clique
      btn.classList.add("clicado");
  
      setTimeout(() => {
        btn.classList.remove("clicado");
      }, 300);
  
      document.body.classList.toggle("light");
  
      if (document.body.classList.contains("light")) {
        localStorage.setItem("tema", "light");
      } else {
        localStorage.setItem("tema", "dark");
      }
    });
  });