import * as services from "../services/product.services.js";

export const getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, query = '', sort = '' } = req.query;
        const response = await services.getAll(page, limit, query, sort);
    
    res.json({
        status: response.docs.length > 0 ? "success" : "error",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
    });
    } catch (error) {
    next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await productDao.getById(id);
        if (!item) throw new Error("Product not found");
        res.json(item);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await productDao.create(req.body);
        if (!newProduct) throw new Error("Product not created");
        else res.json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productDao.update(id, req.body);
        if (!updatedProduct) throw new Error("Product not found");
        else res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProd = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProd = await productDao.deleteProd(id);
        if (!deletedProd) throw new Error("Product not found");
        else res.json({ message: "Product deleted" });
    } catch (error) {
        next(error);
    }
};