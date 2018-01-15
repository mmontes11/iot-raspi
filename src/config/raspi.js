import { MeasurementUnit, MeasurementLocation } from "../models/measurement";
import { LED } from "../models/led";
import { DHTSensor } from "../models/dhtSensor";
import { Point } from "../models/geometry"
import { RelatedEntity, RelatedEntityType } from "../models/relatedEntity"

const relatedEntityName = "Martin's flat";
const successLed = new LED(20, 100, 5000);
const errorLed = new LED(21, 100, 5000);
const serverHost = 'http://192.168.0.100:8000';
const username = 'admin';
const password = 'aA12345678&';
const debug = true;

const getSensors = async () => {
    try {
        const currentPoint = await Point.getCurrentPoint();
        const relatedEntity = new RelatedEntity(relatedEntityName, RelatedEntityType.building, currentPoint);
        const dhtOutdoorSensor = new DHTSensor(11, 23, MeasurementUnit.degrees, MeasurementUnit.relative, MeasurementLocation.outdoor, [relatedEntity]);
        const dhtIndoorSensor = new DHTSensor(11, 24, MeasurementUnit.degrees, MeasurementUnit.relative, MeasurementLocation.indoor, [relatedEntity]);
        return [
            dhtOutdoorSensor,
            dhtIndoorSensor
        ];
    } catch (err) {
        throw err;
    }
};

export default {
    successLed,
    errorLed,
    getSensors,
    serverHost,
    username,
    password,
    debug
};
