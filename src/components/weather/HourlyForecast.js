import React from "react";
import {useSelector} from "react-redux";
import {Col, Row, Card, CardBody, CardText, CardHeader, CardFooter} from "reactstrap";

const HourlyForecast = (props) => {

    const componentName = "HourlyForecast.js";

    const weatherData = useSelector(state => state.weather.weatherData);

    const hourlyForecastWeatherData = weatherData.hourly;
    // console.log(componentName, "hourlyForecastWeatherData", hourlyForecastWeatherData);

    const calculateHour = (forecastIndex) => {

        let currentDate = new Date();
        let currentHour = currentDate.getHours();
        // console.log(componentName, "currentHour", currentHour);

        let hourForecast = currentHour + forecastIndex + 1; // To account for the index starting at zero.
        // console.log(componentName, "hourForecast", hourForecast);

        // Account for numbers over 24 hours
        // hourForecast +=  12;
        if (hourForecast > 24) {
            hourForecast = hourForecast - 24;
        };

        let dayPart = "am";
        if (hourForecast > 11 && hourForecast < 24) {
            dayPart = "pm";
        };

        if (hourForecast > 12) {
            hourForecast = hourForecast - 12;
        };

        return hourForecast + " " + dayPart;
    };

    return(
        <Row className="justify-content-center my-4">
        {hourlyForecastWeatherData.map((hourlyForecast, index) => {

            // convert wind speed from m/s to mph
            let windSpeed = (hourlyForecast.wind_speed * 2.23694).toPrecision(2);
            let pressure = (hourlyForecast.pressure * 0.030).toPrecision(4);

            let temperatureFahrenheit = Math.floor(((hourlyForecast.temp - 273.15)*1.8)+32);

            return (
                index % 3 === 0 && index < 12 ? 
                <Card key={index} className="m-2">
                    <CardHeader>
                        <h3 className="text-center">{calculateHour(index)}</h3>
                    </CardHeader>
                    <CardBody>
                        <h4 className="text-center">{hourlyForecast.weather[0].main}</h4>
                        <h5>Temperature <span className="ml-2 smallerText">{temperatureFahrenheit}&#176;</span></h5>
                        <h5>Humidity <span className="ml-2 smallerText">{hourlyForecast.humidity}%</span></h5>
                        <h5>Air Pressure <span className="ml-2 smallerText">{pressure} in</span></h5>
                        <h5>Wind Speed <span className="ml-2 smallerText">{windSpeed} mph</span></h5>
                    </CardBody>
                    </Card>
                : null
        )
    })}
    </Row>
    )
}

export default HourlyForecast;