export const getBusinessTypeOptions = (t: any) => {
    return {
        retail: t('businessTypeOptions.retail'),
        wholesale: t('businessTypeOptions.wholesale'),
        service: t('businessTypeOptions.service'),
        manufacturing: t('businessTypeOptions.manufacturing'),
        convenienceStore: t('businessTypeOptions.convenienceStore'),
        foodDrinksSeller: t('businessTypeOptions.foodDrinksSeller'),
        clothingFabricsTrader: t('businessTypeOptions.clothingFabricsTrader'),
        consumerElectronicsShop: t('businessTypeOptions.consumerElectronicsShop'),
        pharmacyChemist: t('businessTypeOptions.pharmacyChemist'),
        buildingMaterialsSupplier: t('businessTypeOptions.buildingMaterialsSupplier'),
        cosmeticsBeautyProducts: t('businessTypeOptions.cosmeticsBeautyProducts'),
        farmingAgriculturalProducts: t('businessTypeOptions.farmingAgriculturalProducts'),
        automotiveParts: t('businessTypeOptions.automotiveParts'),
        other: t('businessTypeOptions.other')
    }
}


export const kanoLGAs = [
    'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta',
    'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam',
    'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya',
    'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa',
    'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa',
    'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
];

export const kanoMarkets: { [lga: string]: string[] } = {
    'Fagge': ['Sabon Gari Market', 'Kantin Kwari Market', 'Kasuwar Wambai', 'Fagge Town'],
    'Kano Municipal': ['Kurmi Market', 'Galadima', 'Sharada Industrial Area', 'Kofar Mata'],
    'Dala': ['Dawanau Market (Grains)', 'Goron Dutse Area', 'Kofar Ruwa Market'],
    'Nasarawa': ['Tarauni Market', 'Hotoro Area', 'Yankaba Market (Vegetables)'],
    'Gwale': ['Gwale General Area', 'Dorayi'],
    'Tarauni': ['Tarauni Main Area', 'Gyadi-Gyadi'],
    'Ungogo': ['Ungogo Town', 'Rijiyar Zaki'],
    'Kumbotso': ['Kumbotso Industrial Area', 'Panshekara'],
};

export const kanoMarketsWithLga = [
    {
        market: 'Sabon Gari Market',
        lga: 'Fagge',
    },
    {
        market: 'Kantin Kwari Market',
        lga: 'Fagge',
    },
    {
        market: 'Kasuwar Wambai',
        lga: 'Fagge',
    },
    {
        market: 'Fagge Town',
        lga: 'Fagge',
    },
    {
        market: 'Kofar Mata',
        lga: 'Kano Municipal',
    },
    {
        market: 'Galadima',
        lga: 'Kano Municipal',
    },
    {
        market: 'Sharada Industrial Area',
        lga: 'Kano Municipal',
    },
    {
        market: 'Kofar Ruwa Market',
        lga: 'Dala',
    },
    {
        market: 'Dawanau Market (Grains)',
        lga: 'Nasarawa',
    },
    {
        market: 'Goron Dutse Area',
        lga: 'Dala',
    },
    {
        market: 'Tarauni Market',
        lga: 'Nasarawa',
    },
    {
        market: 'Hotoro Area',
        lga: 'Nasarawa',
    },
    {
        market: 'Yankaba Market (Vegetables)',
        lga: 'Nasarawa',
    },
    {
        market: 'Gwale General Area',
        lga: 'Gwale',
    },
    {
        market: 'Dorayi',
        lga: 'Gwale',
    },
    {
        market: 'Tarauni Main Area',
        lga: 'Tarauni',
    },
    {
        market: 'Gyadi-Gyadi',
        lga: 'Tarauni',
    },
    {
        market: 'Rijiyar Zaki',
        lga: 'Ungogo',
    },
    {
        market: 'Ungogo Town',
        lga: 'Ungogo',
    },
    {
        market: 'Kumbotso Industrial Area',
        lga: 'Kumbotso',
    },
    {
        market: 'Panshekara',
        lga: 'Kumbotso',
    },
    {
        market: 'My market is not listed',
        lga: 'n/a',
    }
]