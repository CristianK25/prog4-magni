const PaymentPending = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">Pago pendiente</h1>
            <p className="text-gray-700">Tu pago está siendo procesado. Te avisaremos cuando se confirme.</p>
        </div>
    );
};

export default PaymentPending;
