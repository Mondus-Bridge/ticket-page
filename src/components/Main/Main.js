import { Filters } from './../Filters/Filters';
import { Tickets } from './../Tickets/Tickets';
import './Main.css';

export const Main = (props) => {
	return (
		<main className="main">
			<Filters
				filterByAscendingPrice={props.filterByAscendingPrice}
				filterByDescendingPrice={props.filterByDescendingPrice}
				filterByTravelTime={props.filterByTravelTime}
				sortByOneDirection={props.sortByOneDirection}
				sortByDirect={props.sortByDirect}
				filterByPrice={props.filterByPrice}
				addAirline={props.addAirline}
				deleteAirline={props.deleteAirline}
				sortByAirlines={props.sortByAirlines}
				airlines={props.airlines}
				filteredTickets={props.filteredTickets}
				allCompanies={props.allCompanies}
				handleAllCompanies={props.handleAllCompanies} />
			<Tickets
				tickets={props.tickets} />
		</main>
	);
}
