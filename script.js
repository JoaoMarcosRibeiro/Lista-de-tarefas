const Storage = {

    get() {
        return JSON.parse(localStorage.getItem("lista.tarefas:tables")) || []
    },

    set(tables) {
        localStorage.setItem("lista.tarefas:tables", JSON.stringify(tables))
    }
}

const Table = {

    all: Storage.get(),

    add(table){

        Table.all.push(table)

        App.reload()
    },

    remove(index) {

        Table.all.splice(index, 1)

        App.reload()
    },
    
    TarefaFeita(index){        

        var checkBox = document.getElementById(index);
        var tarefa = document.getElementById("tarefa"+index);
    
        if (checkBox.checked){
            tarefa.style.textDecorationLine = "line-through";
        } else {
            tarefa.style.textDecorationLine = "none";            
        }
    }
}

const DOM = {

    tableContainer: document.querySelector('table tbody'),

    addTable(table, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTable(table, index)
        tr.dataset.index = index

        DOM.tableContainer.appendChild(tr)
    },

    innerHTMLTable(table, index) {

        const html = `
        <td class="checkbox"><input id="${index}" type="checkbox" onclick="Table.TarefaFeita(${index})"/></td>
        <td class="tarefa"><h4 id="tarefa${index}" >${table.tarefa}</h4></td>
        <td class="btn-apagar"><button onclick="Table.remove(${index})">Apagar</button></td>`

        return html
    },

    clearTable() {
        DOM.tableContainer.innerHTML = ""
    }  
      
}

const Form = {

    tarefa: document.querySelector('input#tarefa'),

    getValues() {

        return {
            tarefa: Form.tarefa.value
        }
    },

    validateFields() {

        const { tarefa } = Form.getValues()
        
        if( tarefa.trim() === "" ) {
                throw new Error("Por favor, adicione uma tarefa")
        }
    },

    formatValues() {

        let { tarefa } = Form.getValues()

        return {
            tarefa
        }
    },

    clearFields() {

        Form.tarefa.value = ""
    },

    submit(event) {

        event.preventDefault()        

        try {
            Form.validateFields()
            const table = Form.formatValues()
            Table.add(table)
            Form.clearFields()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {

    init() {
        Table.all.forEach(DOM.addTable)
        Storage.set(Table.all)
    },

    reload() {
        DOM.clearTable()
        App.init()
    }    
}

App.init()