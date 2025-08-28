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