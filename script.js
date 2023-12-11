const handleSearch = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#message');
  message.innerHTML = 'buscando CEP...';

  const cepList = document.querySelector('#cep');
  cepList.innerHTML = '';

  const searchBox = document.querySelector('#query');
  const search = searchBox.value;

  const url = `https://api.postmon.com.br/v1/cep/${search}`;

  const response = await fetch(url);
  const cep = await response.json();

  if (cep.length === 0) {
    message.innerHTML = 'Nenhum resultado encontrado';
    return;
  }

  message.innerHTML = '';

  const cidade = cep?.cidade;
  const bairro = cep?.bairro;
  const logradouro = cep?.logradouro || '';
  const estado = cep?.estado_info.nome;
  const complemento = cep?.complemento;

  console.log(cidade, bairro, logradouro, estado, complemento);
  cepList.insertAdjacentHTML(
    'beforeend',
    `
    <br>
    <div class="border">
    <span class="show-name">Cidade: ${cidade}</span>
    <br>
    <span class="show-name">Bairro: ${bairro}</span>
    <br>
    <span class="show-name">Complemento do CEP: ${complemento}</span>
    <br>
    <span class="show-name">Logradouro do CEP: ${logradouro}</span>
    <br>
    <span class="show-name">Estado: ${estado}</span>
    </div>
    `
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-Form')
    .addEventListener('submit', handleSearch);
});
