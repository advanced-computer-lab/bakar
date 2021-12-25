import NavBar from '../components/NavBar/NavBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckOut/CheckoutForm';

const stripePromise = loadStripe(
	'pk_test_51KAZrtBvkGmRM4gyfWeGpTCpsqGvUq4ZoMJEM0Byx6U4pfb2mUr8OV1giKevMwMqgkB39t0dGazcRNj083XFBQF400lnPRhzLA'
);

export default function Payment() {
	const options = {
		// passing the client secret obtained from the server
		clientSecret: '',
	};

	return (
		<div>
			<NavBar />
			<Elements stripe={stripePromise} options={options}>
				<CheckoutForm />
			</Elements>
		</div>
	);
}
