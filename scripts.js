let orderIdCounter = 1;
const orderTableBody = document.getElementById('orderTableBody');

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const responsavel = document.getElementById('responsavel').value;
    addOrder(descricao, data, hora, responsavel);
    document.getElementById('descricao').value = '';
    document.getElementById('data').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('responsavel').value = '';
});

function addOrder(descricao, data, hora, responsavel) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${orderIdCounter}</td>
        <td contenteditable="true">${descricao}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td contenteditable="true">${data}</td>
        <td contenteditable="true">${hora}</td>
        <td contenteditable="true">${responsavel}</td>
        <td id="status-${orderIdCounter}">Pendente</td>
        <td><input type="checkbox" id="gerada-${orderIdCounter}" onchange="marcarGerada(${orderIdCounter})"></td>
        <td class="actions">
            <button onclick="marcarEntregue(${orderIdCounter})">Marcar como Entregue</button>
            <button onclick="cancelarEntregue(${orderIdCounter})">Cancelar Entregue</button>
            <button onclick="excluirOrdem(${orderIdCounter})">Excluir</button>
        </td>
    `;
    orderTableBody.appendChild(row);
    orderIdCounter++;
}

function marcarEntregue(id) {
    const statusCell = document.getElementById(`status-${id}`);
    if (statusCell) {
        statusCell.textContent = 'Entregue';
        statusCell.classList.add('entregue');
    }
}

function cancelarEntregue(id) {
    const statusCell = document.getElementById(`status-${id}`);
    if (statusCell) {
        statusCell.textContent = 'Pendente';
        statusCell.classList.remove('entregue');
    }
}

function marcarGerada(id) {
    const checkbox = document.getElementById(`gerada-${id}`);
    const statusCell = document.getElementById(`status-${id}`);
    if (checkbox.checked) {
        statusCell.textContent = 'Gerada';
    } else {
        statusCell.textContent = 'Pendente';
    }
}

function excluirOrdem(id) {
    const row = document.getElementById(`status-${id}`).parentElement;
    if (row) {
        row.remove();
    }
}
