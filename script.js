document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const checkboxesSantaCecilia = document.querySelectorAll('.santa-cecilia');
    const checkboxesSantaMaria = document.querySelectorAll('.santa-maria');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const totalSantaCeciliaEl = document.getElementById('totalSantaCecilia');
    const totalSantaMariaEl = document.getElementById('totalSantaMaria');
    const rotateNotice = document.querySelector('.rotate-notice');
    const resultadoTela = document.getElementById('resultado');
    
    // Preencher checkboxes com dados salvos (se existirem)
    loadChecklistData();
    
    // Atualizar contadores
    updateCounters();
    
    // Verificar orientação da tela e mostrar/ocultar aviso
    checkOrientation();
    
    // Detectar alterações na orientação da tela
    window.addEventListener('resize', checkOrientation);
    
    // Event listeners para checkboxes
    checkboxesSantaCecilia.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCounters();
        });
    });
    
    checkboxesSantaMaria.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCounters();
        });
    });
    
    // Event listener para o botão salvar
    saveBtn.addEventListener('click', function() {
        saveChecklistData();
        resultadoTela.innerHTML = 'Dados salvos com sucesso!';
        setTimeout(function(){
            resultadoTela.innerHTML = ''
        }, 3000)
    });
    
    // Event listener para o botão resetar
    resetBtn.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja resetar todos os dados?')) {
            resetChecklistData();
            updateCounters();
        }
    });
    
    // Função para atualizar contadores
    function updateCounters() {
        let countSantaCecilia = 0;
        let countSantaMaria = 0;
        
        checkboxesSantaCecilia.forEach(checkbox => {
            if (checkbox.checked) {
                countSantaCecilia++;
            }
        });
        
        checkboxesSantaMaria.forEach(checkbox => {
            if (checkbox.checked) {
                countSantaMaria++;
            }
        });
        
        totalSantaCeciliaEl.textContent = countSantaCecilia;
        totalSantaMariaEl.textContent = countSantaMaria;
    }
    
    // Função para salvar os dados do checklist
    function saveChecklistData() {
        const data = {
            santaCecilia: Array.from(checkboxesSantaCecilia).map(checkbox => checkbox.checked),
            santaMaria: Array.from(checkboxesSantaMaria).map(checkbox => checkbox.checked)
        };
        
        localStorage.setItem('checklistData', JSON.stringify(data));
    }
    
    // Função para carregar os dados do checklist
    function loadChecklistData() {
        const savedData = localStorage.getItem('checklistData');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            if (data.santaCecilia && data.santaCecilia.length === checkboxesSantaCecilia.length) {
                data.santaCecilia.forEach((checked, index) => {
                    checkboxesSantaCecilia[index].checked = checked;
                });
            }
            
            if (data.santaMaria && data.santaMaria.length === checkboxesSantaMaria.length) {
                data.santaMaria.forEach((checked, index) => {
                    checkboxesSantaMaria[index].checked = checked;
                });
            }
        }
    }
    
    // Função para resetar os dados do checklist
    function resetChecklistData() {
        checkboxesSantaCecilia.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        checkboxesSantaMaria.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        localStorage.removeItem('checklistData');
    }
    
    // Função para verificar a orientação da tela e mostrar/ocultar o aviso
    function checkOrientation() {
        if (window.innerWidth < 768) {
            if (window.innerWidth > window.innerHeight) {
                // Orientação paisagem (horizontal)
                rotateNotice.style.display = 'none';
            } else {
                // Orientação retrato (vertical)
                rotateNotice.style.display = 'block';
            }
        } else {
            // Em telas maiores, não precisamos do aviso
            rotateNotice.style.display = 'none';
        }
    }
    
    // Tornar células da tabela clicáveis em dispositivos móveis para facilitar a marcação
    const tableCells = document.querySelectorAll('td');
    tableCells.forEach(cell => {
        cell.addEventListener('click', function(e) {
            // Verifica se o clique não foi diretamente no checkbox
            if (e.target.tagName !== 'INPUT') {
                // Encontra o checkbox dentro da célula (se houver) e inverte seu estado
                const checkbox = cell.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    
                    // Dispara o evento change para atualizar contadores
                    const event = new Event('change');
                    checkbox.dispatchEvent(event);
                }
            }
        });
    });
});