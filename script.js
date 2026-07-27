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
  { id: 13, icon: 'description', title: 'Termo de Imagem', desc: 'Assinado à mão (não digital)' },
  { id: 14, icon: 'vaccines', title: 'Cartão de Vacinação', desc: 'Atualizado' },
];

let anexados = 0;
let totalDocs = 0;
let tipoAtual = null;
let currentDocsList = [];

// ========== ACESSIBILIDADE: ALTERAR TAMANHO DA FONTE ==========
let tamanhoFonteAtual = 100; // porcentagem

function alterarFonte(delta) {
  tamanhoFonteAtual += delta * 10;
  if (tamanhoFonteAtual < 80) tamanhoFonteAtual = 80;
  if (tamanhoFonteAtual > 140) tamanhoFonteAtual = 140;
  document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
  mostrarToast(`Tamanho do texto: ${tamanhoFonteAtual}%`);
}

// ========== ATUALIZAR CONTEÚDO DINÂMICO ==========
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
  currentDocsList = docs;

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
        ${doc.link ? '<a href="#" onclick="verModelo(event)">Ver modelo de carta</a>' : ''}
      </div>
      <button type="button" class="attach-btn" onclick="marcarAnexo(this)">
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
    'apenas-cadastro': 'Lista de Documentos (10)',
    'atualizacao': 'Lista de Documentos (14)',
    'troca-3-anos': 'Lista de Documentos (14)',
    'receber-cadeira': 'Lista de Documentos (14)'
  };
  docsTitulo.textContent = titulos[tipoAtual];

  // Scroll suave para o conteúdo
  setTimeout(() => {
    conteudo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  mostrarToast('✅ Opção selecionada! Confira a lista de documentos.');
}

// ========== MARCAR ANEXO E PROGRESSO ==========
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
  
  if (anexados === totalDocs && totalDocs > 0) {
    setTimeout(() => {
      dispararConfetti();
      mostrarToast('🎉 Todos os documentos conferidos!');
    }, 300);
  }
}

function atualizarProgresso() {
  const percent = totalDocs > 0 ? Math.round((anexados / totalDocs) * 100) : 0;
  document.getElementById('progressBar').style.width = percent + '%';
  document.getElementById('progressPercent').textContent = `${percent}% (${anexados}/${totalDocs})`;
}

// ========== CELEBRAÇÃO CONFETTI ==========
function dispararConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ========== BAIXAR CHECKLIST TXT ==========
function baixarChecklist() {
  if (!currentDocsList || currentDocsList.length === 0) {
    mostrarToast('⚠️ Selecione um objetivo primeiro!');
    return;
  }

  let conteudoTxt = `CHECKLIST DE DOCUMENTOS - ONG ONE BY ONE\n`;
  conteudoTxt += `Objetivo: ${tipoAtual ? tipoAtual.toUpperCase() : 'N/A'}\n`;
  conteudoTxt += `--------------------------------------------------\n\n`;

  currentDocsList.forEach((doc, idx) => {
    conteudoTxt += `[ ] ${idx + 1}. ${doc.title}\n    Descrição: ${doc.desc}\n\n`;
  });

  conteudoTxt += `--------------------------------------------------\n`;
  conteudoTxt += `WhatsApp de Envio: (21) 97283-4352\nONG One by One - Grounded in Hope\n`;

  const blob = new Blob([conteudoTxt], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `checklist-onebyone-${tipoAtual || 'documentos'}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  mostrarToast('📄 Checklist baixado com sucesso!');
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
  const email = document.getElementById('email') ? document.getElementById('email').value : '';

  const tiposTexto = {
    'apenas-cadastro': 'Apenas cadastro na ONG',
    'atualizacao': 'Atualização de cadastro',
    'troca-3-anos': 'Troca de cadeira (após 3 anos)',
    'receber-cadeira': 'Solicitar recebimento de cadeira'
  };
  
  const tipoSelecionado = tiposTexto[tipoAtual];
  
  let mensagem = `Olá, Alex e equipe One by One! 👋%0A%0A` +
    `Gostaria de iniciar um contato com a ONG One by One.%0A%0A` +
    `*Objetivo:* ${tipoSelecionado}%0A` +
    `*Criança:* ${crianca}%0A` +
    `*Responsável:* ${responsavel}%0A` +
    `*Contato:* ${telefone}%0A`;

  if (email) {
    mensagem += `*E-mail:* ${email}%0A`;
  }
  
  mensagem += `%0AAguardo as orientações sobre a documentação necessária. 💙`;
  
  const url = `https://wa.me/5521972834352?text=${mensagem}`;
  
  mostrarToast('Redirecionando para o WhatsApp...');
  
  setTimeout(() => {
    window.open(url, '_blank');
  }, 800);
}

// ========== TOAST ==========
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== MODELO DE CARTA ==========
function verModelo(e) {
  e.preventDefault();
  alert('📝 MODELO DE CARTA (escrever à mão):\n\nEu, [nome do responsável], responsável por [nome da criança], venho contar um pouco da história do(a) meu(minha) filho(a)...\n\nConte sobre:\n• Diagnóstico e quando descobriu\n• Desafios diários da criança\n• Sonhos e atividades favoritas\n• Como a cadeira de rodas pode ajudar\n\nAssinatura e Data à mão no final.');
}

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}
