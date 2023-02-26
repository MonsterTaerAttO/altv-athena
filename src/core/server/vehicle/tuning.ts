import * as alt from 'alt-server';

import VehicleTuning from '@AthenaShared/interfaces/vehicleTuning';
import { VehicleState } from '@AthenaShared/interfaces/vehicleState';

/**
 * Applies specified properties to a vehicle in bulk.
 * These match the alt:V API, and can be pulled from a database.
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @param {VehicleState} data
 */
export function applyState(vehicle: alt.Vehicle, state: Partial<VehicleState> | VehicleState) {
    Object.keys(state).forEach((key) => {
        vehicle[key] = state[key];
    });
}

/**
 * Apply tuning to the specified vehicle.
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @param {VehicleTuning | Partial<VehicleTuning>} tuning
 */
export function applyTuning(vehicle: alt.Vehicle, tuning: VehicleTuning | Partial<VehicleTuning>) {
    if (typeof tuning === 'undefined') {
        return;
    }

    if (tuning.modkit) {
        vehicle.modKit = tuning.modkit;
    }

    if (tuning.mods) {
        for (let mod of tuning.mods) {
            vehicle.setMod(mod.id, mod.value);
        }
    }
}
