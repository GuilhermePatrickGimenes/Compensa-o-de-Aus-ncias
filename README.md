 🧮 **Sistema de Compensação de Ausências — 3º Ano DS**

📖 **Descrição**
Este projeto foi desenvolvido como **atividade de compensação** do curso de Desenvolvimento de Sistemas.  
O sistema permite **registrar, listar, concluir e excluir tarefas escolares**, ajudando no controle de atividades como provas, trabalhos e tarefas.

---

 🧰 Tecnologias Utilizadas

 🔹 **Front-end**
- HTML5  
- CSS3 (design moderno com modo escuro/claro 🌙☀️)  
- JavaScript (consumindo API via Fetch)

 🔹 **Back-end**
- Node.js  
- Express  
- SQLite3  
- Cors  

### 🔹 **Hospedagem**
- Front-end: **Netlify**  
- Back-end: **Render**

---

## 🔗 Integração
A comunicação entre o front e o back é feita utilizando **Fetch API**, permitindo operações completas (CRUD):

| Método | Rota | Função |
|--------|------|--------|
| GET | `/tarefas` | Lista todas as tarefas |
| POST | `/tarefas` | Adiciona nova tarefa |
| PUT | `/tarefas/:id/concluir` | Marca tarefa como concluída |
| DELETE | `/tarefas/:id` | Exclui tarefa |

---

🚀 **Implantação**

 **Front-end (Netlify)**
🔗 [Acessar site](https://lembretedetarefas.netlify.app/)

 ⚙️ **Back-end (Render)**
🔗 [API Base](https://compensa-o-de-aus-ncias.onrender.com/tarefas)

💻 Como Rodar Localmente

 1️⃣ Clone o repositório
```bash
git clone https://github.com/GuilhermePatrickGimenes/Compensa-o-de-Aus-ncias.git
