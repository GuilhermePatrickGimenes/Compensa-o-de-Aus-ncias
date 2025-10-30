const api = 'https://compensa-o-de-aus-ncias.onrender.com/tarefas';

async function carregarTarefas() {
  const res = await fetch(api);
  const tarefas = await res.json();
  const div = document.getElementById('tarefas');
  div.innerHTML = '';

  tarefas.forEach(t => {
    const el = document.createElement('div');
    el.classList.add('tarefa');
    if (t.status === 'concluído') el.classList.add('concluido');

    el.innerHTML = `
      <div>
        <span><strong>${t.titulo}</strong> - ${t.tipo}</span><br>
        <small>📅 ${t.data} • <span class="status">${t.status}</span></small>
      </div>
      <div>
        ${t.status !== 'concluído' ? `<button onclick="concluir(${t.id})">✅</button>` : ''}
        <button onclick="deletar(${t.id})">🗑️</button>
      </div>
    `;
    div.appendChild(el);
  });
}

async function adicionar() {
  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;

  if (!titulo || !data || !tipo) {
    alert('Preencha todos os campos!');
    return;
  }

  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, data, tipo })
  });
  carregarTarefas();
  document.getElementById('titulo').value = '';
  document.getElementById('data').value = '';
  document.getElementById('tipo').value = '';
}

async function concluir(id) {
  await fetch(`${api}/${id}/concluir`, { method: 'PUT' });
  carregarTarefas();
}

async function deletar(id) {
  if (confirm('Deseja excluir esta tarefa?')) {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    carregarTarefas();
  }
}

document.getElementById('adicionar').addEventListener('click', adicionar);
carregarTarefas();
