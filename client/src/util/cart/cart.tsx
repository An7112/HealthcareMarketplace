 export const addToCart = (item: any) => {
    // Lấy danh sách sản phẩm từ local storage
    const productsInCart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Kiểm tra xem sản phẩm đã được thêm vào giỏ hàng chưa
    const productExists = productsInCart.includes(item);
  
    if (!productExists) {
      // Thêm sản phẩm mới vào giỏ hàng
      productsInCart.push(item);
  
      // Lưu danh sách sản phẩm mới vào local storage
      localStorage.setItem('cart', JSON.stringify(productsInCart));
    }
  };
  
export  const removeFromCart = (item: any) => {
    // Lấy danh sách sản phẩm từ local storage
    const productsInCart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    // Tìm index của sản phẩm trong danh sách sản phẩm trong giỏ hàng
    const productIndex = productsInCart.map(e => e.id).indexOf(item.id);
    if (productIndex !== -1) {
      // Xóa sản phẩm khỏi danh sách sản phẩm trong giỏ hàng
      productsInCart.splice(productIndex, 1);
  
      // Lưu danh sách sản phẩm mới vào local storage
      localStorage.setItem('cart', JSON.stringify(productsInCart));
    }
  };