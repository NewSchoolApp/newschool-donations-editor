var meuBoao = document.getElementById("salvar");
var meuInputTotal = document.getElementById("total");
var meuInputFamilias = document.getElementById("familias");
var meuInputCestas = document.getElementById("cestas");
var meuInputPessoas = document.getElementById("pessoas");
var meuInputDoadores = document.getElementById("doadores");

function init() {
  fetch(
    "http://newschooldonormetric-env.eba-mxmw3egz.us-east-2.elasticbeanstalk.com/donations"
  )
    .then((value) => value.json())
    .then((data) => {
      const [
        { total_value, donated_baskets, donors, families, impacted_people },
      ] = data;

      meuInputTotal.value = total_value;
      meuInputCestas.value = donated_baskets;
      meuInputFamilias.value = families;
      meuInputPessoas.value = impacted_people;
      meuInputDoadores.value = donors;
    });
}

meuBoao.addEventListener("click", () => {
  event.preventDefault();

  const body = {
    total_value: Number(meuInputTotal.value),
    donated_baskets: Number(meuInputCestas.value),
    donors: Number(meuInputDoadores.value),
    families: Number(meuInputFamilias.value),
    impacted_people: Number(meuInputPessoas.value),
  };

  fetch(
    "http://newschooldonormetric-env.eba-mxmw3egz.us-east-2.elasticbeanstalk.com/donations/1",
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((value) => value.json())
    .then((data) => {
      if ([data].id) {
        return alert("Dados Atualizados com sucesso!");
      }
      return alert("Erro ao atualizar dados");
    });
});

init();
