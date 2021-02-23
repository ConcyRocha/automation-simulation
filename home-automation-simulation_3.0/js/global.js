//====================================================================================
// FUNCIONALIDADE DRAG AND DROP
//====================================================================================

/* Acionar ao arrastar*/
document.addEventListener("dragstart", function(event) {
    // Método para definir o tipo de dados e arrastar os dados
    event.dataTransfer.setData("text/plain", event.target.id);

    // Exibir algum texto ao arrastar o elemento
    document.getElementById("info").innerHTML = event.target.alt;  

    // Modifica a transparência do elemento arrastado
    event.target.style.opacity = "0.4";
});

// Ao arrastar o elemento, mude a cor do texto de saída
document.addEventListener("drag", function(event) {
    document.getElementById("info").style.color = "#f5e311";
});

// Ao arrastar o elemento, redefina o elemento de texto e redefina a transparência
document.addEventListener("dragend", function(event) {
    document.getElementById("info").innerHTML = "Arraste os elementos para alguma das caixas abaixo:";
    event.target.style.opacity = "1";
});

// Quando o elemento é arrastado para o droptarget, mude o estilo da borda do div
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget-device" 
        || event.target.className == "droptarget-component" 
        || event.target.className == "droptarget-actuator" 
        || event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});

// Quando o elemento arrastável deixa o droptarget, redefina o estilo da borda do div
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget-device" 
        || event.target.className == "droptarget-component" 
        || event.target.className == "droptarget-actuator" 
        || event.target.className == "droptarget" ) {
        event.target.style.border = "";
    }
});

// Por padrão, os elementos não podem ser arrastados e soltos em outros elementos. 
// Para o drop, devemos evitar o tratamento padrão de elementos
document.addEventListener("dragover", function(event) {
    // isso vai cancelar qualquer ação padrão do elemento escolhido 
    event.preventDefault();
});

//toda ver que soltar um elemento
document.addEventListener("drop", function(event) {
    // isso vai cancelar qualquer ação padrão do elemento escolhido 
    event.preventDefault();
    
    //verifica se o elemento foi arrastado para a div que contem a classe "droptarget-device"
    if (event.target.className == "droptarget-device") {
        
        //redefine o texto informativo
        document.getElementById("info").style.color = "";
        
        //redefine a borda do div
        event.target.style.border = "";
        
        //pega o id do elemento arrastado
        var data = event.dataTransfer.getData("text/plain");
        
        //verifica se o elemento é um dispositivo 
        if(data == "televisao"
            || data == "ar_condicionado"
            || data == "lampada"){
            
            //entao aceita o elemento    
            event.target.appendChild(document.getElementById(data));
        }else{
            //se nao, exibe um alerta
            alert("Ops! Esta área é destinada para dispositivos...");
        }
    }
    //verifica se o elemento foi arrastado para a div que contem a classe "droptarget-component"
    else if(event.target.className == "droptarget-component"){
        
        //redefine o texto informativo
        document.getElementById("info").style.color = "";
        
        //redefine a borda do div
        event.target.style.border = "";
        
        //pega o id do elemento arrastado
        var data = event.dataTransfer.getData("text/plain");
        
        //verifica se o elemento é um componente 
        if(data == "sensor_luminosidade"
            || data == "sensor_proximidade"
            || data == "sensor_temperatura"){
            
            //entao aceita o elemento    
            event.target.appendChild(document.getElementById(data));
        }else{
            //se nao, exibe um alerta
            alert("Ops! Esta área é destinada para sensores...");
        }
    }
    //verifica se o elemento foi arrastado para a div que contem a classe "droptarget-actuator"
    else if(event.target.className == "droptarget-actuator"){
        
        //redefine o texto informativo
        document.getElementById("info").style.color = "";
        
        //redefine a borda do div
        event.target.style.border = "";
        
        //pega o id do elemento arrastado
        var data = event.dataTransfer.getData("text/plain");
        
        //verifica se o elemento é um componente 
        if(data == "atuador_rele1"
            || data == "atuador_rele2"){
            
            //entao aceita o elemento    
            event.target.appendChild(document.getElementById(data));
        }else{
            //se nao, exibe um alerta
            alert("Ops! Esta área é destinada para atuadores...");
        }
    }
    //verifica se o elemento foi arrastado para a div que contem a classe "droptarget" (personagem)
    else if(event.target.className == "droptarget"){
        
        //redefine o texto informativo
        document.getElementById("info").style.color = "";
        
        //redefine a borda do div
        event.target.style.border = "";
        
        //pega o id do elemento arrastado
        var data = event.dataTransfer.getData("text/plain");
        
        //verifica se o elemento é um componente 
        if(data == "pessoa"){
            
            //entao aceita o elemento    
            event.target.appendChild(document.getElementById(data));
        }else{
            //se nao, exibe um alerta
            alert("Ops! Esta área é destinada para personagens...");
        }
    }
    
    //verifica se algum sensor foi ativado
    check_sensor();

    //atualiza o painel do lado direito (elementos)
    checkElements();
});

//====================================================================================
// REGRAS GERAIS
//====================================================================================

var flag_lampada_ligada = false;
var flag_ar_ligada = false;
var flag_tv_ligada = false;

//inicializador padrão do jQuery, tudo que estiver aqui dentro será executado ao carregar a pagina
$(document).ready(function(){
    
    //pega o ambiente atual selecionado e atribui a variavel: current_room
    var current_room = $("#select_room").val();
    
    //passa o ambiente atual selecionado para uma funcao que exibe/esconde os dispositivos no painel de controle
    devices_of_room(current_room);
    
    //cada vez que o ambiente for selecionado...
    $("#select_room").on("change", function(){
        //pega o valor atual e atribui a variavel "room"
        var room = $(this).val();

        //altera a imagem para o ambiente selecionado
        if(room == "garagem"){
          $(".wrapper-room img.room").attr("src", "images/room/garagem/garagem.jpg");
        }else if(room == "sala"){
          $(".wrapper-room img.room").attr("src", "images/room/sala/sala.jpg");
        }else if(room == "quarto"){
          $(".wrapper-room img.room").attr("src", "images/room/quarto/quarto.jpg");
        }else if(room == "cozinha"){
          $(".wrapper-room img.room").attr("src", "images/room/cozinha/cozinha.jpg");
        }else if(room == "banheiro"){
          $(".wrapper-room img.room").attr("src", "images/room/banheiro/banheiro.jpg");
        }
        
        //verifica se algum sensor foi ativado
        check_sensor();
        
        //passa o ambiente selecionado para uma funcao que exibe/esconde os dispositivos no painel de controle
        devices_of_room(room);  
    });

    //ao clicar no botao ativar simulacao
    $("#toggle-simulation").on("click", function(){
        
        //verifica se um ambiente foi selecionado, se nao exibe mensagem de alerta
        if($("#select_room").val() == ""){
            alert("Você deve escolher um ambiente para iniciar a simulação!");
        }else{
            //verifrica se tem a classe "on" que corresponde ao status inicial
            if($(this).hasClass("on")){
                //entao remove a classe on (que faz o botao ficar verde no css)
                $(this).removeClass("on");

                //adiciona a classe off (que faz o botao ficar vermelha no css)
                $(this).addClass("off");

                //altera o texto do botao
                $(this).html('<i class="fa fa-pause" aria-hidden="true"></i> Parar Simulação');

                //exibe os componentes
                $(".toggle-simulation").show();

                //altera o texto de instrucoes inicial
                $(".wrapper-infos p").text("Arraste os elementos para alguma das caixas abaixo:");

                //desabilita o botao de trocar o cenario
                $("#select_room").prop("disabled", true);
            }else{
                //atualiza a pagina, voltando tudo para o estado inicial
                window.location.reload();
            }
        }

    });
    
});

function devices_of_room(room){
    //se o ambiente for = garagem
    //exibe somente o dispositivo lampada no painel de controle
    //esconde o sensor de temperatura
    //exibe 1 rele
    if(room == "garagem"){
        //dispositivos
        $("#televisao").hide();
        $("#ar_condicionado").hide();
        $("#lampada").show();
        
        //sensores
        $("#sensor_luminosidade").show();
        $("#sensor_proximidade").show();
        $("#sensor_temperatura").hide();
        
        //atuadores
         $("#atuador_rele1").show();
         $("#atuador_rele2").hide();
    }
    //se o ambiente for = sala
    //exibe todos os dispositivos no painel de controle
    //exibe todos os sensores
    //exibe 2 rele
    else if(room == "sala"){
        //dispositivos
        $("#televisao").show();
        $("#ar_condicionado").show();
        $("#lampada").show();
        
        //sensores
        $("#sensor_luminosidade").show();
        $("#sensor_proximidade").show();
        $("#sensor_temperatura").show();
        
        //atuadores
         $("#atuador_rele1").show();
         $("#atuador_rele2").show();
    }
    //se o ambiente for = quarto
    //exibe todos os dispositivos no painel de controle
    //exibe todos os sensores
    //exibe 2 rele
    else if(room == "quarto"){
        //dispositivos
        $("#televisao").show();
        $("#ar_condicionado").show();
        $("#lampada").show();
        
        //sensores
        $("#sensor_luminosidade").show();
        $("#sensor_proximidade").show();
        $("#sensor_temperatura").show();
        
        //atuadores
         $("#atuador_rele1").show();
         $("#atuador_rele2").show();
    }
    //se o ambiente for = cozinha
    //exibe o dispositivo lampada e ar-condicionado no painel de controle
    //exibe todos os sensores
    //exibe 1 rele
    else if(room == "cozinha"){
        //dispositivos
        $("#televisao").hide();
        $("#ar_condicionado").show();
        $("#lampada").show();
        
        //sensores
        $("#sensor_luminosidade").show();
        $("#sensor_proximidade").show();
        $("#sensor_temperatura").show();
        
        //atuadores
         $("#atuador_rele1").show();
         $("#atuador_rele2").hide();
    }
    //se o ambiente for = banheiro
    //exibe somente o dispositivo lampada no painel de controle
    //esconde o sensor de temperatura
    //exibe 1 rele
    else if(room == "banheiro"){
        $("#televisao").hide();
        $("#ar_condicionado").hide();
        $("#lampada").show();
        
        //sensores
        $("#sensor_luminosidade").show();
        $("#sensor_proximidade").show();
        $("#sensor_temperatura").hide();
        
        //atuadores
         $("#atuador_rele1").show();
         $("#atuador_rele2").hide();
    }
}

function check_sensor(){
    //armazena a quantidade de elementos selecionados de cada categoria (dispositivos, sensores, atuadores)
    var qtd_devices = $(".wrapper-box .item[data-item='devices']").find(".droptarget-device img").length;
    var qtd_components = $(".wrapper-box .item[data-item='components']").find(".droptarget-component img").length;
    var qtd_actuators = $(".wrapper-box .item[data-item='actuators']").find(".droptarget-actuator img").length;
    
    //verifica qual dispositivo está selecionado
    //se flag = 1, o elemento está selecionado...se flag = 0 o elemento não está selecionado
    var flag_lampada = $(".wrapper-box .item[data-item='devices']").find("#lampada").length;
    var flag_televisao = $(".wrapper-box .item[data-item='devices']").find("#televisao").length;
    var flag_ar_condicionado = $(".wrapper-box .item[data-item='devices']").find("#ar_condicionado").length;
    
    //verifica qual sensor está selecionado
    //se flag = 1, o elemento está selecionado...se flag = 0 o elemento não está selecionado
    var flag_sensor_luminosidade = $(".wrapper-box .item[data-item='components']").find("#sensor_luminosidade").length;
    var flag_sensor_proximidade = $(".wrapper-box .item[data-item='components']").find("#sensor_proximidade").length;
    var flag_sensor_temperatura = $(".wrapper-box .item[data-item='components']").find("#sensor_temperatura").length;
    
    //verifica qual atuador está selecionado
    //se flag = 1, o elemento está selecionado...se flag = 0 o elemento não está selecionado
    var flag_atuador_rele1 = $(".wrapper-box .item[data-item='actuators']").find("#atuador_rele1").length;
    var flag_atuador_rele2 = $(".wrapper-box .item[data-item='actuators']").find("#atuador_rele2").length;
    
    //verifica se personagem está selecionado
    //se flag = 1, o elemento está selecionado...se flag = 0 o elemento não está selecionado
    var flag_personagem = $(".wrapper-room .droptarget").find("#pessoa").length;

    if(qtd_devices != 0 || qtd_components != 0 || qtd_actuators!=0){
        $(".wrapper-elements").removeClass("on");
        $(".wrapper-elements").addClass("on");    
    }
    
    //============================================================================================
    
    /*
    ************
    
    SITUAÇÕES POSSÍVEIS:

    Aqui será feita uma verificação e validação de todas as situações possíveis para acionar os dispositivos e componentes
    
    ************
    */
    
    //pega o ambiente atual selecionado e atribui a variavel: current_room
    var current_room = $("#select_room").val();

    // se o personagem está no cenário, então = LIGAR
    if(flag_personagem == 1){
        
        //todos os dispositivos iniciam com o status "false"
        var ligar_lampada = false;
        var ligar_ar = false;
        var ligar_tv = false;

        //verifica se tem um sensor de proximidade (para detectar a pessoa) e pelo menos 1 atuador
        if(flag_sensor_proximidade == 1 && qtd_actuators >= 1 && qtd_actuators <= 2){

            //percorre cada dispositivo que foi adicionado
            $(".wrapper-box .item[data-item='devices'] .droptarget-device").each(function(){
                
                //pega o tipo do dispositivo
                var device = $(this).find("img").attr("data-device");

                //se o dispositivo for lampada
                if(device == "lampada"){

                    if(flag_lampada_ligada == false){
                        var question;
                        var reply = confirm("A luminosidade está baixa, deseja ligar as lâmpadas?");

                        //question = "Se o usuario clicar em OK!"
                        if(reply == true){
                            //altera o status do dispositivo para ligar
                            ligar_lampada = true;
                            flag_lampada_ligada = true;
                        }
                    }else{
                        ligar_lampada = true;
                    }

                }
                //se o dispositivo for ar_condicionado
                else if(device == "ar_condicionado"){
                    
                    //verifica se sensor de temperatura foi adicionado
                    if(flag_sensor_temperatura == 1){
                        
                        if(flag_ar_ligada == false){
                            var question;
                            var reply = confirm("A temperatura do ambiente está quente, deseja ligar o ar condicionado?");

                            //question = "Se o usuario clicar em OK!"
                            if(reply == true){
                                //altera o status do dispositivo para ligar
                                ligar_ar = true;
                                flag_ar_ligada = true;
                            }
                        }else{
                            ligar_ar = true;
                        }
                        
                    }
                    
                }
                //se o dispositivo for televisao
                else if(device == "televisao"){

                    //altera o status do dispositivo para ligar
                    ligar_tv = true;

                } 
            });

        }

        //Verifica se a tem 3 dispositivos e apenas 1 atuador, então exibe mensagem de alerta
        if(qtd_devices == 3 && qtd_actuators == 1){
            alert("Para ligar 3 dispositivos você precisa de 2 atuadores do tipo: Relé");
            
            //desliga um dispositivo, pois falta 1 atuador
            if(ligar_lampada == true && ligar_ar == true && ligar_tv == true){
                ligar_ar = false;
                flag_ar_ligada = false;
            }            
        }

        //cria uma variavel para montar o caminho da imagem
        var caminhoImagem = "";

        //se a lampada estiver ligada, adiciona ao caminho da imagem
        if(ligar_lampada == true){
            caminhoImagem += "_lampada";
        }else{
            flag_lampada_ligada = false;
        }

        //se o ar_condicionado estiver ligado, adiciona ao caminho da imagem
        if(ligar_ar == true){
            caminhoImagem += "_ar";
        }else{
            flag_ar_ligada = false;
        }

        //se a televisao estiver ligada, adiciona ao caminho da imagem
        if(ligar_tv == true){
            caminhoImagem += "_tv";
        }else{
            flag_tv_ligada = false;
        }

        //adiciona a extensao ao final do caminho da imagem
        caminhoImagem += ".jpg";

        //atualiza o ambiente atual
        if(current_room == "garagem"){
            $(".wrapper-room img.room").attr("src", "images/room/garagem/garagem"+caminhoImagem);
        }else if(current_room == "sala"){
            $(".wrapper-room img.room").attr("src", "images/room/sala/sala"+caminhoImagem);
        }else if(current_room == "quarto"){
            $(".wrapper-room img.room").attr("src", "images/room/quarto/quarto"+caminhoImagem);
        }else if(current_room == "cozinha"){
            $(".wrapper-room img.room").attr("src", "images/room/cozinha/cozinha"+caminhoImagem);
        }else if(current_room == "banheiro"){
            $(".wrapper-room img.room").attr("src", "images/room/banheiro/banheiro"+caminhoImagem);
        }
        
    }
    // sem o personagem = DESLIGAR TUDO
    else{
        //desliga a lampada do ambiente atual
        if(current_room == "garagem"){
          $(".wrapper-room img.room").attr("src", "images/room/garagem/garagem.jpg");
        }else if(current_room == "sala"){
          $(".wrapper-room img.room").attr("src", "images/room/sala/sala.jpg");
        }else if(current_room == "quarto"){
          $(".wrapper-room img.room").attr("src", "images/room/quarto/quarto.jpg");
        }else if(current_room == "cozinha"){
          $(".wrapper-room img.room").attr("src", "images/room/cozinha/cozinha.jpg");
        }else if(current_room == "banheiro"){
          $(".wrapper-room img.room").attr("src", "images/room/banheiro/banheiro.jpg");
        }
    }
}

function checkElements(){
    //limpa o painel de elementos
    $(".wrapper-panel-actions .wrapper-elements-actions .elements-devices").empty();
    $(".wrapper-panel-actions .wrapper-elements-actions .elements-components").empty();
    $(".wrapper-panel-actions .wrapper-elements-actions .elements-actuators").empty();

    //percorre cada dispositivo que foi adicionado
    $(".wrapper-box .item[data-item='devices'] .droptarget-device").each(function(){
        //pega o nome e descricao de um elemento
        var nome_elemento = $(this).find("img").attr("title");
        var acao_elemento = $(this).find("img").attr("data-function");
        
        //monta um bloco html dentro de uma variavel
        var htmlItem = "";
        htmlItem += "<div class='item'>";
        htmlItem += "   <p class='title'>"+nome_elemento+"</p>";
        htmlItem += "   <p class='desc'>"+acao_elemento+"</p>";
        htmlItem += "</div>";
        
        //verifica se o elemento não tem nome indefinido
        if(nome_elemento != undefined){
            //adiciona o elemento ao painel de elementos
            $(".wrapper-panel-actions .wrapper-elements-actions .elements-devices").append(htmlItem); 
        } 
    });

    //percorre cada componente que foi adicionado
    $(".wrapper-box .item[data-item='components'] .droptarget-component").each(function(){
        //pega o nome e descricao de um elemento
        var nome_elemento = $(this).find("img").attr("title");
        var acao_elemento = $(this).find("img").attr("data-function");
        
        //monta um bloco html dentro de uma variavel
        var htmlItem = "";
        htmlItem += "<div class='item'>";
        htmlItem += "   <p class='title'>"+nome_elemento+"</p>";
        htmlItem += "   <p class='desc'>"+acao_elemento+"</p>";
        htmlItem += "</div>";
        
        //verifica se o elemento não tem nome indefinido
        if(nome_elemento != undefined){
            //adiciona o elemento ao painel de elementos
            $(".wrapper-panel-actions .wrapper-elements-actions .elements-components").append(htmlItem); 
        } 
    });

    //percorre cada atuador que foi adicionado
    $(".wrapper-box .item[data-item='actuators'] .droptarget-actuator").each(function(){
        //pega o nome e descricao de um elemento
        var nome_elemento = $(this).find("img").attr("title");
        var acao_elemento = $(this).find("img").attr("data-function");
        
        //monta um bloco html dentro de uma variavel
        var htmlItem = "";
        htmlItem += "<div class='item'>";
        htmlItem += "   <p class='title'>"+nome_elemento+"</p>";
        htmlItem += "   <p class='desc'>"+acao_elemento+"</p>";
        htmlItem += "</div>";
        
        //verifica se o elemento não tem nome indefinido
        if(nome_elemento != undefined){
            //adiciona o elemento ao painel de elementos
            $(".wrapper-panel-actions .wrapper-elements-actions .elements-actuators").append(htmlItem); 
        } 
    });
}
