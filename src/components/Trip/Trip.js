import './Trip.css';

export const Trip = (props) => {

  const { duration, segments } = props.trip;
  const { departureCity, departureAirport, departureDate, airline } = segments[0];
  const { arrivalCity, arrivalAirport, arrivalDate } = segments[1] || segments[0];
  const isTransfer = segments.length > 1

  const handleBrokenDepartureCity = () => {
    try { return departureCity.caption }
    catch (exp) { return 'Данные отсутствуют' }
  }

  const handleBrokenArrivalCity = () => {
    try { return arrivalCity.caption }
    catch (exp) { return 'Данные отсутствуют' }
  }

  const handleDuration = () => {
    if (duration <= 60) {
      return duration + ' мин'
    }
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours + ' ч ' + minutes + ' мин';
  }

  const handleTime = (value) => {
    const newDate = new Date(value).toLocaleDateString('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    })
    const time = newDate.split(' ')[5];
    const date = newDate.split(' ').slice(1, 3).join(' ');
    const day = newDate.split(', ')[0];
    return { time, date, day }
  }
  const startDate = handleTime(departureDate);
  const endDate = handleTime(arrivalDate);


  return (
    <div className="trip">
      <h3 className="trip__direction">{`${handleBrokenDepartureCity()}, ${departureAirport.caption} `}<span className="trip__span">({departureAirport.uid}) &#8594; </span>
        {`${handleBrokenArrivalCity()}, ${arrivalAirport.caption}`} <span className="trip__span">({arrivalAirport.uid})</span></h3>
      <div className="trip__wrapper">
        <p className="trip__time">{startDate.time} <span className="trip__span">{`${startDate.date} ${startDate.day}`}</span></p>
        <p className="trip__time">&#128340; {handleDuration()}</p>
        <p className="trip__time"><span className="trip__span">{`${endDate.date} ${endDate.day} `} </span> {endDate.time}</p>
      </div>
      <div className="trip__wrap">
        <hr />
        <p className="trip__transfer">{isTransfer && '1 пересадка'}</p>
      </div>
      <p className="trip__carrier">{`Рейс выполняет: ${airline.caption}`}</p>

    </div>
  );
}