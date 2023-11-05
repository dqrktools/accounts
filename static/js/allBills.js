"use strict";

const _pathManageBill = '/allBills/manageBill'
const _pathPrepareUpdate = '/allBills/prepareUpdate'
const _pathDelete = '/allBills/delete'
const _pathUpdateBillsDate = '/allBills/updateBillsDate'
const _pathPayCCR = '/allBills/payCCR'
const _pathUpdateValues = '/allBills/updateValues'

var myModalManageBill
var myModalPayCCR

document.body.onload = function(){
    myModalManageBill = new bootstrap.Modal(document.getElementById('manageBill'), {
        keyboard: false
    })

    myModalPayCCR = new bootstrap.Modal(document.getElementById('payCCR'), {
        keyboard: false
    })

};

function gebid(id) {
    return document.getElementById(id)
}

function gebcn(cn) {
    return document.getElementsByClassName(cn)
}

function gebtg(tn) {
    return document.getElementsByTagName(tn)
}

/*###################################################
################### GET and POST ####################
###################################################*/

async function getData (_path, _id = ''){
    const response = await fetch(_path + '/' + _id);

    return response.json()
}

async function postData (_path, _data){
    const response = await fetch(_path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
    });

    return response.json()
}

/*###################################################
################### Some Modules ####################
###################################################*/

function resetManageBill(){

    document.getElementById('inputBillId').value = '',
    document.getElementById('selectAccount').value = '',
    document.getElementById('inputDate').value = '',
    document.getElementById('selectType').value = 'debit',
    document.getElementById('inputInfo').value = '',
    document.getElementById('selectFate').value = ''
    
    document.getElementById('selectWho').value = '61ddbb8eda0b6dd6a28d24be'
    document.getElementById('inputValueWho').value = ''
    document.getElementById('newWho').innerHTML = ''

    document.getElementById('inputValueTotal').value = ''

    document.getElementById('selectType').disabled = false
    document.getElementById('selectFate').disabled = false
    document.getElementById('selectWho').disabled = false


    inputIsFixed.classList.remove('active')
    toggleIsFixed(inputIsFixed)

    document.getElementById('addElementWho').classList.remove('d-none')
    
}

function changeFate(accountId){
    if(accountId != ''){
        document.getElementById('addElementWho').classList.add('d-none')

        document.getElementById('newWho').innerHTML = ''

        document.getElementById('selectType').value = 'debit'
        document.getElementById('selectType').disabled = true

        document.getElementById('selectWho').value = document.getElementById('debtorIdLucas').value
        document.getElementById('selectWho').disabled = true

        changeValueTotal()
    }
    else{
        document.getElementById('addElementWho').classList.remove('d-none')

        document.getElementById('selectType').disabled = false

        document.getElementById('selectWho').disabled = false
    }
}

function checkFieldsManageBills(){
    let someError = false,
        allDivsWho = document.getElementById('manageBill').getElementsByClassName('divWho')

    if(inputInfo.value == '') {
        inputInfo.classList.add('is-invalid')
        someError = true
    }
    else inputInfo.classList.remove('is-invalid')

    if(inputDate.value == '') {
        inputDate.classList.add('is-invalid')
        someError = true
    }
    else inputDate.classList.remove('is-invalid')

    for(let oneDiv of allDivsWho){
        if(oneDiv.getElementsByClassName('selectWho')[0].value == '') {
            oneDiv.getElementsByClassName('selectWho')[0].classList.add('is-invalid')
            someError = true
        }
        else oneDiv.getElementsByClassName('selectWho')[0].classList.remove('is-invalid')

        if(oneDiv.getElementsByClassName('inputValueWho')[0].value == ''){
            oneDiv.getElementsByClassName('inputValueWho')[0].classList.add('is-invalid')
            someError = true
        }
        else oneDiv.getElementsByClassName('inputValueWho')[0].classList.remove('is-invalid')
    }

    if(inputIsFixed.classList.contains('active')) {

        if(selectServiceId.value == ''){
            selectServiceId.classList.add('is-invalid')
            someError = true
        }
        else selectServiceId.classList.remove('is-invalid')

        if(selectFixedDueDate.value == ''){
            selectFixedDueDate.classList.add('is-invalid')
            someError = true
        }
        else selectFixedDueDate.classList.remove('is-invalid')

        if(inputFixedObs.value == ''){
            inputFixedObs.classList.add('is-invalid')
            someError = true
        }
        else inputFixedObs.classList.remove('is-invalid')
    }

    return someError

}

function addElementWho(){
    let newElement = document.getElementById('modelWho').cloneNode(true)

    newElement.classList.remove('d-none')

    document.getElementById('newWho').appendChild(newElement)

}

function removeElementWho(buttonRemove){
    buttonRemove.parentNode.parentNode.parentNode.remove()

    changeValueTotal()
}

function changeValueWho(){
    let allInputsWho = document.getElementById('manageBill').getElementsByClassName('inputValueWho'),
        sumValues = 0.00

    for(let oneInput of allInputsWho){
        sumValues += oneInput.value == '' ? 0.00 : parseFloat(oneInput.value)
    }

    document.getElementById('inputValueTotal').value = sumValues.toFixed(2) == 0.00 ? '' : sumValues.toFixed(2)

}

function changeValueTotal(){
    let allInputsWho = document.getElementById('manageBill').getElementsByClassName('inputValueWho'),
        divValues = document.getElementById('inputValueTotal').value
        
    divValues = divValues == '' ? 0.00 : divValues

    divValues = (divValues/allInputsWho.length).toFixed(2)

    for(let oneInput of allInputsWho){
        oneInput.value = divValues
    }
}

function updateBillsDateShow(accountId, dateToSet){

    getData(_pathUpdateBillsDate, accountId + '/' + dateToSet)
    .then(res => {
        document.getElementById(res.accountNameId).getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyUpdate
        tableWasUpdated();
    }).catch(err => {
        console.log('------------------\n---> Error <---\n------------------\n' + err)
    })
}

function toggleValues(){

    let allValues = document.getElementsByClassName('valueToHide')

    for(let oneValue of allValues) oneValue.classList.toggle('d-none')

    //if(isChecked) 
    //valueToHide
}

function tableWasUpdated() {
    
    let allValues = document.getElementsByClassName('valueToHide')

    if(document.getElementById('buttonToggleValues').checked){
        for(let oneValue of allValues) oneValue.classList.remove('d-none')
    }
    else{
        for(let oneValue of allValues) oneValue.classList.add('d-none')
    }

}

function toggleIsFixed(isCheck){

    if(isCheck.classList.contains('active')){
        document.getElementById('divFixed').classList.remove('d-none')
    }
    else {
        document.getElementById('divFixed').classList.add('d-none')
        
        selectServiceId.value = ''
        selectFixedDueDate.value = ''
        selectFixedDueDate.disabled = true
        inputFixedObs.value = ''
        inputFixedObs.disabled = true
    }

}

function changeService(serviceId){
    let selectFixedDueDate = document.getElementById('selectFixedDueDate'),
        inputFixedObs = document.getElementById('inputFixedObs')

    if(serviceId != ''){
        
            getData('/allBills/changeService', serviceId).then(resFixeds => {
                selectFixedDueDate.disabled = false
                inputFixedObs.disabled = false
                
                for(let oneFixed of resFixeds){
                    let optionElement = document.createElement("option")
        
                    optionElement.value = oneFixed._id
                    optionElement.text = oneFixed.dueDate
        
                    selectFixedDueDate.add(optionElement)
                }
            }).catch(err => {
                console.log(err)
            })  
    }
    else{
        selectFixedDueDate.value = ''
        selectFixedDueDate.disabled = true
        inputFixedObs.value = ''
        inputFixedObs.disabled = true
    }
}

/*###################################################
################### Create/Update ###################
###################################################*/

function prepareToCreate(accountId, accountType){

    resetManageBill()

    //preparar o select da conta
    //colocar a data de hoje

    let dateNow = new Date(),
        dateFormated = dateNow.getFullYear() + '-' + (dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1)) + '-' + (dateNow.getDate() < 10 ? '0' + dateNow.getDate() : dateNow.getDate())

    document.getElementById('manageBill').getElementsByClassName('modal-title')[0].innerHTML = 'Create Bill'

    document.getElementById('selectAccount').value = accountId

    document.getElementById('inputDate').value = dateFormated

    if(accountType == 'saving'){
        document.getElementById('selectType').value = 'debit'
        document.getElementById('selectType').disabled = true
    }
    else
        document.getElementById('selectType').disabled = false
                    
    myModalManageBill.show()

}

function prepareToUpdate(billId){
    //pegar o id dessa bill e enviar para o server
    //preenche os campos com o retorno do server

    resetManageBill()

    document.getElementById('manageBill').getElementsByClassName('modal-title')[0].innerHTML = 'Update Bill'


    getData(_pathPrepareUpdate, billId)
        .then(resBill => {

            document.getElementById('inputBillId').value = resBill._id.toString()
            
            document.getElementById('selectAccount').value = resBill.accountId.toString()
            document.getElementById('inputDate').value = resBill.dateInput
            document.getElementById('selectType').value = resBill.type
            document.getElementById('inputInfo').value = resBill.info
            document.getElementById('selectFate').value = ''
            
            document.getElementById('selectWho').value = resBill.debtorId.toString()
            document.getElementById('inputValueWho').value = resBill.value
        
            document.getElementById('inputValueTotal').value = resBill.value
    
            document.getElementById('addElementWho').classList.add('d-none')
        
            document.getElementById('selectType').disabled = true
            document.getElementById('selectFate').disabled = true
            document.getElementById('selectWho').disabled = true
            document.getElementById('inputIsFixed').disabled = true
        
            myModalManageBill.show()
        })
        .catch(err => {
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        })
}

function saveButton(){
    //pegar os dados dos campos e salvar

    //Fazer validações
    //Se tiver fate, é somente uma pessoa (Lucas)
    //Se for editar, não pode ter mais de uma pessoa;
    //Tem que ter info-date-who-value
    if(!checkFieldsManageBills()){
        myModalManageBill.hide()

        let selectFate = document.getElementById('selectFate')

        if(selectFate.value != '') document.getElementById('newWho').innerHTML = ''

        let dataToSend = {
            _id: document.getElementById('inputBillId').value,
            accountId: document.getElementById('selectAccount').value,
            dateInput: document.getElementById('inputDate').value,
            type: document.getElementById('selectType').value,
            info: document.getElementById('inputInfo').value,
            fate: selectFate.value,
        }

        let allDivsWho = document.getElementById('manageBill').getElementsByClassName('divWho'),
            countWho = 0

        for(let oneDiv of allDivsWho){
            dataToSend['whoId' + countWho] = oneDiv.getElementsByClassName('selectWho')[0].value
            dataToSend['whoValue' + countWho] = oneDiv.getElementsByClassName('inputValueWho')[0].value
            countWho++
        }

        dataToSend['countWho'] = countWho - 1

        if(inputIsFixed.classList.contains('active')){
            dataToSend.fixedId = selectFixedDueDate.value
            dataToSend.fixedObs = inputFixedObs.value
            dataToSend.valueTotal = inputValueTotal.value
        }
    
        postData(_pathManageBill, dataToSend)
        .then(res => {
            document.getElementById(res.accountNameId).getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyUpdate
            document.getElementById('all').getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyAllUpdate
            tableWasUpdated()
        })
        .catch(err => {
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        })
    }
}

/*###################################################
###################### Delete #######################
###################################################*/

function prepareToDelete(billId, buttonDelete){
    document.getElementById('inputDeleteId').value = billId;
    document.getElementById('divDeleteInfo').innerHTML = buttonDelete.parentNode.parentNode.getElementsByClassName('info')[0].innerHTML;

    new bootstrap.Modal(document.getElementById('billDelete'), {
        keyboard: false
    }).show()
}

function saveDelete(){        
    postData(_pathDelete, {_id: document.getElementById('inputDeleteId').value})
        .then(res => {
            document.getElementById(res.accountNameId).getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyUpdate
            document.getElementById('all').getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyAllUpdate

            tableWasUpdated()

            myModalManageBill.hide()
        })
        .catch(err => {
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        })
}

/*###################################################
###################### Pay CCR ######################
###################################################*/

function prepareToPayCCR(accountId){

    document.getElementById('selectCCRAccount').value = accountId
    document.getElementById('inputCCRTotalValue').value = document.getElementById('ccrValue' + accountId).children[0].innerHTML
    document.getElementById('inputCCRPaidValue').value = document.getElementById('ccrValue' + accountId).children[0].innerHTML

    let dateNow = new Date(),
        dateFormated = dateNow.getFullYear() + '-' + (dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1)) + '-' + (dateNow.getDate() < 10 ? '0' + dateNow.getDate() : dateNow.getDate())

    document.getElementById('inputCCRDate').value = dateFormated

    myModalPayCCR.show()
/* 
    new bootstrap.Modal(document.getElementById('payCCR'), {
        keyboard: false
    }).show()
     */
}

function payCCR(){

    let inputCCRTotalValue = document.getElementById('inputCCRTotalValue'),
        inputCCRPaidValue = document.getElementById('inputCCRPaidValue'),
        inputCCRDate = document.getElementById('inputCCRDate')

    if( parseFloat(inputCCRTotalValue.value) <= parseFloat(inputCCRPaidValue.value) 
        && parseFloat(inputCCRPaidValue.value) < 0 
        && inputCCRDate.value != ''){

        inputCCRPaidValue.classList.remove('is-invalid')
        inputCCRDate.classList.remove('is-invalid')
        myModalPayCCR.hide()
        
        let dataToSend = {
            accountId: document.getElementById('selectCCRAccount').value,
            ccrPaid: inputCCRPaidValue.value,
            dateInput: inputCCRDate.value
        }

        postData(_pathPayCCR, dataToSend)
        .then(res => {
            document.getElementById(res.accountNameId).getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyUpdate
            document.getElementById('all').getElementsByClassName('modal-body')[0].innerHTML = res.modalBodyAllUpdate

            tableWasUpdated()

            
        })
        .catch(err => {
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        })


    }
    else{
        console.log('not')
        if( parseFloat(inputCCRTotalValue.value) > parseFloat(inputCCRPaidValue.value) 
        || parseFloat(inputCCRPaidValue.value) > 0)
            inputCCRPaidValue.classList.add('is-invalid')
        
        if(inputCCRDate.value == '')
            inputCCRDate.classList.add('is-invalid')
    }


}

function updateValues(){
    getData(_pathUpdateValues)
    .then(res => {
        alert('Updated.')
    }).catch(err => {
        console.log('------------------\n---> Error <---\n------------------\n' + err)
        alert('Error: ' + err)
    })
}