const   allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        p = window.location.search.substring(1).split('&');

let fieldState0 = document.getElementsByClassName('fieldState0'),
    fieldState1 = document.getElementsByClassName('fieldState1'),
    debtorTotal = 0.0,
    allBillsDebtor = [];

function toggleAccumulated(isChecked){
    if(isChecked){
        document.getElementById('iconToggleAccumulated').classList.remove('fa-eye');
        document.getElementById('iconToggleAccumulated').classList.add('fa-eye-slash');
        
        for(oneShow of fieldState0){
            oneShow.classList.remove('d-none');
        }

        for(oneHide of fieldState1){
            oneHide.classList.add('d-none');
        }
    }
    else{
        document.getElementById('iconToggleAccumulated').classList.remove('fa-eye-slash');
        document.getElementById('iconToggleAccumulated').classList.add('fa-eye');
        
        for(oneHide of fieldState0){
            oneHide.classList.add('d-none');
        }

        for(oneShow of fieldState1){
            oneShow.classList.remove('d-none');
        }
    }
}

function toggleColor(isChecked){
    let all = document.getElementsByClassName('toggle-color'),
        allBtn = document.getElementsByClassName('toggle-btn');

    if(isChecked){
        allBtn[0].classList.replace('btn-outline-light', 'btn-outline-dark');
        allBtn[1].classList.replace('btn-outline-light', 'btn-outline-dark');

        for(one of all){
            one.classList.replace('dark', 'light');
        }
    }
    else{
        allBtn[0].classList.replace('btn-outline-dark', 'btn-outline-light');
        allBtn[1].classList.replace('btn-outline-dark', 'btn-outline-light');

        for(one of all){
            one.classList.replace('light', 'dark');
        }
        

    }
}

const dataDebtor = Handlebars.compile(
    document.getElementById('dataDebtorTemplate').innerHTML
);

const tableValues = Handlebars.compile(
    document.getElementById('tableValuesTemplate').innerHTML
);

for (oneBill of allBills) {
    if(oneBill.debtorId == p[0]){
        debtorTotal += oneBill.value;
        
        oneBill.accumulatedValueAux = debtorTotal >= 0 ? 'green': 'red'; 
        oneBill.accumulatedValue = debtorTotal.toFixed(2); 
        
        oneBill.value = oneBill.value.toFixed(2); 

        allBillsDebtor.push(oneBill);
    }
}

document.getElementById('dataDebtor').innerHTML = dataDebtor({
    total: debtorTotal.toFixed(2),
    totalAux: debtorTotal < 0 ? 'red' : 'green',
    name: p.length == 2 ? p[1] : ''
});

document.getElementById('tableValues').innerHTML = tableValues({
    allBillsDebtor: allBillsDebtor.reverse()
});