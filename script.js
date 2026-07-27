// ========== DADOS DOS DOCUMENTOS ==========
const documentosBase = [
  { id: 1, icon: 'badge', title: 'RG/CPF da Criança', desc: 'Frente e verso nítidos (2 a 21 anos)' },
  { id: 2, icon: 'person', title: 'RG/CPF do Responsável', desc: 'Frente e verso nítidos' },
  { id: 3, icon: 'medical_services', title: 'Laudo Médico com CID', desc: 'Especificando a patologia' },
  { id: 4, icon: 'contact_phone', title: 'Dois Contatos', desc: 'Telefones ativos com nomes' },
  { id: 5, icon: 'home', title: 'Comprovante de Residência', desc: 'Luz, água ou telefone' },
  { id: 6, icon: 'receipt', title: 'Recibo de Aluguel', desc: 'Se aplicável à situação' },
  { id: 7, icon: 'payments', title: 'Comprovante de Renda', desc: 'LOAS, Auxílio Brasil, contra-cheque' },
  { id: 8, icon: 'edit_note', title: 'Histórico da Criança', desc: 'Texto breve ou carta à mão', link: true },
];

const documentosCadeira = [
  { id: 9, icon: 'wheelchair_pickup', title: 'Prescrição da Cadeira', desc: 'Rede Sarah ou Ortotech (6 meses)' },
  { id: 10, icon: 'add_a_photo', title: 'Fotos da Criança', desc: 'Corpo inteiro e rosto' },
];

const documentosFinais = [
  { id: 11, icon: 'credit_card', title: 'Cartão do SUS', desc: 'Cópia nítida' },
  { id: 12, icon: 'school', title: 'Comprovante Escolar', desc: 'Declaração ou matrícula' },
  { id: 13, icon: 'description', title: 'Termo de Imagem', desc: 'Assinado à mão' },
  { id: 14, icon: 'vaccines', title: 'Cartão de Vacinação', desc: 'Atualizado' },
];

let anexados = 0;
let totalDocs = 0;
let tipoAtual = null;

// ========== ATUALIZAR CONTEÚDO ==========
function atualizarConteudo() {
  const radioSelecionado = document.querySelector('input[name="tipo-solicitacao"]:checked');
  if (!radioSelecionado) return;

  tipoAtual = radioSelecionado.value;
  const conteudo = document.getElementById('conteudoDinamico');
  const docsGrid = document.getElementById('docsGrid');
  const docsTitulo = document.getElementById('docsTitulo');

  // Mostrar conteúdo
  conteudo.classList.add('ativo');

  // Montar lista de documentos baseada na escolha
  let docs = [...documentosBase];
  
  if (tipoAtual !== 'apenas-cadastro') {
    docs = docs.concat(documentosCadeira);
  }
  
  docs = docs.concat(documentosFinais);

  // Renderizar documentos
  docsGrid.innerHTML = '';
  docs.forEach((doc, index) => {
    const docItem = document.createElement('div');
    docItem.className = 'doc-item';
    docItem.innerHTML = `
      <span class="material-symbols-outlined">${doc.icon}</span>
      <div class="doc-info">
        <p class="title">${index + 1}. ${doc.title}</p>
        <p class="desc">${doc.desc}</p>
        ${doc.link ? '<a href="#" onclick="verModelo(event)">Ver modelo</a>' : ''}
      </div>
      <button class="attach-btn" onclick="marcarAnexo(this)">
        <span class="material-symbols-outlined">attach_file</span>
        <span>Anexar</span>
      </button>
    `;
    docsGrid.appendChild(docItem);
  });

  totalDocs = docs.length;
  anexados = 0;
  atualizarProgresso();

  // Atualizar título
  const titulos = {
    'apenas-cadastro': 'Documentos para Cadastro (10)',
    'atualizacao': 'Documentos para Atualização (14)',
    'troca-3-anos': 'Documentos para Troca de Cadeira (14)',
    'receber-cadeira': 'Documentos para Receber Cadeira (14)'
  };
  docsTitulo.textContent = titulos[tipoAtual];

  // Scroll suave para o conteúdo
  setTimeout(() => {
    conteudo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  mostrarToast('✅ Escolha registrada! Veja a lista de documentos abaixo.');
}

// ========== MARCAR ANEXO ==========
function marcarAnexo(btn) {
  const item = btn.closest('.doc-item');
  const jaMarcado = btn.classList.contains('anexado');
  
  if (jaMarcado) {
    btn.classList.remove('anexado');
    btn.innerHTML = '<span class="material-symbols-outlined">attach_file</span><span>Anexar</span>';
    btn.style.background = 'var(--white)';
    btn.style.color = 'var(--custom-purple)';
    item.style.borderColor = 'var(--white-30)';
    item.style.background = 'var(--white-05)';
    anexados--;
    mostrarToast('Documento desmarcado');
  } else {
    btn.classList.add('anexado');
    btn.innerHTML = '<span class="material-symbols-outlined">check</span><span>Anexado ✓</span>';
    btn.style.background = '#4ade80';
    btn.style.color = 'white';
    item.style.borderColor = '#4ade80';
    item.style.background = 'rgba(74, 222, 128, 0.15)';
    anexados++;
    mostrarToast('✅ Documento marcado!');
  }
  
  atualizarProgresso();
  
  if (anexados === totalDocs) {
    setTimeout(() => {
      criarConfete();
      mostrarToast('🎉 Todos os documentos conferidos!');
    }, 300);
  }
}

function atualizarProgresso() {
  const percent = Math.round((anexados / totalDocs) * 100);
  document.getElementById('progressBar').style.width = percent + '%';
  document.getElementById('progressPercent').textContent = percent + '%';
}

// ========== TOAST ==========
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== CONFETE ==========
function criarConfete() {
  const cores = ['#FF914D', '#9b71a8', '#20aa98', '#ffffff', '#4ade80'];
  const isMobile = window.innerWidth <= 640;
  const total = isMobile ? 50 : 100;
  
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const confete = document.createElement('div');
      confete.className = 'confete';
      confete.style.left = Math.random() * 100 + '%';
      confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
      confete.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confete);
      setTimeout(() => confete.remove(), 4000);
    }, i * 30);
  }
}

// ========== ENVIAR WHATSAPP ==========
function enviarWhatsApp(e) {
  e.preventDefault();
  
  if (!tipoAtual) {
    mostrarToast('⚠️ Por favor, selecione o objetivo no topo da página.');
    return;
  }

  const crianca = document.getElementById('child-name').value;
  const responsavel = document.getElementById('parent-name').value;
  const telefone = document.getElementById('phone').value;

  const tiposTexto = {
    'apenas-cadastro': 'Apenas cadastro na ONG',
    'atualizacao': 'Atualização de cadastro',
    'troca-3-anos': 'Troca de cadeira (após 3 anos)',
    'receber-cadeira': 'Solicitar recebimento de cadeira'
  };
  
  const tipoSelecionado = tiposTexto[tipoAtual];
  
  const mensagem = `Olá, Alex! 👋%0A%0A` +
    `Gostaria de iniciar um contato com a ONG One by One.%0A%0A` +
    `*Objetivo:* ${tipoSelecionado}%0A` +
    `*Criança:* ${crianca}%0A` +
    `*Responsável:* ${responsavel}%0A` +
    `*Contato:* ${telefone}%0A%0A` +
    `Aguardo as orientações sobre a documentação necessária. 💙`;
  
  const url = `https://wa.me/5521972834352?text=${mensagem}`;
  
  mostrarToast('Abrindo WhatsApp...');
  
  setTimeout(() => {
    window.open(url, '_blank');
  }, 800);
}

// ========== MODELO DE CARTA ==========
function verModelo(e) {
  e.preventDefault();
  alert('📝 MODELO DE CARTA (escrever à mão):\n\nEu, [nome do responsável], responsável por [nome da criança], venho contar um pouco da história do(a) meu(minha) filho(a)...\n\nConte sobre:\n• Diagnóstico e quando descobriu\n• Desafios diários da criança\n• Sonhos e atividades favoritas\n• Como a cadeira de rodas pode ajudar\n\nAssinatura e Data à mão no final.');
}

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
