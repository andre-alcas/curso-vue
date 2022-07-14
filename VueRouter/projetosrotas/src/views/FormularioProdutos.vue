<template>
  <div class="flex align-items-center justify-content-center">
    <!-- class="m-2 md:col-6 lg:col-6 xl:col-6 col-12" -->
    <Card>
      <template #title>
        <div class="border-round" :style="{ height: 'flex', background: 'linear-gradient(#127AD7, #0D89EC)' }">
          <div class="text-white text-center sm:text-xs md:text-lg text-base">
            Sistema de Controle de Estoque Hospitalar- SisCEH
          </div>
        </div>
        <div>
          <Toolbar class="mb-4">
            <template #start>
              <Button label="Cadastrar" icon="pi pi-plus" class="mr-2" @click="exibirDialogProduct" />
              <Button label="Editar" icon="pi pi-pencil" class="p-button-success mr-2" />
              <Button label="Deletar" icon="pi pi-trash" class="p-button-danger" />
              <i class="pi pi-bars p-toolbar-separator mr-2" />
            </template>
            <template #end>
              <Button icon="pi pi-search" class="mr-2" />
              <Button icon="pi pi-calendar" class="p-button-success mr-2" />
              <Button icon="pi pi-times" class="p-button-danger" />
            </template>
          </Toolbar>
        </div>
      </template>
      <template #content>
        <div>
          <div class="card">
            <DataTable :value="produtos" responsiveLayout="scroll" :paginator="true" :rows="5">
              <template #header>
                Produtos
              </template>
              <Column field="code" header="Código"></Column>
              <Column field="name" header="Nome"></Column>
              <Column field="price" header="Preço"></Column>
              <Column field="category.nome" header="Categoria"></Column>
              <Column field="quantity" header="Quant."></Column>
              <Column field="inventoryStatus.nome" header="Status"></Column>
              <Column field="rating" header="Avaliação">
                <template #body="slotProps">
                  <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
              </Column>
              <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                    @click="editProduct(slotProps.data)" />
                  <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                    @click="confirmDeleteProduct(slotProps.data)" />
                </template>
              </Column>
              <template #footer>
                Total de produtos cadastrados: {{ produtos ? produtos.length : 0 }} produtos.
              </template>
            </DataTable>
          </div>
        </div>
      </template>
      <template #footer>

      </template>
    </Card>
  </div>
  <Toast></Toast>
  <Dialog position="top" header="Cadastrar Produto" v-model:visible="newProductDialog" :style="{ width: '50vw' }">
    <form @submit.prevent="submit(!v$.$invalid)" class="flex flex-wrap align-items-center justify-content-center">
      <Card>
        <template #content>
          <div class="grid p-fluid">
            <!-- inicio elementos do formulario -->
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="p-float-label mr-2">
                  <InputText id="codigo" v-model="v$.produto.code.$model"
                    :class="{ 'p-invalid': v$.produto.code.$invalid && buttonClicked }" />
                  <label for="codigo">Código* </label>
                </div>
                <span v-if="v$.produto.code.$error || v$.produto.code.$pending.$response">
                  <span id="codigo-error" v-for="(error, index) of v$.produto.code.$errors" :key="index">
                    <small v-if="error.$params.min == 5" class="p-error">O código precisa ter pelo menos 5
                      caracteres</small>
                    <small v-else-if="error.$params.max == 10" class="p-error">O código precisa ter até 10
                      caracteres</small>
                  </span>
                </span>
                <small v-else-if="(v$.produto.code.$invalid && buttonClicked) || v$.produto.code.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="p-float-label mr-2">
                  <InputText id="nome" v-model="v$.produto.name.$model"
                    :class="{ 'p-invalid': v$.produto.name.$invalid && buttonClicked }" />
                  <label for="nome">Nome* </label>
                </div>
                <span v-if="v$.produto.name.$error || v$.produto.name.$pending.$response">
                  <span id="name-error" v-for="(error, index) of v$.produto.name.$errors" :key="index">
                    <small v-if="error.$params.min == 3" class="p-error">O nome precisa ter pelo menos 3
                      caracteres</small>
                    <small v-else-if="error.$params.max == 255" class="p-error">O nome precisa ter até 255
                      caracteres</small>
                  </span>
                </span>
                <small v-else-if="(v$.produto.name.$invalid && buttonClicked) || v$.produto.name.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="p-float-label mr-2">
                  <Textarea id="desc" v-model="v$.produto.description.$model" :autoResize="true"
                    :class="{ 'p-invalid': v$.produto.description.$invalid && buttonClicked }" />
                  <label for="desc">Descrição do produto* </label>
                </div>
                <span v-if="v$.produto.description.$error || v$.produto.description.$pending.$response">
                  <span id="name-error" v-for="(error, index) of v$.produto.description.$errors" :key="index">
                    <small v-if="error.$params.min == 3" class="p-error">A descrição precisa ter pelo menos 3
                      caracteres</small>
                    <small v-else-if="error.$params.max == 255" class="p-error">A descrição precisa ter até 255
                      caracteres</small>
                  </span>
                </span>
                <small
                  v-else-if="(v$.produto.description.$invalid && buttonClicked) || v$.produto.description.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="p-float-label">
                  <InputNumber id="prec" v-model="v$.produto.price.$model" mode="currency" currency="BRL" locale="pt-BR"
                    :class="{ 'p-invalid': v$.produto.price.$invalid && buttonClicked }" />
                  <label for="prec">Preço* </label>
                </div>
                <span v-if="v$.produto.price.$error || v$.produto.price.$pending.$response">
                  <span id="price-error" v-for="(error, index) of v$.produto.price.$errors" :key="index">
                    <small v-if="v$.produto.price.$model < 0" class="p-error">O preço não pode ser negativo</small>
                    <!-- <small v-else>{{ error.$params.min }} {{ v$.produto.price.$model }}</small> -->
                  </span>
                </span>
                <small v-else-if="(v$.produto.price.$invalid && buttonClicked) || v$.produto.price.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="form-group">
                  <div class="p-float-label">
                    <Dropdown id="categ" v-model="v$.produto.category.$model" :options="categoria" optionLabel="nome"
                      :class="{ 'p-invalid': v$.produto.category.$invalid && buttonClicked }" />
                    <label for="categ">Categoria* </label>
                  </div>
                  <small
                    v-if="(v$.produto.category.$invalid && buttonClicked) || v$.produto.category.$pending.$response"
                    class="p-error">Campo obrigatório</small>
                </div>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="p-float-label">
                  <InputNumber id="quant" v-model="v$.produto.quantity.$model"
                    :class="{ 'p-invalid': v$.produto.quantity.$invalid && buttonClicked }" showButtons mode="decimal"
                    :min="0" @input="setQuantity" />
                  <label for="quant">Quantidade* </label>
                </div>
                <!--                 <span v-if="v$.produto.quantity.$model == 0">
                </span> -->
                <small v-if="(v$.produto.quantity.$invalid && buttonClicked) || v$.produto.quantity.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="form-group">
                  <div class="p-float-label">
                    <Dropdown id="inv" v-model="v$.produto.inventoryStatus.$model" :options="estoqueStatus"
                      optionLabel="nome" :class="{ 'p-invalid': v$.produto.inventoryStatus.$invalid && buttonClicked }"
                      @change="onChangeStatus" />
                    <label for="inv">Estoque* </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:col-6 lg:col-6 xl:col-6 col-12">
              <div class="field">
                <div class="">
                  <label for="nota">Avaliação: </label>
                  <Rating id="nota" v-model="v$.produto.rating.$model" :cancel="false"
                    :class="{ 'p-invalid': v$.produto.rating.$invalid && buttonClicked }" />
                </div>
                <small v-if="(v$.produto.rating.$invalid && buttonClicked) || v$.produto.rating.$pending.$response"
                  class="p-error">Campo obrigatório</small>
              </div>
            </div>
            <div class="md:col lg:col xl:col col">
              <div class="field">
                <!-- Se a imagem ainda não tenha sido carregada(isto é, está null ainda)
                então é mostrado o campo pra escolher e enviar uma imagem -->
                <div v-if="produto.image == null">
                  <FileUpload name="demo[]" accept="image/*" :fileLimit="1" :customUpload="true" @uploader="myUploader"
                    :auto="true" :maxFileSize="1000000" :showCancelButton="true" :showUploadButton="false"
                    @select="onSelect" invalidFileSizeMessage="A imagem precisa ter até 1MB."
                    invalidFileLimitMessage="Você só pode enviar 1 imagem.">
                    <template #empty>
                      <p>Arraste e solte sua imagem aqui.</p>
                    </template>
                  </FileUpload>
                </div>
                <!-- caso contrário ele exibe um preview da imagem e exibi um botão pra trocar a mesma -->
                <div v-else class="flex align-items-center justify-content-center">
                  <div class="md:col-6 lg:col-6 xl:col-6 col-12">
                    <Image :src="imageSrc.linkImage" alt="Image" width="250" preview />
                    <!-- <p>{{ imageSrc.linkImage }}</p> -->
                    <Button label="Trocar Imagem" icon="pi pi-sync" @click="resetImage" autofocus />
                  </div>
                </div>
              </div>
            </div>


          </div><!-- fim elementos do formulario -->
        </template>
        <template #footer>
          <div class="grid justify-content-center">
            <!-- verifica se tem produto pra editar ou não, 
            caso tenha ele exibe o botão de cadastrar, caso não ele exibe atualizar -->
            <div v-if="produtoaEditar.length == 0" class="col-6">
              <Button label="Cadastrar" icon="pi pi-check" type="submit" autofocus />
              <Button label="Sair" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
            </div>
            <div v-else class="col-6">
              <p>{{ imageSrcRebase }}</p>
              <Button label="Sair" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
              <Button label="Atualizar" icon="pi pi-check" @click="updateProduct" autofocus />
            </div>
          </div>
        </template>
      </Card>
    </form>
  </Dialog>

  <Dialog v-model:visible="showdeleteProductDialog" :style="{ width: '450px' }" header="Confirme a exclusão"
    :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="produtoaDeletar != null">Você tem certeza que gostaria de excluir esse produto?
        {{ produtoaDeletar.name }}</span>
    </div>
    <template #footer>
      <Button label="Não" icon="pi pi-times" class="p-button-text" @click="showdeleteProductDialog = false" />
      <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
    </template>
  </Dialog>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, integer, minValue } from '@vuelidate/validators'
import ProductsService from '../service/ProductsService';
import Product from "../models/product";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      produto: new Product(),
      produtos: [],
      newProductDialog: false,
      showdeleteProductDialog: false,
      produtoaDeletar: [],
      produtoaEditar: [],
      buttonClicked: false,
      imageFile: null,
      imageRebase: null,
      categoria: [
        { nome: "Medicamento", id: "1" },
        { nome: "Insumo de Uso Geral", id: "2" },
        { nome: "Material Cirúrgico", id: "3" },
        { nome: "Vacina", id: "4" },
        { nome: "Outros", id: "5" },
      ],
      estoqueStatus: [
        { nome: "No estoque", id: "1" },
        { nome: "Baixo estoque", id: "2" },
        { nome: "Fora de estoque", id: "3" },
      ],

    }
  },//fim de data
  productsService: null,
  computed: {
    imageSrc() {
      if (this.imageFile != null) {
        return { linkImage: this.imageFile }
      }
      return { linkImage: null }
    },
    //TODO: RECUPERAR E EXIBIR IMAGEM
    imageSrcRebase() {
      if (this.produtoaEditar.lenght != 0) {
        //console.log(this.produtoaEditar.image)
        //this.blobTobase64(this.produtoaEditar.image)
        //console.log(this.imageRebase)
        return null;
      }
      return null;
    }
  },
  validations() {
    return {
      produto: {
        code: { required, minLength: minLength(5), maxLength: maxLength(10) },
        name: { required, minLength: minLength(3), maxLength: maxLength(255) },
        description: { required, minLength: minLength(3), maxLength: maxLength(255) },
        price: { required, minValue: minValue(0) },
        category: { required },
        quantity: { required, integer },
        inventoryStatus: { required },
        rating: { required },
      },
    }
  },
  created() {
    this.productsService = new ProductsService();
  },
  mounted() {
    this.listProducts();
    this.changeToPtLocaleOptions();
  },
  methods: {
    submit(isFormValid) {
      this.buttonClicked = true;
      //console.log(isFormValid)
      if (!isFormValid) {
        //console.log(this.produtos);
        return this.$toast.add({ severity: 'error', summary: 'Dados obrigatórios', detail: '', life: 3000 });
      } else {
        this.saveProduct();
      }
    },
    exibirDialogProduct() {
      this.produto = new Product();
      this.buttonClicked = false;
      this.newProductDialog = true;
    },
    saveProduct() {
      //this.produto.category = this.produto.category.nome;
      //this.produto.inventoryStatus = this.produto.inventoryStatus.nome;
      this.addProduct();
      //console.log(this.produto);
      this.$toast.add({ severity: 'success', summary: 'Produto adicionado', detail: 'Obrigado pela colaboração!', life: 3000 });
      this.resetForm();
    },
    closeDialog() {
      this.$toast.add({ severity: 'warn', summary: 'Confirme os dados com atenção', detail: 'Verifique seus dados!', life: 3000 });
      this.newProductDialog = false;
      this.resetForm();
      this.listProducts();
    },
    resetForm() {
      Object.assign(this.$data, this.$options.data());
      /* O método Object.assign() é usado para copiar os valores de todas 
      as propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino.
       Este método irá retornar o objeto destino. */
    },
    onChangeStatus(event) {
      let idValor = event.value.id;
      console.log(this.produto.inventoryStatus.id);
      if (idValor == 3) { //se fora de estoque seta quantidade pra 0
        this.produto.quantity = 0;
      }
      else {
        this.produto.quantity = null;
      }
      //console.log(idValor);
    },
    setQuantity(event) {
      let quantity = event.value;
      if (quantity == 0) {
        this.produto.inventoryStatus = this.estoqueStatus[2];
      }
      else if (quantity > 0 && quantity < 5) {
        this.produto.inventoryStatus = this.estoqueStatus[1];
      } else {
        this.produto.inventoryStatus = this.estoqueStatus[0];
      }
      //console.log(event.value);
    },
    addProduct() {
      this.productsService.addNewProduct(this.produto).then((res) => {
        if (res.status === 201) {
          //console.log(res.status);
          this.listProducts();
        }
      });
    },
    listProducts() {
      this.productsService.findAllProducts().then(res => {
        this.produtos = res.data
        //console.log(this.listateste);
      });
    },
    myUploader(event) {
      //this.produto.image = event.files[0].name; //manda só o nome da imagem
      //this.produto.image = event.files[0].objectURL; //manda só o blob da imagem
      this.produto.image = event.files[0]; //manda todo corpo da imagem pra poder conseguir converter de blob pra base 64 depois
      //console.log("clicou em upload");
      //console.log(this.produto.image);
      //this.blobTobase64(this.produto.image);
      //console.log(event.files);
      //console.log(event.files[0].name);
    },
    onSelect(e) {
      this.imageFile = e.files[0];
      let fileReader = new FileReader();
      //console.log("blob da imagem 1");
      //console.log(this.imageFile);
      //this.blobTobase64(this.imageFile);
      //console.log("base64 da imagem 1");
      //console.log(this.imageFile);
      fileReader.onload = () => {
        this.imageFile = fileReader.result;
        //console.log("base64 da imagem 1");
        //console.log(this.imageFile);
        //this.produto.image = this.file;
        //console.log("base64 da imagem 2");
        //console.log(this.produto.image);
      }
      fileReader.readAsDataURL(this.imageFile);
    },
    blobTobase64(blob) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        this.imageRebase = fileReader.result;
        console.log("imagem em base 64");
        console.log(this.imageRebase);
      }
    },
    resetImage() {
      this.produto.image = null;
    },
    editProduct(product) {
      this.newProductDialog = true;
      this.produto = product;
      this.produtoaEditar = product;
    },
    updateProduct() {
      this.productsService.updateProduct(this.produtoaEditar.id, this.produtoaEditar).then((res) => {
        if (res.status === 200) {
          //console.log(res.status);
          this.listProducts();
          this.$toast.add({ severity: 'success', summary: 'Atualização', detail: 'Produto atualizado!', life: 3000 });
        }
      });
      this.newProductDialog = false;
    },
    confirmDeleteProduct(data) {
      this.produtoaDeletar = data;
      //console.log(this.produtoaDeletar.id);
      this.showdeleteProductDialog = true;
    },
    deleteProduct() {
      this.productsService.removeProduct(this.produtoaDeletar.id).then((res) => {
        if (res.status === 200) {
          //console.log(res.status);
          this.listProducts();
          this.$toast.add({ severity: 'success', summary: 'Exclusão', detail: 'Produto excluído!', life: 3000 });
        }
      });
      this.showdeleteProductDialog = false;
    },
    changeToPtLocaleOptions() {
      this.$primevue.config.locale.accept = 'Sim';
      this.$primevue.config.locale.reject = 'Não';
      this.$primevue.config.locale.choose = 'Escolher';
      this.$primevue.config.locale.upload = 'Upload';
      this.$primevue.config.locale.cancel = 'Cancelar';
    },
  },//fim de methods
};

</script>


<style>
</style>
