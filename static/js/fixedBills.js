const _pathPrepareToUpdate = '/fixedBills/prepareUpdate'
const _pathUpdate = '/fixedBills/update'

var myModalUpdate

document.body.onload = function(){
    myModalUpdate = new bootstrap.Modal(document.getElementById('modalUpdate'), {
        keyboard: false
    })
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

function updateTable(){

    let selectYear = document.getElementById('selectYear').value,
        selectBill = document.getElementById('selectBill').value,
        selectState = document.getElementById('selectState').value,
        selectMonth = document.querySelector('input[name="months"]:checked').value,
        allTRs = document.getElementById('tableBody').getElementsByTagName('tr')


    for(oneTR of allTRs){
        let allClasses = oneTR.classList

        if(allClasses.contains(selectYear) && allClasses.contains(selectBill) && allClasses.contains(selectState) && allClasses.contains(selectMonth)) 
            allClasses.remove('d-none')
        else 
            allClasses.add('d-none')
    }
}

function clearFields(){
    document.getElementById('selectYear').value = '2022'
    document.getElementById('selectBill').value = 'all'
    document.getElementById('selectState').value = 'all'
    document.getElementById('All').checked = true

    updateTable()
}

function situationChanged(situation){
    
    if(situation == 'paid'){
        document.getElementById('paidDateFixed').disabled = false
        document.getElementById('receiptFixed').disabled = false
        
    }
    else{
        document.getElementById('paidDateFixed').disabled = true
        document.getElementById('paidDateFixed').value = ''
        document.getElementById('receiptFixed').disabled = true
    }
    
}

function prepareToUpdate(fixedId){

    getData(_pathPrepareToUpdate, fixedId)
        .then(resFixed => {

            if(!resFixed.err){
                document.getElementById('idFixed').value = resFixed._id.toString()
                document.getElementById('serviceFixed').value = resFixed.serviceNameShow
                document.getElementById('situationFixed').value = resFixed.situation
                situationChanged(resFixed.situation)
                document.getElementById('dueDateFixed').value = resFixed.dueDate
                document.getElementById('paidDateFixed').value = resFixed.paidDate
                document.getElementById('obsFixed').value = resFixed.obs
                document.getElementById('valueFixed').value = resFixed.value
                document.getElementById('receiptFixed').value = resFixed.receipt

                myModalUpdate.show()

            }

        })
        .catch(err => {
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        }) 

}

function checkFields(){
    let isError = false

    if(document.getElementById('dueDateFixed').value == ''){
        isError = true
        document.getElementById('dueDateFixed').classList.add('is-invalid')
    }
    else{
        document.getElementById('dueDateFixed').classList.remove('is-invalid')
    }

    if(document.getElementById('obsFixed').value == ''){
        isError = true
        document.getElementById('obsFixed').classList.add('is-invalid')
    }
    else{
        document.getElementById('dueDateFixed').classList.remove('is-invalid')
    }

    if(document.getElementById('valueFixed').value == ''){
        isError = true
        document.getElementById('valueFixed').classList.add('is-invalid')
    }
    else{
        document.getElementById('dueDateFixed').classList.remove('is-invalid')
    }

    if(document.getElementById('situationFixed').value == 'paid'){
        if(document.getElementById('paidDateFixed').value == ''){
            isError = true
            document.getElementById('paidDateFixed').classList.add('is-invalid')
        }
        else{
            document.getElementById('paidDateFixed').classList.remove('is-invalid')
        }
    }
    else{
        document.getElementById('paidDateFixed').classList.remove('is-invalid')
    }

    return !isError
}

async function saveButton(){

    //dueDate, obs e value não podem estar vazios
    //se situation for paid, paidDate não pode estar vazio

    if(checkFields()){
        myModalUpdate.hide()

        let dataToSend = {
            _id: document.getElementById('idFixed').value,
            situation: document.getElementById('situationFixed').value,
            dueDate: document.getElementById('dueDateFixed').value,
            paidDate: document.getElementById('paidDateFixed').value,
            obs: document.getElementById('obsFixed').value,
            value: document.getElementById('valueFixed').value,
            receipt: document.getElementById('receiptFixed').value,
        }

        try{
            await postData(_pathUpdate, dataToSend)
            location.reload();
        }
        catch(err){
            console.log('------------------\n---> Error <---\n------------------\n' + err)
        }
    }
}