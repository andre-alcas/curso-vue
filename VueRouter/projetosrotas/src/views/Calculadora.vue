<template>
  <Panel toggleable:true :style="{ width: '330px', height: '560px' }">
    <Display class="display2" :value="historicoCalculos" />
    <Display :value="displayValue" />
    <hr>
    <div class="grid">
      <div class="col ">
        <Button label="AC" class="col-12" @click="clearMemory()" />
      </div>
      <div class="col-3 ">
        <Button label="/" class="col-12" @click="setOperation('/')" />
      </div>
      <!--
      <div class="col -mr-8">
        <Button label="AC" class="col-12" @click="clearMemory()" />
      </div>
      <div class="col-3 mr-1">
        <Button label="/" class="col-12" @click="setOperation('/')" />
      </div>
      -->
    </div>
    <div class="grid">
      <div class="col">
        <Button label="7" class="col-12" @click="addDigit('7')" />
      </div>
      <div class="col">
        <Button label="8" class="col-12" @click="addDigit('8')" />
      </div>
      <div class="col">
        <Button label="9" class="col-12" @click="addDigit('9')" />
      </div>
      <div class="col">
        <Button label="*" class="col-12" @click="setOperation('*')" />
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <Button label="4" class="col-12" @click="addDigit('4')" />
      </div>
      <div class="col">
        <Button label="5" class="col-12" @click="addDigit('5')" />
      </div>
      <div class="col">
        <Button label="6" class="col-12" @click="addDigit('6')" />
      </div>
      <div class="col">
        <Button label="-" class="col-12" @click="setOperation('-')" />
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <Button label="1" class="col-12" @click="addDigit('1')" />
      </div>
      <div class="col">
        <Button label="2" class="col-12" @click="addDigit('2')" />
      </div>
      <div class="col">
        <Button label="3" class="col-12" @click="addDigit('3')" />
      </div>
      <div class="col">
        <Button label="+" class="col-12" @click="setOperation('+')" />
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <Button label="0" class="col-12" @click="addDigit('0')" />
      </div>
      <div class="col-3">
        <Button label="." class="col-12" @click="addDigit('.')" />
      </div>
      <div class="col-3">
        <Button label="=" class="col-12" @click="setOperation('=')" />
      </div>
    </div>
  </Panel>
</template>

<script>
import Display from "./Display";

export default {
  components: { Display },
  data: function () {
    return {
      displayValue: "0",
      historicoCalculos: "0",
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0,
    };
  },
  methods: {
    clearMemory() {
      //console.log('LimparMemoria')
      Object.assign(this.$data, this.$options.data());
    },
    setOperation(operation) {
      //console.log('Operacao'+operation)
      //quando é o primeiro número informado operação é setada e o display é resetado
      //e o valor de current(segundo valor do vetor) é esperado
      if (this.current === 0) {
        this.operation = operation;
        this.current = 1;
        this.clearDisplay = true;
      } else {
        const equals = operation === "=";
        const currentOperation = this.operation;
        this.historicoCalculos =
          this.values[0] + currentOperation + this.values[1];
        try {
          this.values[0] = eval(
            `${this.values[0]} ${currentOperation} ${this.values[1]}`
          );
        } catch (e) {
          this.$emit("OnError", e);
        }
        //this.historicoCalculos = this.historicoCalculos + "=" +this.values[0];
        this.historicoCalculos = this.historicoCalculos + "=";
        this.values[1] = 0;
        //setar o número de casas decimais(precisao) da calculadora
        this.displayValue = parseFloat(this.values[0]).toFixed(2);
        //this.displayValue = this.values[0];
        this.operation = equals ? null : operation;
        this.current = equals ? 0 : 1;
        this.clearDisplay = !equals;
        //console.log("resultado" + this.values[0], this.values[1]);
        if (this.addDigit) {
          //console.log("onclick.name");
          this.clearDisplay = true;
        }
      }
    },
    addDigit(n) {
      if (n === "." && this.displayValue.includes(".")) {
        return;
      }
      //limpa o display quando o display já está com 0(já é o padrão dentro de data())
      //ou quando o display = true
      const clearDisplay = this.displayValue === "0" || this.clearDisplay;
      //quando limpa o display o valor atual currentValue pode resetar(clearDisplay) ou pode ser
      //o valor que tá no display(this.displayValue)
      const currentValue = clearDisplay ? "" : this.displayValue;
      //atualiza o valor exibido no display concatenado com o digito n
      const newdisplayValue = currentValue + n;

      //atualiza o valor exibido no display(this.displayValue de data()) com o valor da constante newValue
      this.displayValue = newdisplayValue;
      this.clearDisplay = false;

      //Alternativa 1
      this.values[this.current] = this.displayValue;
      //console.log(this.values[0], this.values[1]);
      //Alternativa 2
      /*       if(n !== "."){
        const i = this.current
        const newValue = parseFloat(this.displayValue)
        this.values[i] = newValue

      } */
    },
    /*     calcular(nomeOperacao) {
      console.log(nomeOperacao);
      switch (nomeOperacao) {
        case (nomeOperacao = "somar"):
          this.value1 = 5;
          this.value2 = 10;
          this.resultado = this.value1 + this.value2;
          alert("Resultado é:" + this.resultado);

          break;

        case (nomeOperacao = "dividir"):
          alert("estou dividindo numeros");
          break;

        case (nomeOperacao = "mult"):
          alert("estou multiplicando numeros");
          break;

        case (nomeOperacao = "sub"):
          alert("estou subtraindo numeros");
          break;

        default:
          break;
      }
    }, */
  },
};
</script>

<style>
</style>