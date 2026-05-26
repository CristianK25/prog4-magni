const PaymentFailure = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Pago rechazado</h1>
            <p className="text-gray-700">Hubo un problema procesando tu pago. Por favor intenta nuevamente.</p>
        </div>
    );
};

export default PaymentFailure;
