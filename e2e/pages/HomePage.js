exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.productList = "//*[@id='tbodyid']/div/div/div/h4/a";
    this.addToCartbtn = "//a[normalize-space()='Add to cart']";
    this.cart = "#cartur";
  }

  async addProductToCart(productName) {
    const productList = await this.page.$$(this.productList);
    for (const product of productList) {
      if (productName === (await product.textContent())) {
        await product.click();
        break;
      }
    }
    await this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }
};
