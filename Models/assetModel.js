class Asset {

    constructor(id_as, name_as, description_as, depreciationRate_as, photo_as, price_as, purchaseDate_as, QRcode_as, SKU_as) {
        this.id = id_as,
        this.name_as = name_as,
        this.description_as = description_as,
        this.depreciationRate_as = depreciationRate_as,
        this.photo_as = photo_as,
        this.price_as = price_as,
        this.purchaseDate_as = purchaseDate_as,
        this.QRcode_as = QRcode_as,
        this.SKU_as = SKU_as;
    }

}

export default Asset;