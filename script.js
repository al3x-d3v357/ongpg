let escalaAtual = 1;

function alterarFonte(delta) {
  escalaAtual = Math.min(Math.max(escalaAtual + (delta * 0.15), 0.85), 1.45);
  document.documentElement.style.setProperty('--fonte-escala', escalaAtual);
}

// ========== LISTA DE DOCUMENTOS (14) ==========
const documentos = [
  { id: 1, titulo: '1. RG/CPF da Criança', desc: 'Frente e verso nítidos (2 a 21 anos)', icon: 'badge' },
  { id: 2, titulo: '2. RG/CPF do Responsável', desc: 'Frente e verso nítidos', icon: 'person' },
  { id: 3, titulo: '3. Laudo Médico com CID', desc: 'Especificando a patologia (validade 6 meses)', icon: 'medical_services' },
  { id: 4, titulo: '4. 2 Contatos de Telefone', desc: 'Telefones ativos com DDD para comunicação', icon: 'contact_phone' },
  { id: 5, titulo: '5. Comprovante de Residência', desc: 'Atualizado (luz, água ou telefone)', icon: 'home' },
  { id: 6, titulo: '6. Recibo de Aluguel', desc: 'Opcional — caso pague aluguel', icon: 'receipt' },
  { id: 7, titulo: '7. Comprovante de Renda', desc: 'LOAS, Auxílio Brasil ou contracheque', icon: 'payments' },
  { id: 8, titulo: '8. Carta de Próprio Punho', desc: '<a href="#" onclick="alert(\'Modelo: Eu, [nome do responsável], solicito a doação da cadeira de rodas para meu filho(a) [nome da criança]...\'); return false;">Ver modelo da carta</a>', icon: 'edit_note', html: true },
  { id: 9, titulo: '9. Prescrição da Cadeira', desc: 'Rede Sarah ou Ortotech (com medidas e carimbo)', icon: 'wheelchair_pickup' },
  { id: 10, titulo: '10. Fotos da Criança', desc: 'Sentada/deitada, corpo inteiro e rosto', icon: 'add_a_photo' },
  { id: 11, titulo: '11. Cartão do SUS', desc: 'Cartão nacional de saúde', icon: 'credit_card' },
  { id: 12, titulo: '12. Comprovante de Escolaridade', desc: 'Declaração escolar ou histórico', icon: 'school' },
  { id: 13, titulo: '13. Termo de Autorização de Imagem', desc: 'Imprimir, assinar à mão, fotografar e enviar', icon: 'draw' },
  { id: 14, titulo: '14. Cartão de Vacinação', desc: 'Atualizado', icon: 'vaccines' }
];

const arquivosSelecionados = {};

function atualizarProgresso() {
  const total = documentos.length; // 14
  const preenchidos = Object.keys(arquivosSelecionados).length;
  const porcentagem = Math.round((preenchidos / total) * 100);

  const fillBar = document.getElementById('progress-header-bar-fill');
  const numText = document.getElementById('progress-header-num');

  if (fillBar) fillBar.style.width = porcentagem + '%';
  if (numText) numText.textContent = `${porcentagem}% (${preenchidos}/${total})`;
}

// Renderiza a lista de documentos no DOM
function renderizarDocumentos() {
  const docsGrid = document.getElementById('docsGrid');
  if (!docsGrid) return;

  docsGrid.innerHTML = '';

  documentos.forEach(doc => {
    const item = document.createElement('div');
    item.className = 'doc-item';
    item.id = `doc-item-${doc.id}`;
    
    item.innerHTML = `
      <span class="material-symbols-outlined doc-icon">${doc.icon}</span>
      <div class="doc-info">
        <p class="title">${doc.titulo}</p>
        ${doc.html ? doc.desc : `<p class="desc">${doc.desc}</p>`}
      </div>
      <button type="button" class="attach-btn" onclick="document.getElementById('file-${doc.id}').click()">
        <span class="material-symbols-outlined icon-sm">attach_file</span>
        <span class="btn-text">Anexar</span>
      </button>
      <input type="file" id="file-${doc.id}" accept="image/*,.pdf" capture="environment" onchange="handleFile(${doc.id}, this)">
    `;
    
    docsGrid.appendChild(item);
  });
}

// Handler de Upload de Arquivos
function handleFile(id, input) {
  const item = document.getElementById(`doc-item-${id}`);
  if (!item) return;
  
  const btn = item.querySelector('.attach-btn');
  const btnText = btn ? btn.querySelector('.btn-text') : null;
  const docObj = documentos.find(d => d.id === id);

  if (input.files && input.files.length > 0) {
    const fileName = input.files[0].name;
    const shortName = fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName;
    
    if (btnText) btnText.textContent = shortName;
    if (btn) btn.classList.add('uploaded');
    item.classList.add('uploaded');
    
    arquivosSelecionados[id] = fileName;
    showToast(`📎 ${docObj ? docObj.titulo : 'Documento'} anexado!`);
  } else {
    if (btnText) btnText.textContent = 'Anexar';
    if (btn) btn.classList.remove('uploaded');
    item.classList.remove('uploaded');
    delete arquivosSelecionados[id];
  }

  atualizarProgresso();
}

// Baixar Checklist em arquivo TXT para impressão
function baixarChecklist() {
  const texto = documentos.map((d, i) => `${i+1}. ${d.titulo.replace(/^\d+\.\s*/, '')} - ${d.desc.replace(/<[^>]*>/g, '')}`).join('\n');
  const conteudo = `CHECKLIST DE DOCUMENTOS - ONG ONE BY ONE\n` +
                   `============================================\n` +
                   `Solicitação de Cadeira de Rodas Sob Medida\n\n` +
                   `${texto}\n\n` +
                   `============================================\n` +
                   `WhatsApp para envio: (21) 97283-4352\n` +
                   `Endereço: Rua Lua de Prata, 55 – Barra da Tijuca - RJ\n` +
                   `Site: https://onebyone.org.br\n`;

  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'checklist-one-by-one.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📄 Checklist baixado com sucesso!');
}

// Toast de Notificação Visual
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    toast.innerHTML = `<span class="material-symbols-outlined">check_circle</span> <span id="toast-msg"></span>`;
    document.body.appendChild(toast);
  }

  const msgSpan = document.getElementById('toast-msg');
  if (msgSpan) msgSpan.textContent = msg;
  
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Efeito de Confetes ao Enviar
function dispararConfeti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#20aa98', '#9b71a8', '#ffffff', '#FF914D']
    });
  } else {
    const cores = ['#20aa98', '#9b71a8', '#ffffff', '#FF914D'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.borderRadius = (Math.random() > 0.5) ? '50%' : '2px';
        confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confete);
        setTimeout(() => confete.remove(), 4000);
      }, i * 30);
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderizarDocumentos();
  atualizarProgresso();

  // Header scroll efeito glassmorphism
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Máscara de Telefone Automática
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
      e.target.value = v;
    });
  }

  // Formulário -> WhatsApp Direct Submission
  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nomeCrianca = document.getElementById('child-name')?.value || '';
      const responsavel = document.getElementById('parent-name')?.value || '';
      const telefone = document.getElementById('phone')?.value || '';
      const email = document.getElementById('email')?.value || '';
      
      const docsCount = Object.keys(arquivosSelecionados).length;
      
      const mensagem = `Olá, Alex! Vim pelo site da ONG One by One.\n\n` +
                       `👶 Criança: ${nomeCrianca}\n` +
                       `👤 Responsável: ${responsavel}\n` +
                       `📞 Contato: ${telefone}\n` +
                       `📧 E-mail: ${email || '(não informado)'}\n\n` +
                       `📎 Documentos prontos/anexados: ${docsCount}/14\n\n` +
                       `Aguardo orientações para os próximos passos. 💙`;
      
      const whatsappUrl = `https://wa.me/5521972834352?text=${encodeURIComponent(mensagem)}`;
      
      dispararConfeti();
      showToast('Redirecionando para o WhatsApp do Alex... 💙');
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);
    });
  }
});
