import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
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
                                        value: paid
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
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
