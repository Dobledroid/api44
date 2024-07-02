
const cloudinary = require("cloudinary").v2;
export const handleFileUpload = async (req, res) => {
    console.log("req", req.file)
    //     try {
    //         const result = await cloudinary.uploader.upload(req.file.path);
    //         res.status(200).json(result);
    //     } catch (error) {
    //         console.log('Error:', error);
    //         res.status(400).send(error.message);
    //     }
};

export const handleFileUploadProduct = async (req, res) => {
    try {
        const { nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento, existencias } = req.body;

        if (![nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento, existencias].every(prop => prop !== undefined && prop !== null)) {
            throw new Error('Todos los campos son obligatorios');
        }
        if (!req.file) {
            throw new Error('La imagen es obligatoria');
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const resCloudinary = await result.json();
        const imagenUrl = resCloudinary.secure_url;

        const productData = {
            nombre,
            descripcion,
            ID_categoria,
            ID_subcategoria,
            ID_marca,
            precio,
            precioDescuento,
            existencias,
            imagenUrl
        };

        const response = await fetch('http://localhost:3001/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const responseData = await response.json();
        console.log("responseData", responseData)
        if (!response.ok) {
            throw new Error(responseData.msg);
        }

        res.status(200).json(responseData);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({msg: error.message });
    }
};

