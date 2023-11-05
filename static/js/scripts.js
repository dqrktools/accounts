"use strict";

const _pathReadByDebtor = '/bill/readByDebtor';
const _pathUpdateValues = '/bill/updateValues';
const _pathCreateOrUpdateBill = '/bill/createOrUpdateBill';
const _pathDeleteBill = '/bill/deleteBill';
const _pathRead = '/bill/read';

var liveToast = new bootstrap.Toast(document.getElementById('liveToast'));

let dateNow = new Date();
dateNow = 	dateNow.getFullYear() + '-' + 
			((dateNow.getMonth() < 9) ? '0' + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1)) + '-' + 
			((dateNow.getDate() <= 9) ? '0' + dateNow.getDate() : dateNow.getDate());

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
})

/*###################################################
################### GET and POST ####################
###################################################*/

async function getData (_path, _id = ''){
    const response = await fetch(_path + '/' + _id);

    return response.json();
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

$("#selectDebtor").change(changeDebtor);

function changeDebtor(){
	const debtorData = $('#selectDebtor option:selected');

	if(debtorData.val() != ""){
		$('#inputDebtorId').val(debtorData.val());
		$('#inputDebtorName').val(debtorData.text());
	
		resetModalCreateUpdate();
		
		getData(_pathReadByDebtor, debtorData.val()).then(res => {
			$('#debtorTotal').text(res.debtorTotal.toFixed(2));
			$('#debtorTotal').addClass(res.debtorTotal < 0 ? 'red' : 'green');
			$('#tableBills').html(res.tableBills);
	
			$('.divToShow').removeClass('d-none');

			$('#toastError').hide();
			$('#toastSuccess').show();
			liveToast.show();
			
		}).catch(err => {
			console.log('------------------\n---> Error <---\n------------------\n' + err);
			
			$('#toastError').show();
			$('#toastSuccess').hide();
			liveToast.show();
		})
	}
}

$("#buttonNew").click(() => {
	resetModalCreateUpdate();
	$('#manageBillTitle').text('New Bill');
});

function prepareToUpdate(_id) {
	resetModalCreateUpdate();
	$('#manageBillTitle').text('Update Bill');

	getData(_pathRead, _id).then(res => {
		$('#inputBillId').val(res._id);
		$('#inputDateInput').val(res.dateInput);
		$('#inputValue').val(res.value);
		$('#inputInfo').val(res.info);

		$('#toastError').hide();
		$('#toastSuccess').show();
		liveToast.show();
		
    }).catch(err => {
        console.log('------------------\n---> Error <---\n------------------\n' + err);

		$('#toastError').show();
		$('#toastSuccess').hide();
		liveToast.show();
    })
}
	
function resetModalCreateUpdate(){
	$('#inputBillId').val('');
	$('#inputDateInput').val(dateNow);
	$('#inputValue').val('');
	$('#inputInfo').val('');
}

function saveButton(){

	let dataToSend = {
		_id: $('#inputBillId').val(),
		debtorId: $('#inputDebtorId').val(),
		dateInput: $('#inputDateInput').val(),
		value: $('#inputValue').val(),
		info: $('#inputInfo').val()
	};

	postData(_pathCreateOrUpdateBill, dataToSend)
	.then(res => {
		if(res.isOK){
			resetModalCreateUpdate();
			changeDebtor();
			
			$('#toastError').hide();
			$('#toastSuccess').show();
		}
		else{
			resetModalCreateUpdate();

			$('#toastError').show();
			$('#toastSuccess').hide();
		}

		liveToast.show();
	})
	.catch(err => {
		console.log('------------------\n---> Error <---\n------------------\n' + err);
		
		$('#toastError').show();
		$('#toastSuccess').hide();
		liveToast.show();
	})
}

function prepareToDelete(_id) {
	$('#inputBillIdDelete').val(_id);
}

function deleteBill() {

	let dataToSend = {
		_id: $('#inputBillIdDelete').val()
	}

	postData(_pathDeleteBill, dataToSend)
	.then(res => {
		if(res.isOK){
			$('#inputBillIdDelete').val('');
			changeDebtor();
			
			$('#toastError').hide();
			$('#toastSuccess').show();
		}
		else{
			$('#inputBillIdDelete').val('');

			$('#toastError').show();
			$('#toastSuccess').hide();
		}
		
		liveToast.show();
	})
	.catch(err => {
		console.log('------------------\n---> Error <---\n------------------\n' + err);
		
		$('#toastError').show();
		$('#toastSuccess').hide();
		liveToast.show();
	})
}

function toggleUpdateValues(){
	_pathUpdateValues

	getData(_pathUpdateValues).then(res => {
		if(res.isOK){
			$('#toastError').hide();
			$('#toastSuccess').show();
		}
		else{
			$('#toastError').show();
			$('#toastSuccess').hide();
		}

		liveToast.show();
		
    }).catch(err => {
        console.log('------------------\n---> Error <---\n------------------\n' + err);
		
		$('#toastError').show();
		$('#toastSuccess').hide();
		liveToast.show();
    })
}