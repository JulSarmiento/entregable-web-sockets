const productExist = (products) => {
  return (req, res, next) => {
    const {id} = req.params;
    const current = products.products.find(product => product.id == id);
    if(current) {
      req.products = current;
      return next()
    };

    res.status(400).json({
      success: false, 
      error: 'Product not found.'
    });
  };
};

module.exports = productExist;

