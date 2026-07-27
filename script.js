// ========== DADOS DOS DOCUMENTOS POR TIPO ==========

// Documentos para APENAS CADASTRO (sem solicitar cadeira)
const documentosApenasCadastro = [
  { id: 1, icon: 'badge', title: 'RG/CPF da Criança', desc: 'Frente e verso nítidos (2 a 21 anos)' },
  { id: 2, icon: 'person', title: 'RG/CPF do Responsável', desc: 'Frente e verso nítidos' },
  { id: 3, icon: 'medical_services', title: 'Laudo Médico com CID', desc: 'Especificando a patologia' },
  { id: 4, icon: 'contact_phone', title: 'Dois Contatos', desc: 'Telefones ativos com nomes' },
  { id: 5, icon: 'home', title: 'Comprovante de Residência', desc: 'Luz, água ou telefone' },
  { id: 6, icon: 'receipt', title: 'Recibo de Aluguel', desc: 'Se aplicável à situação' },
  { id: 7, icon: 'payments', title: 'Comprovante de Renda', desc: 'LOAS, Auxílio Brasil, contra-cheque' },
  { id: 8, icon: 'edit_note', title: 'Histórico da Criança', desc: 'Texto breve ou carta à mão', link: true },
  { id: 9, icon: 'credit_card', title: 'Cartão do SUS', desc: 'Cópia nítida' },
  { id: 10, icon: 'school', title: 'Comprovante Escolar', desc: 'Declaração ou matrícula' },
];

// Documentos para ATUALIZAÇÃO (apenas os que precisam ser reenviados)
const documentosAtualizacao = [
  { id: 1, icon: 'medical_services', title: 'Laudo Médico com CID', desc: 'Atualizado (se houver mudanças)' },
  { id: 2, icon: 'home', title: 'Comprovante de Residência', desc: 'Atualizado (últimos 3 meses)' },
  { id: 3, icon: 'receipt', title: 'Recibo de Aluguel', desc: 'Se aplicável à situação' },
  { id: 4, icon: 'payments', title: 'Comprovante de Renda', desc: 'LOAS, Auxílio Brasil, contra-cheque' },
  { id: 5, icon: 'edit_note', title: 'Carta à Mão', desc: 'Histórico atualizado da criança', link: true },
  { id: 6, icon: 'wheelchair_pickup', title: 'Prescrição da Cadeira', desc: 'Rede Sarah ou Ortotech (6 meses)', highlight: true },
  { id: 7, icon: 'add_a_photo', title: 'Fotos da Criança', desc: 'Atualizadas (corpo inteiro e rosto)', highlight: true },
  { id: 8, icon: 'credit_card', title: 'Cartão do SUS', desc: 'Se houver alterações' },
  { id: 9, icon: 'school', title: 'Comprovante Escolar', desc: 'Declaração atualizada' },
  { id: 10, icon: 'vaccines', title: 'Cartão de Vacinação', desc: 'Atualizado' },
  { id: 11, icon: 'description', title: 'Termo de Imagem', desc: 'Assinado à mão (não digital)' },
];

// Documentos para TROCA DE CADEIRA (após 3 anos)
const documentosTroca = [
  { id: 1, icon: 'wheelchair_pickup', title: 'Nova Prescrição da Cadeira', desc: 'Rede Sarah ou Ortotech (6 meses) - OBRIGATÓRIO', highlight: true },
  { id: 2, icon: 'add_a_photo', title: 'Fotos Atualizadas da Criança', desc: 'Corpo inteiro e rosto (atual)', highlight: true },
  { id: 3, icon: 'home', title: 'Comprovante de Residência', desc: 'Atualizado (últimos 3 meses)' },
  { id: 4, icon: 'payments', title: 'Comprovante de Renda', desc: 'LOAS, Auxílio Brasil, contra-cheque' },
  { id: 5, icon: 'medical_services', title: 'Laudo Médico Atualizado', desc: 'Se houver mudanças na condição' },
  { id: 6, icon: 'description', title: 'Termo de Imagem', desc: 'Assinado à mão (não digital)' },
];

// Documentos para RECEBER CADEIRA (primeira solicitação - todos os 14)
const documentosReceberCadeira = [
  { id: 1, icon: 'badge', title: 'RG/CPF da Criança', desc: 'Frente e verso nítidos (2 a 21 anos)' },
  { id: 2, icon: 'person', title: 'RG/CPF do Responsável', desc: 'Frente e verso nítidos' },
  { id: 3, icon: 'medical_services', title: 'Laudo Médico com CID', desc: 'Especificando a patologia' },
  { id: 4, icon: 'contact_phone', title: 'Dois Contatos', desc: 'Telefones ativos com nomes' },
  { id: 5, icon: 'home', title: 'Comprovante de Residência', desc: 'Luz, água ou telefone' },
  { id: 6, icon: 'receipt', title: 'Recibo de Aluguel', desc: 'Se aplicável à situação' },
  { id: 7, icon: 'payments', title: 'Comprovante de Renda', desc: 'LOAS, Auxílio Brasil, contra-cheque' },
  { id: 8, icon: 'edit_note', title: 'Histórico da Criança', desc: 'Texto breve ou carta à mão', link: true },
  { id: 9, icon: 'wheelchair_pickup', title: 'Prescrição da Cadeira', desc: 'Rede Sarah ou Ortotech (6 meses)', highlight: true },
  { id: 10, icon: 'add_a_photo', title: 'Fotos da Criança', desc: 'Corpo inteiro e rosto', highlight: true },
  { id: 11, icon: 'credit_card', title: 'Cartão do SUS', desc: 'Cópia nítida' },
  { id: 12, icon: 'school', title: 'Comprovante Escolar', desc: 'Declaração ou matrícula' },
  { id: 13, icon: 'description', title: 'Termo de Imagem', desc: 'Assinado à mão (não digital)' },
  { id: 14, icon: 'vaccines', title: 'Cartão de Vacinação', desc: 'Atualizado' },
];

let anexados = 0;
let totalDocs = 0;
let tipoAtual = null;
let currentDocsList = [];

// ========== ACESSIBILIDADE ==========
let tamanhoFonteAtual = 100;

function alterarFonte(delta) {
  tamanhoFonteAtual += delta * 10;
  if (tamanhoFonteAtual < 80) tamanhoFonteAtual = 80;
  if (tamanhoFonteAtual > 140) tamanhoFonteAtual = 140;
  document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
  mostrarToast(`Tamanho do texto: ${tamanhoFonteAtual}%`);
}

// ========== ATUALIZAR CONTEÚDO ==========
function atualizarConteudo() {
  const radioSelecionado = document.querySelector('input[name="tipo-solicitacao"]:checked');
  if (!radioSelecionado) return;

  tipoAtual = radioSelecionado.value;
  const conteudo = document.getElementById('conteudoDinamico');
  const docsGrid = document.getElementById('docsGrid');
  const docsTitulo = document.getElementById('docsTitulo');
  const alertaInfo = document.getElementById('alertaInfo');

  conteudo.classList.add('ativo');

  // Selecionar lista de documentos baseada no tipo
  let docs = [];
  let mensagemAlerta = '';
  let tituloDocs = '';

  switch(tipoAtual) {
    case 'apenas-cadastro':
      docs = documentosApenasCadastro;
      tituloDocs = 'Documentos para Cadastro (10)';
      mensagemAlerta = '<strong>Importante:</strong> Como você está apenas se cadastrando, não é necessário enviar prescrição de cadeira ou fotos da criança. Estes documentos serão solicitados quando você fizer a solicitação de cadeira.';
      break;

    case 'atualizacao':
      docs = documentosAtualizacao;
      tituloDocs = 'Documentos para Atualização (11)';
      mensagemAlerta = '<strong>Atenção:</strong> Os documentos com o selo <strong>OBRIGATÓRIO</strong> precisam ser reenviados. Os demais (RG/CPF, contatos) não precisam ser enviados novamente se não houver alterações.';
      break;

    case 'troca-3-anos':
      docs = documentosTroca;
      tituloDocs = 'Documentos para Troca de Cadeira (6)';
      mensagemAlerta = '<strong>Importante:</strong> Para troca de cadeira, a <strong>nova prescrição é obrigatória</strong> (a cadeira é feita sob medida). Fotos atualizadas também são necessárias.';
      break;

    case 'receber-cadeira':
      docs = documentosReceberCadeira;
      tituloDocs = 'Documentos para Receber Cadeira (14)';
      mensagemAlerta = '<strong>Atenção:</strong> Todos os 14 documentos são obrigatórios para primeira solicitação de cadeira de rodas. A prescrição deve ter validade de até 6 meses.';
      break;
  }

  currentDocsList = docs;

  // Atualizar mensagem de alerta
  if (alertaInfo) {
    alertaInfo.innerHTML = mensagemAlerta;
  }

  // Renderizar documentos
  docsGrid.innerHTML = '';
  docs.forEach((doc, index) => {
    const docItem = document.createElement('div');
    docItem.className = 'doc-item' + (doc.highlight ? ' highlight' : '');
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

  docsTitulo.textContent = tituloDocs;

  setTimeout(() => {
    conteudo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  mostrarToast('✅ Opção selecionada! Confira a lista de documentos.');
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
    btn.style.background = 'var(--success)';
    btn.style.color = 'white';
    item.style.borderColor = 'var(--success)';
    item.style.background = 'rgba(74, 222, 128, 0.15)';
    anexados++;
    mostrarToast('✅ Documento marcado!');
  }

  atualizarProgresso();

  if (anexados === totalDocs && totalDocs > 0) {
    setTimeout(() => {
      criarConfete();
      mostrarToast('🎉 Todos os documentos conferidos!');
    }, 300);
  }
}

function atualizarProgresso() {
  const percent = totalDocs > 0 ? Math.round((anexados / totalDocs) * 100) : 0;
  document.getElementById('progressBar').style.width = percent + '%';
  document.getElementById('progressPercent').textContent = `${percent}% (${anexados}/${totalDocs})`;
}

// ========== CONFETE ==========
function criarConfete() {
  const cores = ['#FF914D', '#9b71a8', '#20aa98', '#ffffff', '#4ade80'];
  const isMobile = window.innerWidth <= 640;
  const total = isMobile ? 50 : 100;

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const confete = document.createElement('div');
      confete.style.position = 'fixed';
      confete.style.width = '10px';
      confete.style.height = '10px';
      confete.style.top = '-20px';
      confete.style.left = Math.random() * 100 + '%';
      confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
      confete.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confete.style.zIndex = '9999';
      confete.style.pointerEvents = 'none';
      confete.style.animation = `cair ${Math.random() * 2 + 2}s linear forwards`;
      document.body.appendChild(confete);
      setTimeout(() => confete.remove(), 4000);
    }, i * 30);
  }

  if (!document.getElementById('confete-style')) {
    const style = document.createElement('style');
    style.id = 'confete-style';
    style.textContent = `
      @keyframes cair {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== BAIXAR CHECKLIST ==========
function baixarChecklist() {
  if (!currentDocsList || currentDocsList.length === 0) {
    mostrarToast('⚠️ Selecione um objetivo primeiro!');
    return;
  }

  const titulosTipo = {
    'apenas-cadastro': 'APENAS CADASTRO',
    'atualizacao': 'ATUALIZAÇÃO DE CADASTRO',
    'troca-3-anos': 'TROCA DE CADEIRA (3 ANOS)',
    'receber-cadeira': 'RECEBER CADEIRA DE RODAS'
  };

  let conteudoTxt = `CHECKLIST DE DOCUMENTOS - ONG ONE BY ONE\n`;
  conteudoTxt += `Tipo: ${titulosTipo[tipoAtual] || 'N/A'}\n`;
  conteudoTxt += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
  conteudoTxt += `--------------------------------------------------\n\n`;

  currentDocsList.forEach((doc, idx) => {
    const marker = doc.highlight ? '[!] ' : '[ ] ';
    conteudoTxt += `${marker}${idx + 1}. ${doc.title}\n    Descrição: ${doc.desc}\n\n`;
  });

  conteudoTxt += `--------------------------------------------------\n`;
  conteudoTxt += `WhatsApp de Envio: (21) 97283-4352\n`;
  conteudoTxt += `ONG One by One - Grounded in Hope\n`;
  conteudoTxt += `https://onebyone.org.br\n`;

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
