const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint
app.post('/api/okeconnect/inquiry', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Request Body:", req.body);

    const {
        merchantCode = 'OK******',
        paymentAmount = '20000',
        paymentFee = '0',
        merchantOrderId = 'DEP*****',
        productDetails = 'Pembayaran Deposit domain.com',
        email = 'me@masharis.com',
        phoneNumber = '085612333333',
        channel = 'ALFAINDO',
        returnUrl = 'domain.com/akun/deposit/view/1',
        callbackUrl = 'domain.com{{url_callback}}',
        signature = 'tes',
    } = req.body;

    // Create form-data
    const formData = new FormData();
    formData.append('merchantCode', merchantCode);
    formData.append('paymentAmount', paymentAmount);
    formData.append('paymentFee', paymentFee);
    formData.append('merchantOrderId', merchantOrderId);
    formData.append('productDetails', productDetails);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('channel', channel);
    formData.append('returnUrl', returnUrl);
    formData.append('callbackUrl', callbackUrl);
    formData.append('signature', signature);

    try {
        // Send request to API
        const response = await axios.post(
            'https://gateway.okeconnect.com/api/retail/inquiry',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
            }
        );

        // Response handling
        res.json({
            status: true,
            creator: "Hello Line",
            data: response.data,
        });
    } catch (error) {
        console.error("Error in OkeConnect API:", error.message);
        res.json({
            status: false,
            creator: "Hello Line",
            error: error.response ? error.response.data : error.message,
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});