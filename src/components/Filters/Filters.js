import React, {useState, useEffect, useRef} from 'react';
import './Filters.css';

export const Filters = (props) => {
	const [valueStart, setValueStart] = useState();
	const [valueEnd, setValueEnd] = useState();
	const sortref = useRef();

	const sort = { "filters-for-price-up": props.filterByAscendingPrice, "filters-for-price-down": props.filterByDescendingPrice, "filters-for-time": props.filterByTravelTime };

	
	const handleValueStart = (e) => {
		setValueStart(e.target.value)
	}

	const handleValueEnd = (e) => {
		setValueEnd(e.target.value)
	}

	const sortByPrice = () => {
		props.filterByPrice(valueStart, valueEnd)
	}

	const handleSelectedAirlines = (e) => {
		if (e.target.checked) {
			props.addAirline(e.target.id)
		} else {
			props.deleteAirline(e.target.id)
		}
	}

	const handleSort = () => {
		Array.from(sortref.current.childNodes).forEach((el) => {
			if(el.childNodes[0].checked){
				sort[el.childNodes[0].id]()
			}
		})
	}

	useEffect(() => {
		if (valueStart && valueEnd) {
			const timeout = setTimeout(sortByPrice, 500);
			return () => clearTimeout(timeout)
		}
	}, [valueStart, valueEnd])

useEffect(()=>{
	props.sortByAirlines()
}, [props.airlines])

useEffect(()=>{
	props.handleAllCompanies()
}, [props.filteredTickets])

useEffect(()=>{
	setTimeout(handleSort, 700);
}, [props.airlines, props.filteredTickets])


	return (
		<fieldset className="filters">
			<h4>Сортировать</h4>
			<div ref={sortref}>
				<p className="filters__option"><input onChange={props.filterByAscendingPrice} className="filters__input" type="radio" name="filters-for-price-and-time" id="filters-for-price-up" /> - по возрастанию цены</p>
				<p className="filters__option"><input onChange={props.filterByDescendingPrice} className="filters__input" type="radio" name="filters-for-price-and-time" id="filters-for-price-down" /> - по убыванию цены</p>
				<p className="filters__option"><input onChange={props.filterByTravelTime} className="filters__input" type="radio" name="filters-for-price-and-time" id="filters-for-time" /> - по времени в пути</p>
			</div>
			<h4>Фильтровать</h4>
			<p className="filters__option"><input onChange={props.sortByOneDirection} className="filters__input" type="checkbox" name="filters-for-transfer" /> - 1 пересадка</p>
			<p className="filters__option"><input onChange={props.sortByDirect} className="filters__input" type="checkbox" name="filters-for-transfer" /> - без пересадок</p>
			<h4>Цена</h4>
			<div>
				<label> От </label>
				<input value={valueStart} onChange={handleValueStart} className="filters__input filters__input_for_space" type="number" name="filters-for-airline" placeholder="0" />
			</div>
			<div>
				<label> До </label>
				<input value={valueEnd} onChange={handleValueEnd} className="filters__input" type="number" name="filters-for-airline" placeholder="0" />
			</div>
			<h4>Авиакомпании</h4>
			{props.allCompanies.map((company) => {
				return <div className="filters__wrapper"><p className="filters__option filters__option_for_reduction"><input disabled={company.active} id={company.caption} onChange={handleSelectedAirlines} className="filters__input" type="checkbox" name="filters-for-airline" />{` ${company.caption}`}</p><span>от {company.price}</span></div>
			})}
		</fieldset>
	);
}