import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';

const PAYPAL_CLIENT_ID = "AYE5cyLWOZZW2-PLHdIrxPT14X70Y9ku_EWu2ACcK8M465uFy1qDtcwGE75uB4g-Lb4G1FTQCK8r-dQq";
function Paypal(props) {
    const [paid, setPaid] = useState(props?.pricePayment);
    useEffect(() => {
        setPaid(props?.pricePayment)
    }, [props?.pricePayment]);

    return (
        <div className="paypal">
            <PayPalScriptProvider
                options={{
                    'client-id': PAYPAL_CLIENT_ID,
                }}
            >
                <PayPalButtons 
                forceReRender={[paid]}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: paid,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        // const name = details.payer.name.given_name;
                        // alert('Transaction completed by ' + name);
                        if (details.status === 'COMPLETED') {
                            await props.booking();
                        }
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal;
