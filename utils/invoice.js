exports.generateInvoiceNumber = () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(100 + Math.random() * 900); // Random 3 digit
    return `INV${date}-${random}`;
};