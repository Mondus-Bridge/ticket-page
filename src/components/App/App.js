import { Main } from './../Main/Main';
import flights from './../../utils/flights.json';
import { companies } from '../../utils/constans';
import React from 'react';

export const App = () => {

  const [tickets, setTickets] = React.useState([]);
  const [filteredTickets, setFilteredTickets] = React.useState([]);
  const [airlines, setAirlines] = React.useState([]);
  const [filteredTicketsByAirline, setFilteredTicketsByAirline] = React.useState([]);
  const [allCompanies, setAllCompanies] = React.useState(companies);

  console.log(flights.result.flights)

  const filterByAscendingPrice = () => {
    setTickets((state) => [...state].sort((a, b) => { return a.flight.price.total.amount - b.flight.price.total.amount }))
  }

  const filterByDescendingPrice = () => {
    setTickets((state) => [...state].sort((a, b) => { return b.flight.price.total.amount - a.flight.price.total.amount }))
  }

  const filterByTravelTime = () => {
    setTickets((state) => [...state].sort((a, b) => { return a.flight.legs[0].duration - b.flight.legs[0].duration || a.flight.legs[1].duration - b.flight.legs[1].duration }))
  }

  const sortByOneDirection = () => {
    const sortOneDirection = flights.result.flights.filter((ticket) => { return ticket.flight.legs[0].segments.length > 1 || ticket.flight.legs[1].segments.length > 1 })
    setTickets(sortOneDirection)
    setFilteredTickets(sortOneDirection)
  }
  const sortByDirect = () => {
    const sortDirect = flights.result.flights.filter((ticket) => { return ticket.flight.legs[0].segments.length === 1 && ticket.flight.legs[1].segments.length === 1 })
    setTickets(sortDirect)
    setFilteredTickets(sortDirect)
  }

  const returnDate = () => {
    if (filteredTicketsByAirline.length) {
      return filteredTicketsByAirline
    } else if (filteredTickets.length) {
      return filteredTickets
    } else {
      return flights.result.flights
    }
  }

  const returnDateAirline = () => {
    if (filteredTickets.length) {
      return filteredTickets
    } else {
      return flights.result.flights
    }
  }

  const filterByPrice = (valueStart, valueEnd) => {
    setTickets(returnDate().filter((ticket) => { return Number(valueStart) <= Number(ticket.flight.price.total.amount) && Number(ticket.flight.price.total.amount) <= Number(valueEnd) }))
  }

  const addAirline = (airline) => {
    setAirlines((state) => [...state, airline])
  }

  const deleteAirline = (airline) => {
    setAirlines((state) => [...state].filter((caption) => airline !== caption))
  }


  const sortByAirlines = () => {
    if (airlines.length) {
      const sortTickets = returnDateAirline().filter((ticket) => airlines.includes(ticket.flight.carrier.caption))
      setTickets(sortTickets)
      setFilteredTicketsByAirline(sortTickets)
    } else {
      setTickets(returnDateAirline())
      setFilteredTickets([])
    }
  }

  const handleAllCompanies = () => {
      const foundCompanies = Array.from(new Set(returnDateAirline().map((el) => el.flight.carrier.caption)))
      const activeCompanies = allCompanies.map((el) => {
        if (!foundCompanies.includes(el.caption)) {
          el.active = true;
        } else {
          el.active = false;
        }
        return el
      })
      setAllCompanies(activeCompanies)
    
  }

  React.useEffect(() => {
    setTickets(flights.result.flights)
  }, [])

  return (
    <div className="App">
      <Main
        tickets={tickets}
        filterByAscendingPrice={filterByAscendingPrice}
        filterByDescendingPrice={filterByDescendingPrice}
        filterByTravelTime={filterByTravelTime}
        sortByOneDirection={sortByOneDirection}
        sortByDirect={sortByDirect}
        filterByPrice={filterByPrice}
        addAirline={addAirline}
        deleteAirline={deleteAirline}
        sortByAirlines={sortByAirlines}
        airlines={airlines}
        filteredTickets={filteredTickets}
        allCompanies={allCompanies}
        handleAllCompanies={handleAllCompanies} />
    </div>
  );
}
