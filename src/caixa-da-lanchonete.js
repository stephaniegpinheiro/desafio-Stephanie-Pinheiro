class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        const objItens = {
            'cafe': 300,
            'chantily': 150,
            'suco': 620,
            'sanduiche': 650,
            'queijo': 200,
            'salgado': 725,
            'combo1': 950,
            'combo2': 750
        }

        //A condição if abaixo verifica primeiramente se o array recebido pelo parâmetro itens está vindo vazia ou não.
        //para isto, usa-se o método .lenght para verificar se o tamanhp do array é igual a "zero". Se sim, o return é executado e nada após ele será executado.
        if(itens.length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        let respostaFinal = 0;

        //Linhas 25 e 26: Recebe o array itens,transforma em string e depois transforma esta string em um array com cada string em um índice próprio:
        let transformaString = itens.toString();
        let stringEmArray = transformaString.split(',');
        let arrayItensQuant = stringEmArray;

        //Separação do array em 2: arrayItens apenas com os itens e arrayQuant apenas com a quantidade de cada item:
        let arrayItens = [];
        let arrayQuant = [];

        //Neste laço for, ele percorre o arrayItensQuant enquanto o "i" é menor que o comprimento dele. No primeiro looping "i" = 0 e atende a
        //condição do primeiro if. Porém antes do elemento ser adicionado ao arrayItens, ele cai na segunda condição, que verifica se existe ou não o item passado dentro do objItens.
        for (let i = 0; i < arrayItensQuant.length; i++) {
            if (i % 2 === 0) {
                if(objItens[arrayItensQuant[i]] === undefined) {
                    return 'Item inválido!'
                }
                arrayItens.push(arrayItensQuant[i]);
            } else {
                arrayQuant.push(Number(arrayItensQuant[i]));
            }
        }

        //No segundo for, há a verificação se a quantidade passada em algum item é igual a zero. Para isto, os valores depositados no arrayQuant
        //serão adicionados à variável let soma, que será verificada na condição if logo abaixo.
        let soma = 0;

        for(let i = 0; i < arrayQuant.length; i++) {
            soma += arrayQuant[i]
        }

        if(soma === 0) {
            return 'Quantidade inválida!'
        }

        // Calculando o valor da compra de acordo com o item, a quantidade do item e o valor dele:
        let totalDaCompra = 0;
        let item = '';
        let quantidade = 0;
        let valorItem = 0;
        let temCafe = false;
        let temChantily = false;
        let temQueijo = false;
        let temSanduiche = false;
        let pedidoOk = false;
        let quantidadeOk = false;

        //objItens[item] acessa o valor da chave do objeto especificado na variável item, dentro dos colchetes.
        for (let i = 0; i < arrayItens.length; i++) {
            item = arrayItens[i];
            quantidade = arrayQuant[i];
            valorItem = objItens[item];
            totalDaCompra += quantidade * valorItem
            if (arrayItens[i] === 'chantily') {
                temChantily = true;
            } else if (arrayItens[i] === 'cafe') {
                temCafe = true;
            } else if (arrayItens[i] === 'queijo') {
                temQueijo = true;
            } else if (arrayItens[i] === 'sanduiche') {
                temSanduiche = true;
            } else {
                pedidoOk = true;
            }
        }

        if (temCafe === false && temChantily === true) {
            respostaFinal = 'Item extra não pode ser pedido sem o principal'
        } else if (temSanduiche === false && temQueijo === true) {
            respostaFinal = 'Item extra não pode ser pedido sem o principal'
        } else {
            
            //Aplicando o método de pagamento:
            const descontoDinheiro = 0.95;
            const acrescimoCredito = 1.03;

            if (metodoDePagamento === 'dinheiro') {
                totalDaCompra = totalDaCompra * descontoDinheiro
            } else if (metodoDePagamento === 'credito') {
                totalDaCompra = totalDaCompra * acrescimoCredito
            } else if (metodoDePagamento === 'debito') {
                totalDaCompra = totalDaCompra
            } else {
                return 'Forma de pagamento inválida!';
            }
            respostaFinal = 'R$ ' + (((totalDaCompra / 100).toFixed(2)).replace('.', ',')).toString();
        }
        return respostaFinal;
    }
}

//Linhas 113 e 114: Instaciamento da class e execução dos testes para verificar todo o código
const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra('debito', ['salgado,0', 'suco,0']));

export { CaixaDaLanchonete };
