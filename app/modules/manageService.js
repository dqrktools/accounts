const Bill = require('../models/bill.model');
const Debtor = require('../models/debtor.model');
const Account = require('../models/account.model');
const Service = require('../models/service.model');
const Fixed = require('../models/fixed.model');

const monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const serviceSpotify = new Service({
    nameId: 'spotify',
    nameShow: 'Spotify',
    dateStart: new Date(2022, 0, 5),
    dateEnd: new Date(2022, 5, 5),
    owner: 'Paulo',
    type: 'service',
    value: 5.82
})

const serviceLuzNF1 = new Service({
    nameId: 'luzNF1',
    nameShow: 'Luz NF1',
    dateStart: new Date(2022, 0, 9),
    dateEnd: new Date(2022, 11, 9),
    owner: 'Copel',
    type: 'service',
    value: 100
})

const serviceAguaNF1 = new Service({
    nameId: 'aguaNF1',
    nameShow: 'Água NF1',
    dateStart: new Date(2022, 0, 13),
    dateEnd: new Date(2022, 11, 13),
    owner: 'SAAE',
    type: 'service',
    value: 39.50
})

const serviceNetNF1 = new Service({
    nameId: 'netNF1',
    nameShow: 'Net NF1',
    dateStart: new Date(2022, 0, 10),
    dateEnd: new Date(2022, 11, 10),
    owner: 'BrasilNet',
    type: 'service',
    value: 79.90
})

const rentNF1 = new Service({
    nameId: 'rentNF1',
    nameShow: 'Aluguel NF1',
    dateStart: new Date(2021, 11, 10),
    dateEnd: new Date(2022, 11, 10),
    owner: 'Ana Carla',
    type: 'rent',
    value: 450
})



const allServices = [
    serviceSpotify,
    serviceLuzNF1,
    serviceAguaNF1,
    serviceNetNF1,
    rentNF1,
] 


module.exports = {
    createService: async () => {

        for(serviceToSave of allServices){
    
            let allFixeds = [];
            
            for(let dateRef = new Date(serviceToSave.dateStart.getTime()); dateRef.getTime() <= serviceToSave.dateEnd.getTime(); dateRef.setMonth(dateRef.getMonth() + 1)){
    
                allFixeds.push({
                    serviceId: serviceToSave._id,
                    serviceNameShow: serviceToSave.nameShow,
                    dueDate: new Date(dateRef.getTime()),
                    situation: 'future',
                    value: serviceToSave.value,
                    obs: monthName[dateRef.getMonth()],
                })
    
            }
    
            await serviceToSave.save()
            await Fixed.insertMany(allFixeds)

        }


    },
    deleteAll: async () => {
        await Service.deleteMany();
        await Fixed.deleteMany();
    }
}
