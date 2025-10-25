const API = 'https://compensa-backend.onrender.com/tarefas';

const form = document.getElementById('form');
const lista = document.getElementById('lista');
const filtroStatus = document.getElementById('filtroStatus');
const filtroTipo = document.getElementById('filtroTipo');
const busca = document.getElementById('busca');

async function getTarefas() {
  const res = await fetch(API);
  return res.json();
}

function aplicaFiltros(dados) {
  let r = [...dados];
  if (filtroStatus.value) r = r.filter(t => (t.status || '').toLowerCase() === filtroStatus.value);
  if (filtroTipo.value) r = r.filter(t => (t.tipo || '').toLowerCase() === filtroTipo.value);
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase();
    r = r.filter(t => (t.titulo || '').toLowerCase().includes(q));
  }
  // Ordena por data (asc) e depois por status (pendentes primeiro)
  r.sort((a,b) => {
    const sa = (a.status||'') === 'pendente' ? 0 : 1;
    const sb = (b.status||'') === 'pendente' ? 0 : 1;
    if (sa !== sb) return sa - sb;
    return String(a.data||'').localeCompare(String(b.data||''));
  });
  return r;
}

function render(dados) {
  lista.innerHTML = '';
  if (!dados.length) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma tarefa encontrada.';
    lista.appendChild(li);
    return;
  }

  dados.forEach(t => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'item-info';
    const titulo = document.createElement('span');
    titulo.className = 'titulo';
    titulo.textContent = t.titulo;
    const detalhes = document.createElement('small');
    detalhes.textContent = `${t.data || 'sem data'} — ${t.tipo || 'sem tipo'} — [${t.status || 'pendente'}]`;
    info.appendChild(titulo);
    info.appendChild(detalhes);

    const acoes = document.createElement('div');
    acoes.className = 'acoes';

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = 'Concluir';
    btnConcluir.onclick = async () => {
      await fetch(`${API}/${t.id}/concluir`, { method: 'PUT' });
      carregar();
    };

    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.onclick = async () => {
      await fetch(`${API}/${t.id}`, { method: 'DELETE' });
      carregar();
    };

    acoes.appendChild(btnConcluir);
    acoes.appendChild(btnApagar);

    li.appendChild(info);
    li.appendChild(acoes);
    lista.appendChild(li);
  });
}

async function carregar() {
  try {
    const dados = await getTarefas();
    render(aplicaFiltros(dados));
  } catch (e) {
    console.error(e);
    lista.innerHTML = '<li>Erro ao carregar. Confirme se o servidor está em http://localhost:3000</li>';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;
  if (!titulo) return;

  await fetch(API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ titulo, data, tipo })
  });

  form.reset();
  carregar();
});

[filtroStatus, filtroTipo, busca].forEach(el => el.addEventListener('input', carregar));

// inicial
carregar();
