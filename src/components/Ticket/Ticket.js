import { Trip } from './../Trip/Trip';
import './Ticket.css';

export const Ticket = (props) => {
const {carrier, price, legs} = props.ticket.flight;
console.log(legs)

	return (
		<div>
			<div className="ticket">
				<div className="ticket__header">
					<div className="ticket__container">
						<p className="ticket__text">{carrier.caption}</p>
						<p className="ticket__text">{price.total.amount} {price.total.currency}</p>
					</div>
					<p className="ticket__text">Стоимость для одного взрослого пассажира</p>
				</div>
			</div>
			<Trip
			trip={legs[0]}/>
			<div className="ticket__line"></div>
			<Trip
			trip={legs[1]}/>
			<button className="ticket__button">выбрать</button>
		</div>
	);
}