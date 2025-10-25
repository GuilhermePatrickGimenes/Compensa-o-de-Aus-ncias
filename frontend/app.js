const API = 'http://localhost:3000/tarefas';

const lista = document.getElementById('listaTarefas');
const addBtn = document.getElementById('addBtn');
const themeBtn = document.getElementById('themeBtn');

async function carregarTarefas() {
  lista.innerHTML = '<p class="empty">Carregando...</p>';
  const res = await fetch(API);
  const tarefas = await res.json();

  if (tarefas.length === 0) {
    lista.innerHTML = '<p class="empty">Nenhuma tarefa cadastrada</p>';
    return;
  }

  lista.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>
        <strong>${t.titulo}</strong> <br>
        ${t.data ? t.data.split('-').reverse().join('/') : 'Sem data'} - ${t.tipo} 
        ${t.status === 'concluído' ? '✅' : ''}
      </span>
      ${
        t.status !== 'concluído'
          ? `<button onclick="concluirTarefa(${t.id})" title="Concluir"><i class="fa-solid fa-check"></i></button>`
          : ''
      }
      <button onclick="excluirTarefa(${t.id})" title="Excluir"><i class="fa-solid fa-trash"></i></button>
    `;
    lista.appendChild(li);
  });
}

addBtn.onclick = async () => {
  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;

  if (!titulo || !data || !tipo) {
    alert('Preencha todos os campos!');
    return;
  }

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, data, tipo })
  });

  document.getElementById('titulo').value = '';
  document.getElementById('data').value = '';
  document.getElementById('tipo').value = '';
  carregarTarefas();
};

async function concluirTarefa(id) {
  await fetch(`${API}/${id}/concluir`, { method: 'PUT' });
  carregarTarefas();
}

async function excluirTarefa(id) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    carregarTarefas();
  }
}

// 🌗 Alternar tema
themeBtn.onclick = () => {
  document.body.classList.toggle('light');
  const icone = themeBtn.querySelector('i');
  icone.classList.toggle('fa-sun');
  icone.classList.toggle('fa-moon');
  localStorage.setItem('tema', document.body.classList.contains('light') ? 'claro' : 'escuro');
};

// Mantém o tema da última vez
if (localStorage.getItem('tema') === 'claro') {
  document.body.classList.add('light');
  themeBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}

carregarTarefas();
